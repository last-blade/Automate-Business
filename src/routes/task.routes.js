import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createTask } from "../controllers/taskControllers/createTask.controller.js";
import { viewTask } from "../controllers/taskControllers/viewTask.controller.js";
import { fetchUsersAllTasks } from "../controllers/taskControllers/fetchUsersAllTasks.controller.js";
import { deleteTask } from "../controllers/taskControllers/deleteTask.controller.js";
import { changeTaskStatus } from "../controllers/taskControllers/changeTaskStatus.controller.js";

const router = Router();

router.route("/create-task").post(authMiddleware, createTask);

router.route("/view-task/:taskId").get(authMiddleware, viewTask);
router.route("/fetch-all-tasks").get(authMiddleware, fetchUsersAllTasks);

router.route("/delete-task/:taskId").delete(authMiddleware, deleteTask);

router.route("/change-task-status/:taskId").post(authMiddleware, changeTaskStatus);

export default router;