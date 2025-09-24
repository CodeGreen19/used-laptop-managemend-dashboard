import { getQueryClient } from "@/lib/tanstack-query-setup/get-query-client";
import VendorsPage from "@/module/dashboard/vendors/components/vendor-page";
import { getVendorsInfo } from "@/module/dashboard/vendors/vendor.action";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery({
    queryKey: ["vendors"],
    queryFn: () => getVendorsInfo(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VendorsPage />
    </HydrationBoundary>
  );
}
