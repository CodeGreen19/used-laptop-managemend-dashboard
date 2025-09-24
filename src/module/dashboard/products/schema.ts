import z from "zod";

export const productSchema = z.object({
  brand: z
    .string()
    .min(1, "Brand cannot be empty.")
    .max(50, "Brand is too long."),

  model: z
    .string()
    .min(1, "Model cannot be empty.")
    .max(100, "Model is too long."),

  specs: z.string().optional(),
  condition: z.string().min(1, "Condition cannot be empty."),
  purchasePrice: z
    .string()
    .regex(
      /^\d+(\.\d{1,2})?$/,
      "Invalid purchase price format. Use up to 2 decimal places."
    ),
  purchaseDate: z.date().optional(),
  vendorId: z.string().min(1, "Selecting vendor is required"),
  status: z.string().min(1, "Status cannot be empty."),
});

export type ProductSchemaType = z.infer<typeof productSchema>;
export type ProductSchemaShape = typeof productSchema.shape;
