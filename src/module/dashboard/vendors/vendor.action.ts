"use server";
import { db } from "@/drizzle/db";
import { vendors } from "@/drizzle/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { VendorSchemaType } from "./schema";

export async function createVendor(input: VendorSchemaType) {
  const exist = await db
    .select()
    .from(vendors)
    .where(eq(vendors.name, input.name));

  console.log(input);

  if (exist.length) {
    return { message: "Store name already exist" };
  }
  await db.insert(vendors).values(input).returning();
  revalidatePath("/dashboard/vendors");
  return { message: "New vendor added" };
}
export async function updateVendor({
  input,
  id,
}: {
  input: VendorSchemaType;
  id: string;
}) {
  const [originalStore] = await db
    .select()
    .from(vendors)
    .where(eq(vendors.id, id));
  if (!originalStore) {
    return { message: "Vendor doesn't exist!" };
  }

  const [exist] = await db
    .select()
    .from(vendors)
    .where(eq(vendors.name, input.name));

  if (exist && exist.name !== originalStore.name) {
    return { message: "Store name already exist" };
  }
  await db.update(vendors).set(input).where(eq(vendors.id, id));
  revalidatePath("/dashboard/vendors");
  return { message: "Vendor info updated" };
}
export async function deleteVendor({ id }: { id: string }) {
  await db.delete(vendors).where(eq(vendors.id, id));
  revalidatePath("/dashboard/vendors");
  return { message: "Vendor is deleted" };
}
export async function getVendorsInfo() {
  const vendorsInfo = await db
    .select()
    .from(vendors)
    .orderBy(desc(vendors.createdAt));
  return vendorsInfo;
}
