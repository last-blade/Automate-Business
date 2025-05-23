import { Router } from "express";
import { registerUser } from "../controllers/userControllers/registerUser.controller.js";
import { loginUser } from "../controllers/userControllers/loginUser.controller.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

export default router;