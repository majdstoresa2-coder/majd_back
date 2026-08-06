// Majd AI Game Factory
// AI Control Panel

const AIOrchestrator = require("../core/orchestrator");

class AIControlPanel {

  constructor() {
    this.ai = new AIOrchestrator();
    this.name = "Majd AI Control Center";
  }


  startGameCreation(request) {

    console.log("Starting AI Game Creation...");

    const result = this.ai.createGame({
      title: request.title,
      theme: request.theme
    });

    return {
      status: "Completed",
      message: "Game creation process finished",
      result
    };
  }

}

module.exports = AIControlPanel;
