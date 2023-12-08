import { Router } from "express";
import { authRequire } from "../middlewares/validateToken.js";
import {
  getTasks,
  createTask,
  deleteTask,
  getTask,
  updateTask,
} from "../controllers/tasks.controller.js";

const router = Router();

router.get("/tasks", authRequire,  getTasks);

router.post("/tasks", authRequire, createTask);

router.delete("/tasks/:id", authRequire, deleteTask);

router.get("/tasks/:id", authRequire, getTask);

router.put("/tasks/:id", authRequire, updateTask);

export default router;
