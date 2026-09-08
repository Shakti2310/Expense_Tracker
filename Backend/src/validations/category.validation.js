import * as z from "zod";

const createCategorySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Category name must be at least 2 characters long")
    .max(25, "Category name must be under 25 characters")
    .refine(
      (value) => value.split(/\s+/).length <= 2,
      "Category name must contain at most 2 words",
    ),
});

const updateCategorySchema = createCategorySchema.partial();

export { createCategorySchema, updateCategorySchema };
