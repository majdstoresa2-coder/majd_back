const express = require('express');
const axios = require('axios');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/majd_db'
});

const MOYASAR_API_KEY = process.env.MOYASAR_API_KEY || 'your_moyasar_secret_key';

app.post('/api/checkout', async (req, res) => {
  const { user_id, amount, currency, game_item_id, source } = req.body;

  try {
    const orderQuery = `
      INSERT INTO orders (user_id, game_item_id, amount, currency, status, created_at)
      VALUES ($1, $2, $3, $4, 'pending', NOW()) RETURNING id;
    `;
    const orderResult = await pool.query(orderQuery, [user_id, game_item_id, amount, currency || 'SAR']);
    const orderId = orderResult.rows[0].id;

    const moyasarPayload = {
      amount: Math.round(amount * 100),
      currency: currency || 'SAR',
      description: `منصة مجد - طلب رقم #${orderId}`,
      callback_url: `https://your-domain.com/api/payment/callback?order_id=${orderId}`,
      source: source,
      metadata: {
        order_id: orderId,
        platform: "Majd Gaming"
      }
    };

    const moyasarResponse = await axios.post('https://api.moyasar.com/v1/payments', moyasarPayload, {
      auth: { username: MOYASAR_API_KEY, password: '' }
    });

    const paymentId = moyasarResponse.data.id;
    const checkoutUrl = moyasarResponse.data.source.url || null;

    await pool.query(
      `UPDATE orders SET payment_id = $1, updated_at = NOW() WHERE id = $2;`,
      [paymentId, orderId]
    );

    return res.status(200).json({
      success: true,
      message: 'تم إنشاء الطلب ورابط الدفع بنجاح',
      order_id: orderId,
      payment_id: paymentId,
      checkout_url: checkoutUrl
    });

  } catch (error) {
    console.error('خطأ في عملية الدفع:', error.response?.data || error.message);
    return res.status(500).json({ success: false, error: 'فشلت معالجة الدفع' });
  }
});

app.post('/api/payment/webhook', async (req, res) => {
  const event = req.body;
  if (!event || !event.data) return res.status(400).send('Invalid Payload');

  const payment = event.data;
  const paymentStatus = payment.status;
  const orderId = payment.metadata?.order_id;

  try {
    await pool.query(
      `INSERT INTO system_logs (log_type, payload) VALUES ('payment_webhook', $1);`,
      [JSON.stringify(event)]
    );

    if (paymentStatus === 'paid' && orderId) {
      await pool.query(`UPDATE orders SET status = 'completed', updated_at = NOW() WHERE id = $1;`, [orderId]);
    } else if (paymentStatus === 'failed' && orderId) {
      await pool.query(`UPDATE orders SET status = 'failed', updated_at = NOW() WHERE id = $1;`, [orderId]);
    }

    return res.status(200).send('Webhook Received');
  } catch (err) {
    console.error('خطأ في الـ Webhook:', err.message);
    return res.status(500).send('Internal Error');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Majd Backend running on port ${PORT}`);
});
      
