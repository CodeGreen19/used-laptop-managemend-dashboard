import { Laptop, LayoutDashboardIcon, ShoppingCart } from "lucide-react";

// This is sample data.
export const SideBarData = {
  menu: [
    {
      name: "Overviews",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      name: "Vendors",
      url: "/dashboard/vendors",
      icon: ShoppingCart,
    },
    {
      name: "Products",
      url: "/dashboard/products",
      icon: Laptop,
    },
  ],
};

export const productStatuses = ["Available", "Reserved", "Sold"] as const;
export const conditions = ["Excellent", "Good", "Fair", "Poor"] as const;
export const paymentStatuses = ["Paid", "Pending", "Partial"] as const;
export const paymentMethods = ["Cash", "Card", "Bank"] as const;
export const expenseTypes = ["Salary", "Rent", "Utility", "Misc"] as const;
export const repairStatuses = [
  "Pending",
  "In-progress",
  "Completed",
  "Delivered",
] as const;
