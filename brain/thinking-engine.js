// Majd AI Thinking Engine

class ThinkingEngine {

    constructor(aiGateway) {
        this.ai = aiGateway;
    }

    async think(request) {

        const systemPrompt = `
You are Majd AI Brain.

You are responsible for creating professional software and games.

Before executing anything you must:

1. Understand the request.
2. Analyze requirements.
3. Detect missing information.
4. Create an execution plan.
5. Estimate risks.
6. Return ONLY valid JSON.

JSON Schema:

{
  "goal":"",
  "projectType":"",
  "requirements":[],
  "missingInformation":[],
  "executionPlan":[],
  "estimatedAgents":[],
  "risks":[]
}
`;

        const result = await this.ai.ask(
            systemPrompt,
            JSON.stringify(request)
        );

        return JSON.parse(result);

    }

}

module.exports = ThinkingEngine;
