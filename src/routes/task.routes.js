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
import { filterTasksAssignedByMe } from "../controllers/taskControllers/filterTasksAssignedByMe.controller.js";
import { fetchTasksAssignedToMe } from "../controllers/taskControllers/fetchTasksAssignedToMe.controller.js";
import { fetchDelegateAndAssignedToMeTasks } from "../controllers/taskControllers/fetchDelegateAndAssignedToMeTasks.controller.js";
import { fetchCategorizedTasksCountingAssignedByMe } from "../controllers/taskControllers/fetchCategorizedTasksCountingAssignedByMe.controller.js";
import { totalCategorizedTasksCounting } from "../controllers/taskControllers/totalCategorizedTasksCounting.controller.js";
import { checkAndSetOverdueStatus } from "../controllers/taskControllers/checkAndSetOverdueStatus.controller.js";
import { handleMulterUpload } from "../middlewares/handleMulterUpload.middleware.js";
import { filterTasksAssignedToMe } from "../controllers/taskControllers/filterTasksAssignedToMe.controller.js";


const router = Router();

//POST
router.route("/create-task").post(authMiddleware, handleMulterUpload("taskImage"), createTask);

//DELETE
router.route("/delete-task/:taskId").delete(authMiddleware, deleteTask);

//GET
router.route("/view-task/:taskId").get(authMiddleware, viewTask);
router.route("/delegated-tasks").get(authMiddleware, fetchDelegatedTasks);
router.route("/categorized-tasks").get(authMiddleware, fetchCategorizedTasks);
router.route("/categorywise-task-counting-assigned-to-me").get(authMiddleware, fetchCategorizedTasksCounting);
router.route("/search-task").get(authMiddleware, searchTask);
router.route("/filter-tasks").get(authMiddleware, filterTasksAssignedByMe);
router.route("/assigned-to-me").get(authMiddleware, fetchTasksAssignedToMe);
router.route("/all-tasks").get(authMiddleware, fetchDelegateAndAssignedToMeTasks);
router.route("/my-assigned-cat-task-counts").get(authMiddleware, fetchCategorizedTasksCountingAssignedByMe);
router.route("/total-categorized-tasks-counting").get(authMiddleware, totalCategorizedTasksCounting);
router.route("/filter-tasks-assigned-to-me").get(authMiddleware, filterTasksAssignedToMe);

//PUT
router.route("/edit-task/:taskId").put(authMiddleware, handleMulterUpload("taskImage"), editTask);

//PATCH
router.route("/re-assign-all-tasks").patch(authMiddleware, reAssignAllTasks);
router.route("/set-overdue-status").patch(authMiddleware, checkAndSetOverdueStatus);
router.route("/change-task-status/:taskId").patch(authMiddleware, changeTaskStatus);

export default router;