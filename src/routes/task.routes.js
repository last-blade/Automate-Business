import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createTask } from "../controllers/taskControllers/createTask.controller.js";

const router = Router();

router.route("/create-task").post(authMiddleware, createTask);

export default router;