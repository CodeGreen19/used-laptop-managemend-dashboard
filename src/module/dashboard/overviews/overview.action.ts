"use server";

import { db } from "@/drizzle/db";
import { customers, products } from "@/drizzle/schema";
import { count } from "drizzle-orm";

export async function getDashboardOverViews() {
  const [{ productCount }] = await db
    .select({ productCount: count() })
    .from(products);
  const [{ customerCount }] = await db
    .select({ customerCount: count() })
    .from(customers);

  const productProfits = await db
    .select({ profit: products.profit })
    .from(products);

  const profilt = productProfits.reduce(
    (prev, current) => prev + Number(current.profit ?? 0),
    0
  );

  return { productCount, customerCount, profilt };
}
