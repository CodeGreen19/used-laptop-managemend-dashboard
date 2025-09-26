"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BadgeCheck,
  CalendarDays,
  DollarSign,
  Factory,
  HardDrive,
  IdCard,
  LayoutDashboard,
  ListChecks,
  ShoppingCart,
  Tag,
  User,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { getProdutsInfo } from "../product.action";

export default function ProductDetailInfo({
  info,
}: {
  info: Awaited<ReturnType<typeof getProdutsInfo>>["allProducts"][number];
}) {
  return (
    <ScrollArea className="h-[calc(100vh-6rem)] pr-2">
      <Card className="shadow-none border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-primary" />
            Product Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <InfoRow
            icon={<Factory className="h-4 w-4" />}
            label="Brand"
            value={info.brand}
          />
          <InfoRow
            icon={<Tag className="h-4 w-4" />}
            label="Model"
            value={info.model}
          />
          <InfoRow
            icon={<ListChecks className="h-4 w-4" />}
            label="Condition"
            value={info.condition}
          />
          <InfoRow
            icon={<BadgeCheck className="h-4 w-4" />}
            label="Status"
            value={info.status}
          />
          {info.specs && (
            <InfoRow
              icon={<HardDrive className="h-4 w-4" />}
              label="Specs"
              value={info.specs}
            />
          )}

          <Separator className="my-2" />

          <InfoRow
            icon={<DollarSign className="h-4 w-4" />}
            label="Purchase Price"
            value={`৳ ${info.purchasePrice}`}
          />
          {info.importingExpenses && (
            <InfoRow
              icon={<ShoppingCart className="h-4 w-4" />}
              label="Import Expenses"
              value={`৳ ${info.importingExpenses}`}
            />
          )}
          {info.sellingPrice && (
            <InfoRow
              icon={<ShoppingCart className="h-4 w-4" />}
              label="Selling Price"
              value={`৳ ${info.sellingPrice}`}
            />
          )}
          {info.soldPrice && (
            <InfoRow
              icon={<ShoppingCart className="h-4 w-4" />}
              label="Sold Price"
              value={`৳ ${info.soldPrice}`}
            />
          )}
          {info.profit && (
            <InfoRow
              icon={<DollarSign className="h-4 w-4" />}
              label="Profit"
              value={`৳ ${info.profit}`}
              className={
                Number(info.profit) < 0 ? "text-red-500" : "text-emerald-500"
              }
            />
          )}

          <Separator className="my-2" />

          {info.purchaseDate && (
            <InfoRow
              icon={<CalendarDays className="h-4 w-4" />}
              label="Purchase Date"
              value={format(info.purchaseDate, "PP")}
            />
          )}
          {info.soldDate && (
            <InfoRow
              icon={<CalendarDays className="h-4 w-4" />}
              label="Sold Date"
              value={format(info.soldDate, "PP")}
            />
          )}

          <Separator className="my-2" />

          <InfoRow
            icon={<User className="h-4 w-4" />}
            label="Vendor"
            value={info.vendorId}
          />
          {info.customerId && (
            <InfoRow
              icon={<IdCard className="h-4 w-4" />}
              label="Customer"
              value={info.customerId}
            />
          )}
        </CardContent>
      </Card>
    </ScrollArea>
  );
}

function InfoRow({
  icon,
  label,
  value,
  className,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number | null;
  className?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="text-muted-foreground mt-0.5">{icon}</div>
      <div className="flex flex-col">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className={cn("font-medium", className)}>{value || "-"}</span>
      </div>
    </div>
  );
}
