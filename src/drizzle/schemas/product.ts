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
  condition: varchar("condition", { length: 20 }).notNull().default("good"), // from conditions[]
  status: varchar("status", { length: 20 }).notNull().default("available"), // from laptopStatuses[]
  specs: text("specs"), // JSON string or plain text for CPU, RAM, etc.
  purchasePrice: decimal("purchase_price", {
    precision: 10,
    scale: 2,
  }).notNull(),
  importingExpenses: varchar("importing_expenses", { length: 50 }),
  sellingPrice: decimal("selling_price", { precision: 10, scale: 2 }),
  soldPrice: decimal("sold_price", { precision: 10, scale: 2 }),
  profit: decimal("profit", { precision: 10, scale: 2 }),
  purchaseDate: timestamp("purchase_date").defaultNow(),
  soldDate: timestamp("sold_date"),
  vendorId: uuid("vendor_id")
    .notNull()
    .references(() => vendors.id, {
      onDelete: "set null",
    }),
  //   customerId: integer("customer_id").references(() => customers.id, {
  //     onDelete: "set null",
  //   }),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").$onUpdate(() => new Date()),
});

export const productsRelation = relations(products, ({ one }) => ({
  vendor: one(vendors, {
    fields: [products.vendorId],
    references: [vendors.id],
  }),
}));
