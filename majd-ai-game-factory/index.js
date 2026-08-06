// Majd AI Game Factory
// Main Entry Point

const AIGameFactory = require("./core/game-factory");

async function startFactory() {
  console.log("====================================");
  console.log("Starting Majd AI Game Factory...");
  console.log("====================================");

  const factory = new AIGameFactory();

  try {
    const result = await factory.createAutomaticGame();

    console.log("Game Factory Finished Successfully");
    console.log(JSON.stringify(result, null, 2));

    return result;
  } catch (error) {
    console.error("Game Factory Failed");
    console.error(error);
  }
}

startFactory();

module.exports = startFactory;
