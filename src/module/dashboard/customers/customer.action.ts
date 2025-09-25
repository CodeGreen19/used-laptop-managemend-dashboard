"use server";
import { db } from "@/drizzle/db";
import { customers } from "@/drizzle/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { CustomerSchemaType } from "./schema";

export async function createCustomer(input: CustomerSchemaType) {
  const exist = await db
    .select()
    .from(customers)
    .where(eq(customers.name, input.name));

  if (exist.length) {
    return { message: "Customer name already exist" };
  }
  await db.insert(customers).values(input).returning();
  revalidatePath("/dashboard/customers");

  return { message: "New customer added" };
}
export async function updateCustomer({
  input,
  id,
}: {
  input: CustomerSchemaType;
  id: string;
}) {
  const [originalCustomer] = await db
    .select()
    .from(customers)
    .where(eq(customers.id, id));
  if (!originalCustomer) {
    return { message: "Customer doesn't exist!" };
  }

  const [exist] = await db
    .select()
    .from(customers)
    .where(eq(customers.name, input.name));

  if (exist && exist.name !== originalCustomer.name) {
    return { message: "Customer name already exist" };
  }
  await db.update(customers).set(input).where(eq(customers.id, id));
  revalidatePath("/dashboard/customers");

  return { message: "Customer info updated" };
}
export async function deleteCustomer({ id }: { id: string }) {
  await db.delete(customers).where(eq(customers.id, id));
  revalidatePath("/dashboard/customers");

  return { message: "Customer is deleted" };
}
export async function getCustomersInfo() {
  const customersInfo = await db
    .select()
    .from(customers)
    .orderBy(desc(customers.createdAt));
  return customersInfo;
}
