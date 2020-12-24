const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const taskRouter = require("./routes/todoRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/todoList", taskRouter);

app.listen(
  process.env.PORT,
  console.log(`App started on Port ${process.env.PORT}`)
);

// [
//   {
//     taskId: "task01",
//     taskName: "Complete express todo app",
//     status: "Pending",
//   },
//   {
//     taskId: "task02",
//     taskName: "Complete express Routers",
//     status: "Pending",
//   },
//   {
//     taskId: "task03",
//     taskName: "Integrate with Database",
//     status: "Pending",
//   },
// ];
