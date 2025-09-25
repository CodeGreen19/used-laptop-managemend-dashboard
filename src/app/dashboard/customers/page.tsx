import { getQueryClient } from "@/lib/tanstack-query-setup/get-query-client";
import CustomersPage from "@/module/dashboard/customers/components/vendor-page";
import { getCustomersInfo } from "@/module/dashboard/customers/customer.action";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export default async function page() {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery({
    queryKey: ["customers"],
    queryFn: () => getCustomersInfo(),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CustomersPage />
    </HydrationBoundary>
  );
}
