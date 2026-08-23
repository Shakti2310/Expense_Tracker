import { Router } from "express";
import {
  registerUser,
  getCurrentUser,
  loginUser,
  logoutUser,
  regenerateAccessToken,
  verifyUser,
} from "../controllers/user.controller.js";
import { resendOtp } from "../controllers/otp.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  verifyAccessToken,
  verifyEmailToken,
} from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/register")
  .post(upload.fields([{ name: "defaultPicture", maxCount: 1 }]), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyAccessToken, logoutUser);
router.route("/refresh-tokens").post(regenerateAccessToken);
router.route("/verify-email").post(verifyEmailToken, verifyUser);
router.route("/resend-otp").post(verifyEmailToken,resendOtp);
router.route("/current-user").get(verifyAccessToken, getCurrentUser);

export default router;
