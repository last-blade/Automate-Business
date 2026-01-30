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
import { changeWhatsappNumber } from "../controllers/userControllers/changeWhatsappNumber.controller.js";
import { deleteMyAccount } from "../controllers/userControllers/deleteMyAccount.controller.js";
import { editProfile } from "../controllers/userControllers/editProfile.controller.js";
import { getUserActivities } from "../controllers/userControllers/getUserActivities.controller.js";
import { createMeetingNote } from "../controllers/userControllers/createMeetingNote.controller.js";
import { editMeetingNote } from "../controllers/userControllers/editMeetingNote.controller.js";
import { deleteMeetingNote } from "../controllers/userControllers/deleteMeetingNote.controller.js";
import { fetchMeetingNotes } from "../controllers/userControllers/fetchMeetingNotes.controller.js";
import { viewMeetingNote } from "../controllers/userControllers/viewMeetingNote.controller.js";

const router = Router();

//POST
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/change-password").post(changePassword);
router.route("/logout").post(authMiddleware, logoutUser);
router.route("/refresh-access-token").post(refreshAccessToken);
router.route("/add-new-member").post(authMiddleware, addNewTeamMember);
router.route("/create-meetingnote").post(authMiddleware, createMeetingNote);


//GET
router.route("/fetch-reporting-managers").get(authMiddleware, fetchReportingManager);
router.route("/fetch-all-team-members").get(authMiddleware, fetchAllTeamMembers);
router.route("/team-member/:userId").get(authMiddleware, fetchTeamMemberDetails);
router.route("/search-team-member").get(authMiddleware, searchTeamMember);
router.route("/activities").get(authMiddleware, getUserActivities);
router.route("/meetingnotes").get(authMiddleware, fetchMeetingNotes);
router.route("/meetingnote/:meetingNoteId").get(authMiddleware, viewMeetingNote);

//DELETE
router.route("/delete-member/:memberId").delete(authMiddleware, deleteMember);
router.route("/delete-my-account").delete(authMiddleware, deleteMyAccount);
router.route("/delete-meetingnote/:meetingNoteId").delete(authMiddleware, deleteMeetingNote);

//PUT
router.route("/edit-profile").put(authMiddleware, editProfile);

//PATCH
router.route("/change-whatsapp-number").patch(authMiddleware, changeWhatsappNumber);
router.route("/edit-meetingnote/:meetingNoteId").patch(authMiddleware, editMeetingNote);

//OTP
router.route("/send-otp").post(sendOTP);
router.route("/verify-otp").post(verifyOTP);

export default router;