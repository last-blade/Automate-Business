import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createTask } from "../controllers/taskControllers/createTask.controller.js";
import { viewTask } from "../controllers/taskControllers/viewTask.controller.js";
import { fetchUsersAllTasks } from "../controllers/taskControllers/fetchUsersAllTasks.controller.js";
import { deleteTask } from "../controllers/taskControllers/deleteTask.controller.js";
import { changeTaskStatus } from "../controllers/taskControllers/changeTaskStatus.controller.js";
import { fetchCategorizedTasks } from "../controllers/taskControllers/fetchCategorizedTasks.controller.js";
import { fetchCategorizedTasksCounting } from "../controllers/taskControllers/fetchCategorizedTasksCounting.controller.js";
import { editTask } from "../controllers/taskControllers/editTask.controller.js";
import { searchTask } from "../controllers/taskControllers/searchTask.controller.js";

const router = Router();

//POST
router.route("/create-task").post(authMiddleware, createTask);
router.route("/change-task-status/:taskId").post(authMiddleware, changeTaskStatus);

//DELETE
router.route("/delete-task/:taskId").delete(authMiddleware, deleteTask);

//GET
router.route("/view-task/:taskId").get(authMiddleware, viewTask);
router.route("/fetch-all-tasks").get(authMiddleware, fetchUsersAllTasks);
router.route("/fetch-tasks").get(authMiddleware, fetchCategorizedTasks);
router.route("/categorywise-task-counting").get(authMiddleware, fetchCategorizedTasksCounting);
router.route("/search-task").get(authMiddleware, searchTask);

//PUT
router.route("/edit-task/:taskId").put(authMiddleware, editTask);
export default router;