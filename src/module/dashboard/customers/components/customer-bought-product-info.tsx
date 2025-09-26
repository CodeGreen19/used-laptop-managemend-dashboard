"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { BadgeDollarSign, CalendarDays, Laptop } from "lucide-react";
import { getCustomersInfo } from "../customer.action";

type CustomerBoughtProductInfoType = {
  info: Awaited<ReturnType<typeof getCustomersInfo>>[0]["products"];
};

export default function CustomerBoughtProductInfo({
  info,
}: CustomerBoughtProductInfoType) {
  if (!info || info.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-6 text-sm">
        No products bought yet
      </div>
    );
  }

  return (
    <ScrollArea className="h-[calc(100vh-6rem)] pr-2">
      <Card className="shadow-none border-0">
        <CardContent className="space-y-3 p-0">
          {info.map((product) => (
            <div
              key={product.id}
              className="rounded-lg border p-3 bg-muted/30 space-y-2"
            >
              <div className="flex items-center gap-2 font-medium">
                <Laptop className="h-4 w-4 text-muted-foreground" />
                {product.brand}
              </div>
              <p className="text-sm text-muted-foreground">{product.model}</p>

              <div className="grid grid-cols-[1fr_2fr] gap-2 text-xs">
                <div className="flex items-center gap-1 text-muted-foreground">
                  <BadgeDollarSign className="h-3 w-3" />
                  <span className="font-medium text-foreground">
                    {product.soldPrice
                      ? `৳ ${product.soldPrice}`
                      : "Not available"}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <CalendarDays className="h-3 w-3" />
                  <p>
                    {product.soldDate
                      ? format(product.soldDate, "PPpp")
                      : "Not available"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </ScrollArea>
  );
}
