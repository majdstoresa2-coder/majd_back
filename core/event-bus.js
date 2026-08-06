// Majd AI Event Bus

class EventBus {

    constructor() {
        this.listeners = new Map();
    }

    subscribe(eventName, callback) {

        if (!this.listeners.has(eventName)) {
            this.listeners.set(eventName, []);
        }

        this.listeners.get(eventName).push(callback);
    }

    async publish(eventName, payload) {

        const callbacks =
            this.listeners.get(eventName) || [];

        for (const callback of callbacks) {

            try {
                await callback(payload);
            } catch (err) {
                console.error(
                    `Event Error: ${eventName}`,
                    err
                );
            }

        }

    }

}

module.exports = EventBus;
