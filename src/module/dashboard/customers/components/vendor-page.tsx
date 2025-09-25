"use client";

import React, { Suspense } from "react";
import DataTable from "./data-table";
import SectionHeader from "@/components/shared/section-header";
import CustomTableSkeleton from "@/components/shared/custom-table-skeleton";
import AddCustomerForm from "./add-customer-form";

export default function CustomersPage() {
  return (
    <section>
      <SectionHeader
        AddNewFormComponent={<AddCustomerForm />}
        addNewFormHeading="Add new Customer"
        buttonText="Add Customer"
      />
      <Suspense fallback={<CustomTableSkeleton />}>
        <DataTable />
      </Suspense>
    </section>
  );
}
