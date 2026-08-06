const express = require("express");
const router = express.Router();

const AIGameFactory = require("../core/game-factory");

const factory = new AIGameFactory();

// إنشاء لعبة تلقائياً
router.post("/create", async (req, res) => {
  try {
    const result = await factory.createAutomaticGame();

    res.json({
      success: true,
      message: "Game created successfully",
      data: result
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
});

// حالة المصنع
router.get("/status", (req, res) => {
  res.json({
    success: true,
    factory: "Majd AI Game Factory",
    status: "Running"
  });
});

module.exports = router;
