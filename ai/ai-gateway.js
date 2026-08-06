// Majd AI Gateway

const { GoogleGenAI } = require("@google/genai");

class AIGateway {

    constructor() {

        this.ai = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY
        });

        this.model = "gemini-2.5-pro";
    }

    async ask(systemPrompt, userPrompt) {

        const response = await this.ai.models.generateContent({

            model: this.model,

            contents: `${systemPrompt}

${userPrompt}`

        });

        return response.text;

    }

}

module.exports = AIGateway;
