import { getQueryClient } from "@/lib/tanstack-query-setup/get-query-client";
import ProductsPage from "@/module/dashboard/products/components/products-page";
import { getProdutsInfo } from "@/module/dashboard/products/product.action";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import React from "react";

export default function page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery({
    queryKey: ["products"],
    queryFn: () => getProdutsInfo(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsPage />
    </HydrationBoundary>
  );
}
