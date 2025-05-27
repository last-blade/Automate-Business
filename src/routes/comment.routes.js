import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createComment } from "../controllers/commentControllers/createComment.controller.js";
import { fetchTotalComments } from "../controllers/commentControllers/fetchTotalComments.controller.js";

const router = Router();


//POST
router.route("/create-comment/:taskId").post(authMiddleware, createComment);


//GET
router.route("/fetch-comments/:taskId").get(authMiddleware, fetchTotalComments);

export default router;