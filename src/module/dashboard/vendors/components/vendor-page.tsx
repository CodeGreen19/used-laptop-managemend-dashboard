"use client";

import React, { Suspense } from "react";
import AddVendorForm from "./add-vendor-form";
import DataTable from "./data-table";
import SectionHeader from "@/components/shared/section-header";
import CustomTableSkeleton from "@/components/shared/custom-table-skeleton";

export default function VendorsPage() {
  return (
    <section>
      <SectionHeader
        AddNewFormComponent={AddVendorForm}
        addNewFormHeading="Add new vendor"
        buttonText="Add Vendor"
      />
      <Suspense fallback={<CustomTableSkeleton />}>
        <DataTable />
      </Suspense>
    </section>
  );
}
