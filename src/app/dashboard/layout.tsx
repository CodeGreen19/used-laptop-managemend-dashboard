import DashboardLayout from "@/module/dashboard/layout";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
