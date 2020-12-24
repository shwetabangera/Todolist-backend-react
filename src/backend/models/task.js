// Models my task object
const uniqid = require("uniqid");
class Task {
  constructor(taskName) {
    this.taskId = uniqid();
    this.taskName = taskName;
    this.status = "Pending";
  }
}

module.exports = Task;
