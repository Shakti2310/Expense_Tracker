import { Router } from "express";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";
import {
  getAllCategories,
  getCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { uploadCategoryIcon } from "../middlewares/multer.middleware.js";
import {validateReqBody} from "../middlewares/validation.middleware.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/category.validation.js";

const router = Router();

router
  .route("/")
  .get(verifyAccessToken, getAllCategories)
  .post(
    verifyAccessToken,
    uploadCategoryIcon.single("icon"),
    validateReqBody(createCategorySchema),
    addCategory,
  );

router
  .route("/:id")
  .get(verifyAccessToken, getCategory)
  .patch(verifyAccessToken, validateReqBody(updateCategorySchema), updateCategory)
  .delete(verifyAccessToken, deleteCategory);

export default router;
