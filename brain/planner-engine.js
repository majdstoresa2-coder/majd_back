// Majd AI Planner Engine

class PlannerEngine {

    createPlan(analysis) {

        const plan = {
            project: analysis.goal || "New Project",
            status: "PLANNED",
            createdAt: new Date().toISOString(),
            phases: []
        };

        const defaultPhases = [
            {
                id: 1,
                name: "Research",
                agent: "research-agent"
            },
            {
                id: 2,
                name: "Architecture",
                agent: "architect-agent"
            },
            {
                id: 3,
                name: "Game Design",
                agent: "designer-agent"
            },
            {
                id: 4,
                name: "Development",
                agent: "developer-agent"
            },
            {
                id: 5,
                name: "Testing",
                agent: "tester-agent"
            },
            {
                id: 6,
                name: "Publishing",
                agent: "publisher-agent"
            }
        ];

        plan.phases = defaultPhases.map(phase => ({
            ...phase,
            status: "WAITING",
            startedAt: null,
            finishedAt: null
        }));

        return plan;
    }

}

module.exports = PlannerEngine;
