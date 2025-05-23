import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createTask } from "../controllers/taskControllers/createTask.controller.js";
import { viewTask } from "../controllers/taskControllers/viewTask.controller.js";

const router = Router();

router.route("/create-task").post(authMiddleware, createTask);

router.route("/view-task/:taskId").get(authMiddleware, viewTask);

export default router;