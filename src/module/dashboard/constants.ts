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
