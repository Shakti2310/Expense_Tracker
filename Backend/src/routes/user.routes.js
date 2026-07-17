import { Router } from "express";
import {
  registerUser,
  getCurrentUser,
  getUsers,
  loginUser,
  logoutUser,
  regenerateJWT,
  emailVerification,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/register")
  .post(upload.fields([{ name: "defaultPicture", maxCount: 1 }]), registerUser);
router.route("/list").get(getUsers);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyAccessToken, logoutUser);
router.route("/refresh-tokens").post(regenerateJWT);
router.route("/verify-email").post(emailVerification);
router.route("/current-user").get(verifyAccessToken, getCurrentUser);

export default router;
