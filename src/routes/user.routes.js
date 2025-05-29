import { Router } from "express";
import { registerUser } from "../controllers/userControllers/registerUser.controller.js";
import { loginUser } from "../controllers/userControllers/loginUser.controller.js";
import { changePassword } from "../controllers/userControllers/changePassword.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { logoutUser } from "../controllers/userControllers/logoutUser.controller.js";
import { refreshAccessToken } from "../controllers/userControllers/refreshAccessToken.controller.js";
import { addNewTeamMember } from "../controllers/userControllers/addNewTeamMember.controller.js";
import { fetchReportingManager } from "../controllers/userControllers/fetchReportingManager.controller.js";
import { deleteMember } from "../controllers/userControllers/deleteMember.controller.js";
import { fetchAllTeamMembers } from "../controllers/userControllers/fetchAllTeamMembers.controller.js";
import { sendOTP } from "../controllers/userControllers/sendOTP.controller.js";
import { verifyOTP } from "../controllers/userControllers/verifyOTP.controller.js";
import { fetchTeamMemberDetails } from "../controllers/userControllers/fetchTeamMemberDetails.controller.js";
import { searchTeamMember } from "../controllers/userControllers/searchTeamMember.controller.js";

const router = Router();

//POST
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/change-password").post(authMiddleware, changePassword);
router.route("/logout").post(authMiddleware, logoutUser);
router.route("/refresh-access-token").post(refreshAccessToken);
router.route("/add-new-member").post(authMiddleware, addNewTeamMember);


//GET
router.route("/fetch-reporting-managers").get(authMiddleware, fetchReportingManager);
router.route("/fetch-all-team-members").get(authMiddleware, fetchAllTeamMembers);
router.route("/team-member/:userId").get(authMiddleware, fetchTeamMemberDetails);
router.route("/search-team-member").get(authMiddleware, searchTeamMember);

//DELETE
router.route("/delete-member/:memberId").delete(authMiddleware, deleteMember);

//OTP
router.route("/send-otp").post(sendOTP);
router.route("/verify-otp").post(verifyOTP);

export default router;