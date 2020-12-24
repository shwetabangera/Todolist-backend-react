// All the route handlers for /todoList/
const fs = require("fs");
const path = require("path");
const Task = require("../models/task.js");
const AppError = require("../helpers/appErrorClass");
const sendErrorMessage = require("../helpers/sendError");
const sendResponse = require("../helpers/sendResponse");
const fileName = path.join(__dirname, "..", "data", "tasks.json");
const tasks = JSON.parse(fs.readFileSync(fileName, "utf-8"));

// Middleware
const verifyPostRequest = (req, res, next) => {
  const requiredProperties = ["taskName"];
  // let result = Object.keys(req.body).every((key) => {
  //   return requiredProperties.includes(key);
  // });
  let result = requiredProperties.every((key) => {
    return req.body[key];
  });
  if (!result) {
    sendErrorMessage(
      new AppError(400, "Unsuccessful", "Request Body is not valid"),
      req,
      res
    );
  } else {
    next();
  }
};

const validateStringEmpty = (req, res, next) => {
  if (!req.body["taskName"].trim().length) {
    sendErrorMessage(
      new AppError(400, "Unsuccessful", "Empty String"),
      req,
      res
    );
  }
  next();
};

const getAllTasks = (req, res, next) => {
  sendResponse(200, "Successful", tasks, req, res);
};

const getTaskById = (req, res, next) => {
  let task = tasks.find((singleTask) => {
    return singleTask.taskId == req.params.id;
  });
  // console.log(req.params.id);
  if (task) {
    sendResponse(200, "Successful", task, req, res);
  } else {
    sendErrorMessage(
      new AppError(404, "Unsuccessful", "Task not found"),
      req,
      res
    );
  }
};

const createTask = (req, res, next) => {
  let newTask = new Task(req.body.taskName);
  tasks.push(newTask);
  fs.writeFile(fileName, JSON.stringify(tasks, null, 2), (err) => {
    if (err) {
      sendErrorMessage(
        new AppError(500, "Internal Error", "Error in completing Request"),
        req,
        res
      );
      return err;
    }
    sendResponse(201, "Successful", newTask, req, res);
  });
};

const deleteTask = (req, res, next) => {
  let task = tasks.findIndex((singleTask) => {
    return singleTask.taskId == req.params.id;
  });
  if (task > 0) {
    tasks.splice(task, 1);
    fs.writeFileSync(fileName, JSON.stringify(tasks, null, 2));
    sendResponse(200, "Successful", tasks[task], req, res);
  } else {
    sendErrorMessage(
      new AppError(404, "Unsuccessful", "Task not found"),
      req,
      res
    );
  }
};

const updateTask = (req, res, next) => {
  let task = tasks.findIndex((singleTask) => {
    return singleTask.taskId == req.params.id;
  });
  if (task > 0) {
    tasks[task].status = "Complete";
    fs.writeFileSync(fileName, JSON.stringify(tasks, null, 2));
    sendResponse(200, "Successful", tasks[task], req, res);
  } else {
    sendErrorMessage(
      new AppError(404, "Unsuccessful", "Task not found"),
      req,
      res
    );
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  verifyPostRequest,
  validateStringEmpty,
  deleteTask,
  updateTask,
};
