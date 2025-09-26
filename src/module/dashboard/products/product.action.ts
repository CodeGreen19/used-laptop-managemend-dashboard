"use server";
import { db } from "@/drizzle/db";
import { products, vendors } from "@/drizzle/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { ProductSchemaType } from "./schema";
import { SellProductInfoType } from "./types";

export async function createProduct(input: ProductSchemaType) {
  await db.insert(products).values(input);
  revalidatePath("/dashboard/products");
  return { message: "New product added" };
}
export async function updateProduct({
  input,
  id,
}: {
  input: ProductSchemaType;
  id: string;
}) {
  await db
    .update(products)
    .set({
      ...input,
    })
    .where(eq(products.id, id));

  revalidatePath("/dashboard/products");
  return { message: "Product info updated" };
}
export async function deleteProduct({ id }: { id: string }) {
  await db.delete(products).where(eq(products.id, id));
  revalidatePath("/dashboard/products");
  return { message: "Product is deleted" };
}

export async function sellProduct(info: SellProductInfoType) {
  const [productInfo] = await db
    .select({
      purchasePrice: products.purchasePrice,
      importingCost: products.importingExpenses,
    })
    .from(products)
    .where(eq(products.id, info.productId));

  const profit = Number(
    Number(info.soldPrice) -
      Number(
        Number(productInfo.importingCost) + Number(productInfo.purchasePrice)
      )
  );

  await db
    .update(products)
    .set({
      customerId: info.customerId,
      soldPrice: info.soldPrice,
      soldDate: new Date(),
      status: "Sold",
      profit: profit.toString(),
    })
    .where(eq(products.id, info.productId));
  revalidatePath("/dashboard/products");
  revalidatePath("/dashboard/customers");
  return { message: "Product is Sold" };
}

export async function getProdutsInfo() {
  const allProducts = await db
    .select()
    .from(products)
    .orderBy(desc(products.createdAt));

  const allVendors = await db
    .select({ id: vendors.id, name: vendors.name })
    .from(vendors);
  return { allProducts, allVendors };
}
