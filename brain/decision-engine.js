// Majd AI Decision Engine

class DecisionEngine {

    evaluate(plan) {

        const result = {
            approved: true,
            score: 100,
            reasons: [],
            warnings: [],
            nextAction: "EXECUTE"
        };

        if (!plan || !plan.phases || plan.phases.length === 0) {
            result.approved = false;
            result.score = 0;
            result.reasons.push("Execution plan is empty.");
            result.nextAction = "REPLAN";
            return result;
        }

        const requiredPhases = [
            "Research",
            "Architecture",
            "Game Design",
            "Development",
            "Testing",
            "Publishing"
        ];

        requiredPhases.forEach(phase => {
            const exists = plan.phases.some(p => p.name === phase);

            if (!exists) {
                result.score -= 15;
                result.warnings.push(`Missing phase: ${phase}`);
            }
        });

        if (result.score < 70) {
            result.approved = false;
            result.nextAction = "REPLAN";
        }

        return result;
    }

}

module.exports = DecisionEngine;
