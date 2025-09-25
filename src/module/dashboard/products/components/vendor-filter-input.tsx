"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CircleX } from "lucide-react";
import { getProdutsInfo } from "../product.action";
import { useProductStore } from "../use-product-store";
import { cn } from "@/lib/utils";

type VendorFilterInputType = {
  info: Awaited<ReturnType<typeof getProdutsInfo>>["allVendors"];
  className?: string;
};
export default function VendorFilterInput({
  info,
  className,
}: VendorFilterInputType) {
  const { selectedVendor, setSelectedVendor } = useProductStore();

  return (
    <div className="flex gap-1">
      <Select
        value={selectedVendor?.name ?? ""}
        onValueChange={(val) =>
          setSelectedVendor(info.filter((item) => item.name === val)[0])
        }
      >
        <SelectTrigger className={cn("w-[180px]", className)}>
          <SelectValue placeholder="Select a vendor" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>vendors</SelectLabel>
            {info.map((item) => (
              <SelectItem key={item.name} value={item.name}>
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {selectedVendor && (
        <Button onClick={() => setSelectedVendor(null)} variant={"ghost"}>
          <CircleX /> Reset
        </Button>
      )}
    </div>
  );
}
