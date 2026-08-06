// Majd AI Agent Registry

class AgentRegistry {

    constructor() {
        this.agents = new Map();
    }

    register(name, agent) {
        this.agents.set(name, agent);
        return agent;
    }

    get(name) {
        return this.agents.get(name);
    }

    has(name) {
        return this.agents.has(name);
    }

    getAll() {
        return Array.from(this.agents.keys());
    }

    remove(name) {
        return this.agents.delete(name);
    }
}

module.exports = AgentRegistry;
