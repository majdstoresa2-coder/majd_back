const MajdAIBrain = require("./majd-ai-brain");

async function start() {

    const brain = new MajdAIBrain();

    const result = await brain.start();

    console.log(result);

}

start();
