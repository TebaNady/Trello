import express from "express";
import { addTask, deleteTask, getTasks, getTasksNotDoneAfterDeadline, upDateTask } from "./task.controller.js";
import auth from "../../middleWare/auth.js";
const taskRoutes = express.Router();
taskRoutes.get("/tasks",auth, getTasks)
taskRoutes.post('/task/:id',auth, addTask);
taskRoutes.put('/task/:id',auth, upDateTask);
taskRoutes.delete("/deletedTask/:id", auth, deleteTask);
taskRoutes.get('/tasks/notDoneAfterDeadline', getTasksNotDoneAfterDeadline)


export default taskRoutes;



