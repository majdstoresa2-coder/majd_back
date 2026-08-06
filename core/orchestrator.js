// Majd AI Game Factory
// AI Orchestrator Controller

const AIDirector = require("./director");
const GameDesignerAI = require("../designers/game-designer");
const AIDeveloperAgent = require("../developers/code-generator");
const AIGameTester = require("../testing/game-tester");
const GameMemorySystem = require("../memory/game-memory");

class AIOrchestrator {

  constructor() {
    this.director = new AIDirector();
    this.designer = new GameDesignerAI();
    this.developer = new AIDeveloperAgent();
    this.tester = new AIGameTester();
    this.memory = new GameMemorySystem();

    this.name = "Majd AI Orchestrator";
  }

  createGame(idea) {

    // 1- تحليل الفكرة
    const concept = this.director.analyzeGameIdea(idea);


    // 2- تصميم اللعبة
    const design = this.designer.createDesign({
      title: idea.title,
      theme: idea.theme
    });


    // 3- بناء المشروع
    const project = this.developer.generateProject(design);


    // 4- اختبار الجودة
    const report = this.tester.testGame(project);


    // 5- حفظ البيانات
    this.memory.saveGame(project);
    this.memory.saveReport(report);


    return {
      concept,
      design,
      project,
      report
    };
  }
}

module.exports = AIOrchestrator;
