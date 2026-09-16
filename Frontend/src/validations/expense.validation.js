import * as z from "zod";

const createExpenseSchema = z.object({
  title: z.string().max(100).min(2, "Title is required"),
  amount: z.coerce.number().positive("Amount must be a greater than 0"),
  date: z.coerce.date("Date is required"),
  categoryId: z
    .string()
    .min(1, "Category ID is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),
  description: z
    .string()
    .max(500, "Description must be at most 500 characters")
    .optional(),
  paymentMethod: z
    .enum(["cash", "upi", "card", "netbanking"], {
      message: "Invalid payment method",
    })
    .optional(),
});

const deleteBulkExpensesSchema = z.object({
  ids: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid expense ID"))
    .min(1, "At least one expense ID is required")
    .max(100, "Cannot delete more than 100 expenses at once"),
});

const reassignCategorySchema = z
  .object({
    fromCategoryId: z
      .string()
      .min(1, "Category ID is required")
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),
    toCategoryId: z
      .string()
      .min(1, "Category ID is required")
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID"),
  })
  .refine((data) => data.fromCategoryId !== data.toCategoryId, {
    message: "fromCategoryId and toCategoryId cannot be the same",
    path: ["toCategoryId"],
  });

export {
  createExpenseSchema,
  deleteBulkExpensesSchema,
  reassignCategorySchema,
};
