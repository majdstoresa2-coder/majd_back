// Majd AI Execution Engine

const AITaskManager = require("./task-manager");
const AIOrchestrator = require("./orchestrator");

class AIExecutionEngine {

    constructor() {
        this.taskManager = new AITaskManager();
        this.orchestrator = new AIOrchestrator();
        this.running = false;
    }

    async submitGameIdea(idea) {

        const task = this.taskManager.addTask(
            "CREATE_GAME",
            idea
        );

        return await this.execute(task.id);

    }

    async execute(taskId) {

        const task = this.taskManager.startTask(taskId);

        if (!task) {
            throw new Error("Task not found");
        }

        try {

            const result =
                await this.orchestrator.createGame(
                    task.data
                );

            this.taskManager.finishTask(task.id);

            return {
                success: true,
                task,
                result
            };

        } catch (err) {

            this.taskManager.failTask(
                task.id,
                err.message
            );

            throw err;

        }

    }

}

module.exports = AIExecutionEngine;
