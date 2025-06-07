import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { raiseTicket } from "../controllers/supportControllers/raiseTicket.controller.js";
import { handleMulterUpload } from "../middlewares/handleMulterUpload.middleware.js";
import { authorizeRoles } from "../middlewares/autorizeRoles.middleware.js";
import { changeTicketStatus } from "../controllers/supportControllers/changeTicketStatus.controller.js";

const router = Router();

//POST
router.route("/rasie-ticket").post(authMiddleware, handleMulterUpload("attachFile"), raiseTicket);

//PATCH
router.route("/change-ticket-status/:ticketId").patch(authMiddleware, authorizeRoles("Support"), changeTicketStatus);

export default router;