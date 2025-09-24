"use client";

import CustomTableSkeleton from "@/components/shared/custom-table-skeleton";
import SectionHeader from "@/components/shared/section-header";
import { Suspense } from "react";
import AddProductForm from "./add-product-form";
import DataTable from "./data-table";

export default function ProductsPage() {
  return (
    <div>
      <SectionHeader
        AddNewFormComponent={<AddProductForm />}
        addNewFormHeading="Add new product"
        buttonText="Add Product"
      />
      <Suspense fallback={<CustomTableSkeleton />}>
        <DataTable />
      </Suspense>
    </div>
  );
}
