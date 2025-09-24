import { relations } from "drizzle-orm";
import {
  decimal,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { vendors } from "./vendor";

export const products = pgTable("products", {
  id: uuid("id").primaryKey().defaultRandom(),
  brand: varchar("brand", { length: 50 }).notNull(),
  model: varchar("model", { length: 100 }).notNull(),
  specs: text("specs"), // JSON string or plain text for CPU, RAM, etc.
  condition: varchar("condition", { length: 20 }).notNull().default("good"), // from conditions[]
  purchasePrice: decimal("purchase_price", {
    precision: 10,
    scale: 2,
  }).notNull(),
  purchaseDate: timestamp("purchase_date").defaultNow(),
  vendorId: uuid("vendor_id")
    .notNull()
    .references(() => vendors.id, {
      onDelete: "set null",
    }),
  status: varchar("status", { length: 20 }).notNull().default("available"), // from laptopStatuses[]
  sellingPrice: decimal("selling_price", { precision: 10, scale: 2 }),
  soldDate: timestamp("sold_date"),
  //   customerId: integer("customer_id").references(() => customers.id, {
  //     onDelete: "set null",
  //   }),
  createdAt: timestamp("created_at").defaultNow(),
});

export const productsRelation = relations(products, ({ one }) => ({
  vendor: one(vendors, {
    fields: [products.vendorId],
    references: [vendors.id],
  }),
}));
