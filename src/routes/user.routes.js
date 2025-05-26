import { Router } from "express";
import { registerUser } from "../controllers/userControllers/registerUser.controller.js";
import { loginUser } from "../controllers/userControllers/loginUser.controller.js";
import { changePassword } from "../controllers/userControllers/changePassword.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { logoutUser } from "../controllers/userControllers/logoutUser.controller.js";
import { refreshAccessToken } from "../controllers/userControllers/refreshAccessToken.controller.js";
import { addNewTeamMember } from "../controllers/userControllers/addNewTeamMember.controller.js";
import { fetchReportingManager } from "../controllers/userControllers/fetchReportingManager.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/change-password").post(authMiddleware, changePassword);
router.route("/logout").post(authMiddleware, logoutUser);

router.route("/add-new-member").post(authMiddleware, addNewTeamMember);

router.route("/fetch-reporting-managers").get(authMiddleware, fetchReportingManager);

router.route("/refresh-access-token").post(refreshAccessToken);

export default router;