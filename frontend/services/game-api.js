// Majd Games Frontend API Connector

class GameAPI {

  constructor() {
    this.baseURL = "/api/games";
  }


  async getGames() {

    const response = await fetch(
      this.baseURL
    );

    return await response.json();

  }


  async getGame(id) {

    const response = await fetch(
      `${this.baseURL}/${id}`
    );

    return await response.json();

  }


  async launchGame(id) {

    return {
      gameId: id,
      status: "Launching"
    };

  }

}


export default new GameAPI();
