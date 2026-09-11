import { Router } from "express";
import {
  addExpense,
  getAllExpenses,
  getExpense,
  updateExpense,
  deleteExpense,
  deleteBulkExpenses,
  reassignCategory,
} from "../controllers/expense.controller.js";
import { verifyAccessToken } from "../middlewares/auth.middleware.js";
import {
  validateReqBody,
  validateReqQuery,
} from "../middlewares/validation.middleware.js";
import {
  addExpenseBodySchema,
  updateExpenseBodySchema,
  deleteBulkExpensesBodySchema,
  reassignCategoryBodySchema,
  getAllExpensesQuerySchema,
} from "../validations/expense.validation.js";

const router = Router();

router
  .route("/")
  .post(verifyAccessToken, validateReqBody(addExpenseBodySchema), addExpense)
  .get(
    verifyAccessToken,
    validateReqQuery(getAllExpensesQuerySchema),
    getAllExpenses,
  );

router
  .route("/bulk")
  .delete(
    verifyAccessToken,
    validateReqBody(deleteBulkExpensesBodySchema),
    deleteBulkExpenses,
  );
router
  .route("/reassign-category")
  .patch(
    verifyAccessToken,
    validateReqBody(reassignCategoryBodySchema),
    reassignCategory,
  );

router
  .route("/:id")
  .get(verifyAccessToken, getExpense)
  .patch(
    verifyAccessToken,
    validateReqBody(updateExpenseBodySchema),
    updateExpense,
  )
  .delete(verifyAccessToken, deleteExpense);

export default router;
