import z from "zod";

export const vendorSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too big"),
  phone: z.string(),
  address: z.string(),
  note: z.string(),
});

export type VendorSchemaType = z.infer<typeof vendorSchema>;
export type VendorSchemaShape = typeof vendorSchema.shape;

export type GetVendorsType = {
  limit: number;
  offset: number;
};
