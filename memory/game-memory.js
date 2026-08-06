// Majd AI Game Factory
// AI Memory System

const fs = require("fs");
const path = require("path");

class GameMemorySystem {
  constructor() {
    this.name = "Majd AI Memory";
    this.version = "1.0.0";
    this.file = path.join(__dirname, "games-memory.json");

    this.initialize();
  }

  initialize() {
    if (!fs.existsSync(this.file)) {
      fs.writeFileSync(
        this.file,
        JSON.stringify({
          games: [],
          decisions: [],
          reports: []
        }, null, 2)
      );
    }
  }

  saveGame(game) {
    const data = this.load();

    data.games.push({
      id: Date.now(),
      game,
      createdAt: new Date().toISOString()
    });

    this.save(data);
  }

  saveDecision(decision) {
    const data = this.load();

    data.decisions.push({
      decision,
      date: new Date().toISOString()
    });

    this.save(data);
  }

  saveReport(report) {
    const data = this.load();

    data.reports.push({
      report,
      date: new Date().toISOString()
    });

    this.save(data);
  }

  load() {
    return JSON.parse(
      fs.readFileSync(this.file, "utf8")
    );
  }

  save(data) {
    fs.writeFileSync(
      this.file,
      JSON.stringify(data, null, 2)
    );
  }
}

module.exports = GameMemorySystem;
