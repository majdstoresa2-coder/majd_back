// Majd AI Game Factory
// AI Task Manager

class AITaskManager {
  constructor() {
    this.queue = [];
    this.running = false;
  }

  addTask(type, data) {
    const task = {
      id: Date.now() + Math.random(),
      type,
      data,
      status: "waiting",
      createdAt: new Date().toISOString()
    };

    this.queue.push(task);
    return task;
  }

  getTasks() {
    return this.queue;
  }

  getWaitingTasks() {
    return this.queue.filter(task => task.status === "waiting");
  }

  startTask(id) {
    const task = this.queue.find(t => t.id === id);

    if (!task) return null;

    task.status = "running";

    return task;
  }

  finishTask(id) {
    const task = this.queue.find(t => t.id === id);

    if (!task) return null;

    task.status = "completed";

    return task;
  }

  failTask(id, error) {
    const task = this.queue.find(t => t.id === id);

    if (!task) return null;

    task.status = "failed";
    task.error = error;

    return task;
  }
}

module.exports = AITaskManager;
