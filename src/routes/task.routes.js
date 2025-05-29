import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createTask } from "../controllers/taskControllers/createTask.controller.js";
import { viewTask } from "../controllers/taskControllers/viewTask.controller.js";
import { fetchDelegatedTasks } from "../controllers/taskControllers/fetchDelegatedTasks.controller.js";
import { deleteTask } from "../controllers/taskControllers/deleteTask.controller.js";
import { changeTaskStatus } from "../controllers/taskControllers/changeTaskStatus.controller.js";
import { fetchCategorizedTasks } from "../controllers/taskControllers/fetchCategorizedTasks.controller.js";
import { fetchCategorizedTasksCounting } from "../controllers/taskControllers/fetchCategorizedTasksCounting.controller.js";
import { editTask } from "../controllers/taskControllers/editTask.controller.js";
import { searchTask } from "../controllers/taskControllers/searchTask.controller.js";
import { reAssignAllTasks } from "../controllers/taskControllers/reAssignAllTasks.controller.js";
import { filterTasks } from "../controllers/taskControllers/filterTasks.controller.js";
import { fetchTasksAssignedToMe } from "../controllers/taskControllers/fetchTasksAssignedToMe.controller.js";

const router = Router();

//POST
router.route("/create-task").post(authMiddleware, createTask);
router.route("/change-task-status/:taskId").post(authMiddleware, changeTaskStatus);

//DELETE
router.route("/delete-task/:taskId").delete(authMiddleware, deleteTask);

//GET
router.route("/view-task/:taskId").get(authMiddleware, viewTask);
router.route("/delegated-tasks").get(authMiddleware, fetchDelegatedTasks);
router.route("/fetch-cat-tasks").get(authMiddleware, fetchCategorizedTasks);
router.route("/categorywise-task-counting").get(authMiddleware, fetchCategorizedTasksCounting);
router.route("/search-task").get(authMiddleware, searchTask);
router.route("/filter-tasks").get(authMiddleware, filterTasks);
router.route("/assigned-to-me").get(authMiddleware, fetchTasksAssignedToMe);

//PUT
router.route("/edit-task/:taskId").put(authMiddleware, editTask);


//PATCH
router.route("/re-assign-all-tasks").patch(authMiddleware, reAssignAllTasks);
export default router;