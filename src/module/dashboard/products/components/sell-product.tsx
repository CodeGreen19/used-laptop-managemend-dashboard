"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { getQueryClient } from "@/lib/tanstack-query-setup/get-query-client";
import { useQuery } from "@tanstack/react-query";
import { getCustomersInfo } from "../../customers/customer.action";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  CircleChevronDownIcon,
  CircleX,
  ClockFading,
  List,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { productMutation } from "../mutations";
import { toast } from "sonner";
import { SheetClose } from "@/components/ui/sheet";
type CustomerType = { name: string; id: string };

export default function SellProduct({
  productId,
  soldStatus,
}: {
  productId: string;
  soldStatus: boolean;
}) {
  const sellMutation = productMutation.useSellProduct();
  const [selectCustomer, setSelectedCustomer] = useState<CustomerType | null>(
    null
  );
  const closeRef = useRef<HTMLButtonElement>(null);
  const [soldPrice, setSoldPrice] = useState<string>("");
  const queryClient = getQueryClient();
  const { data, isPending, error } = useQuery({
    queryKey: ["customer-Info"],
    queryFn: async () => {
      const data = queryClient.getQueryData(["customers"]) as Awaited<
        ReturnType<typeof getCustomersInfo>
      >;
      if (data) {
        return data;
      } else {
        const freshData = await getCustomersInfo();
        return freshData;
      }
    },
  });
  if (isPending) {
    return <Skeleton className="w-[90px] h-10" />;
  }
  if (error) {
    return "Error";
  }
  return (
    <div>
      {!soldStatus && selectCustomer ? (
        <div className="space-y-3">
          <div className="flex items-center justify-start  gap-1 flex-wrap">
            <h1 className="font-semibold text-sm pr-3">
              {selectCustomer.name}
            </h1>
            <Button
              variant={"outline"}
              onClick={() => setSelectedCustomer(null)}
            >
              <CircleX /> Reset
            </Button>
          </div>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (soldPrice.length < 3) {
                return toast.error("Give a valid amount");
              }
              sellMutation.mutate(
                {
                  customerId: selectCustomer.id,
                  soldPrice,
                  productId,
                },
                { onSuccess: () => closeRef.current?.click() }
              );
            }}
          >
            <Input
              placeholder="Enter sold price"
              value={soldPrice}
              type="number"
              onChange={(e) => setSoldPrice(e.target.value)}
            />
            <div className="flex justify-end ">
              <Button disabled={sellMutation.isPending}>Submit</Button>
            </div>
          </form>
        </div>
      ) : !soldStatus ? (
        <div>
          <CustomSelectionInput
            onSelectCustomer={setSelectedCustomer}
            data={data}
          />
        </div>
      ) : (
        <SoldFinalized />
      )}

      <SheetClose ref={closeRef} className="hidden" />
    </div>
  );
}

type CustomSelectionInputType = {
  data: CustomerType[];
  onSelectCustomer: (info: CustomerType) => void;
};
export function CustomSelectionInput({
  data,
  onSelectCustomer,
}: CustomSelectionInputType) {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={"outline"}>
            Select User <CircleChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent align="start" className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search language..." />
            <CommandList>
              <CommandEmpty>No language found.</CommandEmpty>
              <CommandGroup>
                {data.map((info) => (
                  <CommandItem
                    value={info.name}
                    key={info.id}
                    onSelect={() => onSelectCustomer(info)}
                  >
                    <List className={cn("mr-2 h-4 w-4")} />
                    {info.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function SoldFinalized() {
  return (
    <div className="flex items-center justify-center h-[200px] border border-dashed">
      <Button variant={"ghost"}>
        This product is sold out <ClockFading />
      </Button>
    </div>
  );
}
