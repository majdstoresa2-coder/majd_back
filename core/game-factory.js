// Majd AI Game Factory
// Full Production Pipeline

const AIAutoCreator = require("./auto-creator");
const AIMarketAnalyzer = require("../analysis/market-analyzer");
const AIOrchestrator = require("./orchestrator");

class AIGameFactory {

  constructor() {

    this.autoCreator = new AIAutoCreator();
    this.market = new AIMarketAnalyzer();
    this.orchestrator = new AIOrchestrator();

    this.name = "Majd AI Game Factory";

  }


  createAutomaticGame() {

    // 1 - توليد أفكار
    const ideas = this.autoCreator.generateIdeas();


    // 2 - تحليل واختيار أفضل فكرة
    const analyzedIdeas = ideas.map(idea =>
      this.market.analyzeIdea(idea)
    );


    const best = analyzedIdeas
      .sort((a,b) =>
        b.analysis.potentialScore -
        a.analysis.potentialScore
      )[0];


    // 3 - بناء اللعبة
    const result =
      this.orchestrator.createGame(best.idea);


    return {

      factory: this.name,

      selectedIdea: best,

      production: result

    };

  }

}


module.exports = AIGameFactory;
