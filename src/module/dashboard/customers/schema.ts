import z from "zod";

export const customerSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too big"),
  phone: z.string(),
  address: z.string(),
});

export type CustomerSchemaType = z.infer<typeof customerSchema>;
export type CustomerSchemaShape = typeof customerSchema.shape;
