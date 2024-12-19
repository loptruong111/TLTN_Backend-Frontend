import express from "express";
import { validateSignup, validateSignin } from "../middlewares/validator.js";
import AuthController from "../controllers/auth.controllers.js";

const router = express.Router();

router.post("/signup", validateSignup, AuthController.signup);
router.post("/signin", validateSignin, AuthController.signin);
router.post("/signout", AuthController.signout);

export default router;
