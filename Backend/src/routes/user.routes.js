import Router from "express";
import {
  registerUser,
  getUsers,
  loginUser,
  logoutUser,
  regenerateJWT,
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

export default router;
