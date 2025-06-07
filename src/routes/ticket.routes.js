import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { raiseTicket } from "../controllers/supportControllers/raiseTicket.controller.js";
import { handleMulterUpload } from "../middlewares/handleMulterUpload.middleware.js";
import { authorizeRoles } from "../middlewares/autorizeRoles.middleware.js";
import { changeTicketStatus } from "../controllers/supportControllers/changeTicketStatus.controller.js";
import { getUserTickets } from "../controllers/supportControllers/getUserTickets.controller.js";
import { getAllTickets } from "../controllers/supportControllers/getAllTickets.controller.js";
import { viewTicket } from "../controllers/supportControllers/viewTicket.controller.js";

const router = Router();

//POST
router.route("/raise-ticket").post(authMiddleware, handleMulterUpload("attachFile"), raiseTicket);

//PATCH
router.route("/change-ticket-status/:ticketId").patch(authMiddleware, authorizeRoles("Support"), changeTicketStatus);

//GET
router.route("/get-user-tickets").get(authMiddleware, getUserTickets);
router.route("/get-all-tickets").get(authMiddleware, authorizeRoles("Support"), getAllTickets);
router.route("/view-ticket/:ticketId").get(authMiddleware, viewTicket);

export default router;