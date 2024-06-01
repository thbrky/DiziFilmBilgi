import express from "express";
import authControllers from "../controllers/authControllers.js";

const router = express.Router();

router.route("/register").post(authControllers.register);
router.route("/login").post(authControllers.login);
router.route("/logout").post(authControllers.logout);

export default router;
