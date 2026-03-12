import Router from "express";
import {
  registerUser,
  getUsers,
  loginUser,
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/list").get(getUsers);
router.route("login").post(loginUser);
router
  .route("/register")
  .post(upload.fields([{ name: "defaultPicture", maxCount: 1 }]), registerUser);

export default router;
