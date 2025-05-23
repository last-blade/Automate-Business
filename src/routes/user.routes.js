import { Router } from "express";
import { registerUser } from "../controllers/userControllers/registerUser.controller.js";
import { loginUser } from "../controllers/userControllers/loginUser.controller.js";
import { changePassword } from "../controllers/userControllers/changePassword.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/change-password").post(changePassword);

export default router;