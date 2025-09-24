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

type VendorFilterInputType = {
  info: Awaited<ReturnType<typeof getProdutsInfo>>["allVendors"];
};
export default function VendorFilterInput({ info }: VendorFilterInputType) {
  const { selectedVendor, setSelectedVendor } = useProductStore();

  return (
    <div className="flex gap-1">
      <Select
        value={selectedVendor?.name ?? ""}
        onValueChange={(val) =>
          setSelectedVendor(info.filter((item) => item.name === val)[0])
        }
      >
        <SelectTrigger className="w-[180px]">
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
