// All the endpoints for /todoList
const express = require("express");
const {
  getAllTasks,
  getTaskById,
  createTask,
  verifyPostRequest,
  validateStringEmpty,
  deleteTask,
  updateTask,
} = require("../controllers/taskController");

const router = express.Router();

router
  .route("/tasks")
  .get(getAllTasks)
  .post(verifyPostRequest, validateStringEmpty, createTask);
router
  .route("/tasks/:id")
  .get(getTaskById)
  .patch(updateTask)
  .delete(deleteTask);

module.exports = router;
