import * as z from "zod";

const addExpenseBodySchema = z.object({
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

const updateExpenseBodySchema = addExpenseBodySchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    "At least one field must be provided for update",
  );

const deleteBulkExpensesBodySchema = z.object({
  ids: z
    .array(z.string().regex(/^[0-9a-fA-F]{24}$/, "Invalid expense ID"))
    .min(1, "At least one expense ID is required")
    .max(100, "Cannot delete more than 100 expenses at once"),
});

const reassignCategoryBodySchema = z
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

const getAllExpensesQuerySchema = z
  .object({
    category: z
      .string()
      .min(1, "Category ID is required")
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid category ID")
      .optional(),
    startDate: z.coerce
      .date()
      .max(new Date(), "Start date cannot be in the future")
      .optional(),
    endDate: z.coerce.date().optional(),
    minAmount: z.coerce
      .number()
      .positive("Amount must be a greater than 0")
      .optional(),
    maxAmount: z.coerce
      .number()
      .positive("Amount must be a greater than 0")
      .optional(),
    paymentMethod: z.enum(["cash", "upi", "card", "netbanking"]).optional(),
    search: z
      .string()
      .max(100)
      .min(2, "Search term must be at least 2 characters")
      .optional(),
    page: z.coerce
      .number()
      .int()
      .positive("Page number must be a positive integer")
      .optional(),
    limit: z.coerce
      .number()
      .int()
      .min(1)
      .max(100, "You can access maximum of 100 expenses only")
      .optional(),
    sortBy: z
      .enum(["date", "amount"], {
        message: "You can only sort either by date or amount",
      })
      .optional(),
    sortOrder: z
      .enum(["asc", "desc"], { message: "Sorting order must be asc or desc" })
      .optional(),
  })
  .refine(
    (data) =>
      !data.minAmount || !data.maxAmount || data.minAmount <= data.maxAmount,
    {
      message: "minAmount cannot be greater than maxAmount",
      path: ["minAmount"],
    },
  );

export {
  addExpenseBodySchema,
  updateExpenseBodySchema,
  deleteBulkExpensesBodySchema,
  reassignCategoryBodySchema,
  getAllExpensesQuerySchema,
};
