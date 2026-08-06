// Majd AI Workflow Engine

class WorkflowEngine {

    constructor() {

        this.workflows = [];

        this.status = "READY";

    }

    createWorkflow(name, stages) {

        const workflow = {

            id: Date.now(),

            name,

            status: "WAITING",

            currentStage: 0,

            stages: stages.map(stage => ({
                name: stage,
                status: "PENDING",
                startedAt: null,
                finishedAt: null
            })),

            createdAt: new Date().toISOString()

        };

        this.workflows.push(workflow);

        return workflow;

    }

    startWorkflow(id) {

        const workflow = this.workflows.find(w => w.id === id);

        if (!workflow) {
            throw new Error("Workflow not found");
        }

        workflow.status = "RUNNING";

        return workflow;

    }

    completeStage(workflowId) {

        const workflow = this.workflows.find(w => w.id === workflowId);

        if (!workflow) {
            return null;
        }

        const stage = workflow.stages[workflow.currentStage];

        if (stage) {

            stage.status = "DONE";
            stage.finishedAt = new Date().toISOString();

            workflow.currentStage++;

            if (workflow.currentStage >= workflow.stages.length) {

                workflow.status = "COMPLETED";

            }

        }

        return workflow;

    }

    getWorkflow(id) {

        return this.workflows.find(w => w.id === id);

    }

}

module.exports = WorkflowEngine;
