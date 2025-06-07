import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { raiseTicket } from "../controllers/supportControllers/raiseTicket.controller.js";
import { handleMulterUpload } from "../middlewares/handleMulterUpload.middleware.js";

const router = Router();

//POST
router.route("/rasie-ticket").post(authMiddleware, handleMulterUpload("attachFile"), raiseTicket);

export default router;