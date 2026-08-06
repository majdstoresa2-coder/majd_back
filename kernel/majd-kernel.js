// Majd AI OS Kernel

const EventBus = require("../core/event-bus");
const AgentRegistry = require("../core/agent-registry");
const WorkflowEngine = require("../core/workflow-engine");
const AITaskManager = require("../core/task-manager");
const AIExecutionEngine = require("../core/execution-engine");

class MajdKernel {

    constructor() {

        this.eventBus = new EventBus();
        this.registry = new AgentRegistry();
        this.workflow = new WorkflowEngine();
        this.tasks = new AITaskManager();
        this.execution = new AIExecutionEngine();

        this.version = "1.0.0";
        this.status = "BOOTING";
    }

    async boot() {

        console.log("Starting Majd AI OS...");

        this.status = "RUNNING";

        await this.eventBus.publish("SYSTEM_STARTED", {
            version: this.version,
            startedAt: new Date().toISOString()
        });

        return {
            status: this.status,
            version: this.version
        };
    }

    registerAgent(name, agent) {
        return this.registry.register(name, agent);
    }

    getAgent(name) {
        return this.registry.get(name);
    }

    getStatus() {
        return {
            status: this.status,
            version: this.version,
            agents: this.registry.getAll()
        };
    }

}

module.exports = MajdKernel;
