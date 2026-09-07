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
import { uploadUserPicture } from "../middlewares/multer.middleware.js";
import {
  verifyAccessToken,
  verifyEmailToken,
} from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validation.middleware.js";
import { registerSchema, loginSchema, userOtpSchema } from "../validations/user.validation.js";

const router = Router();

router
  .route("/register")
  .post(
    uploadUserPicture.fields([{ name: "defaultPicture", maxCount: 1 }]),
    validate(registerSchema),
    registerUser,
  );
router.route("/login").post(validate(loginSchema), loginUser);

//Protected Routes
router.route("/logout").post(verifyAccessToken, logoutUser);
router.route("/refresh-tokens").post(regenerateAccessToken);
router.route("/verify-email").post(verifyEmailToken, validate(userOtpSchema), verifyUser);
router.route("/resend-otp").post(verifyEmailToken, resendOtp);
router.route("/current-user").get(verifyAccessToken, getCurrentUser);

export default router;
