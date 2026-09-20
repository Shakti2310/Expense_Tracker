import { Router } from "express";
import {
  registerUser,
  getCurrentUser,
  loginUser,
  logoutUser,
  regenerateAccessToken,
  verifyUser,
  updateUser,
  changePassword,
} from "../controllers/user.controller.js";
import { resendOtp } from "../controllers/otp.controller.js";
import { uploadUserPicture } from "../middlewares/multer.middleware.js";
import verifyAccessToken from "../middlewares/auth.middleware.js";
import { validateReqBody } from "../middlewares/validation.middleware.js";
import {
  registerSchema,
  loginSchema,
  userOtpSchema,
  updateUserSchema,
  changePasswordSchema,
} from "../validations/user.validation.js";

const router = Router();

router
  .route("/register")
  .post(
    uploadUserPicture.fields([{ name: "defaultPicture", maxCount: 1 }]),
    validateReqBody(registerSchema),
    registerUser,
  );
router.route("/login").post(validateReqBody(loginSchema), loginUser);

//Protected Routes
router.route("/logout").post(verifyAccessToken, logoutUser);
router.route("/refresh-tokens").post(regenerateAccessToken);
router
  .route("/verify-email")
  .post(verifyAccessToken, validateReqBody(userOtpSchema), verifyUser);
router.route("/resend-otp").post(verifyAccessToken, resendOtp);
router.route("/current-user").get(verifyAccessToken, getCurrentUser);
router
  .route("/updateUser")
  .patch(
    verifyAccessToken,
    uploadUserPicture.single("defaultPicture"),
    validateReqBody(updateUserSchema),
    updateUser,
  );

router
  .route("/change-password")
  .patch(
    verifyAccessToken,
    validateReqBody(changePasswordSchema),
    changePassword,
  );

export default router;
