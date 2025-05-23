import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createTask } from "../controllers/taskControllers/createTask.controller.js";
import { viewTask } from "../controllers/taskControllers/viewTask.controller.js";
import { fetchUsersAllTasks } from "../controllers/taskControllers/fetchUsersAllTasks.controller.js";

const router = Router();

router.route("/create-task").post(authMiddleware, createTask);

router.route("/view-task/:taskId").get(authMiddleware, viewTask);
router.route("/fetch-all-tasks").get(authMiddleware, fetchUsersAllTasks);

export default router;