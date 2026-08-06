// Majd AI Game Factory
// Game API Service

const GameRepository = require("../database/game-repository");

class GameService {

  constructor() {
    this.repository = new GameRepository();
    this.name = "Majd Game API Service";
  }


  publishGame(gameData) {

    return this.repository.addGame({
      ...gameData,
      status: "published"
    });

  }


  getAllGames() {

    return this.repository.getGames();

  }


  getGame(id) {

    return this.repository.findGame(id);

  }


  updateGame(id, data) {

    return this.repository.updateGame(
      id,
      data
    );

  }

}


module.exports = GameService;
