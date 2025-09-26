import { getQueryClient } from "@/lib/tanstack-query-setup/get-query-client";
import DashboardOverViewPage from "@/module/dashboard/overviews/components/overview-page";
import { getDashboardOverViews } from "@/module/dashboard/overviews/overview.action";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

export default function page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery({
    queryKey: ["overviews"],
    queryFn: () => getDashboardOverViews(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DashboardOverViewPage />
    </HydrationBoundary>
  );
}
