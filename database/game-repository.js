// Majd AI Game Factory
// Game Repository

class GameRepository {

  constructor() {
    this.games = [];
    this.name = "Majd Game Database Repository";
  }


  addGame(game) {

    const record = {
      id: Date.now(),
      ...game,
      createdAt: new Date().toISOString()
    };

    this.games.push(record);

    return record;
  }


  getGames() {

    return this.games;

  }


  findGame(id) {

    return this.games.find(
      game => game.id === id
    );

  }


  updateGame(id, updates) {

    const index = this.games.findIndex(
      game => game.id === id
    );

    if (index === -1) {
      return null;
    }

    this.games[index] = {
      ...this.games[index],
      ...updates
    };

    return this.games[index];

  }

}


module.exports = GameRepository;
