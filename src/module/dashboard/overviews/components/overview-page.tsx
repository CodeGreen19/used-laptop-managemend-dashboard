"use client";

import { DollarSign, ShoppingCart, Users } from "lucide-react";
import OverViewLayout from "./overview-layout";
import { SideCalendar, DummyList, StatCard } from "./overview-info-boxes";
import { useSuspenseQuery } from "@tanstack/react-query";
import { getDashboardOverViews } from "../overview.action";

export default function DashboardOverviewPage() {
  const { data, isPending } = useSuspenseQuery({
    queryKey: ["overviews"],
    queryFn: () => getDashboardOverViews(),
  });
  return (
    <OverViewLayout
      isPending={isPending}
      left={{
        firstCompnents: {
          heading: "Quick Stats",
          firstBox: (
            <StatCard
              title="Revenue"
              value={data.profilt.toString()}
              icon={<DollarSign />}
            />
          ),
          secondBox: (
            <StatCard
              title="Products"
              value={data.productCount.toString()}
              icon={<ShoppingCart />}
            />
          ),
          thirdBox: (
            <StatCard
              title="Customers"
              value={data.customerCount.toString()}
              icon={<Users />}
            />
          ),
        },
        secondCompnents: {
          heading: "Sales Overview",
          firstBox: (
            <StatCard title="Chart 1" value="..." icon={<DollarSign />} />
          ),
          secondBox: (
            <StatCard title="Chart 2" value="..." icon={<ShoppingCart />} />
          ),
          thirdBox: (
            <StatCard title="Top Products" value="..." icon={<Users />} />
          ),
        },
        thirdCompnent: {
          heading: "Recent Activity",
          firstBox: <DummyList />,
        },
      }}
      right={{
        firstCompnents: {
          heading: "Schedule",
          calenderBox: <SideCalendar />,
        },
      }}
    />
  );
}
