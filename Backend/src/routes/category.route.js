import { Router } from "express";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";
import {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
} from "../controllers/category.controller.js";
import { uploadCategoryIcon } from "../middlewares/multer.middleware.js";

const router = Router();

router
  .route("/")
  .get(verifyAccessToken, getAllCategories)
  .post(verifyAccessToken, uploadCategoryIcon.single("icon"), addCategory)
  .delete(verifyAccessToken, deleteAllCategories);

router
  .route("/:id")
  .get(verifyAccessToken, getCategory)
  .patch(verifyAccessToken, updateCategory)
  .delete(verifyAccessToken, deleteCategory);

export default router;
