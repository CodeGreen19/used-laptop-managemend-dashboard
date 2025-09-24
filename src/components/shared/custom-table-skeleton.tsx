import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function CustomTableSkeleton() {
  return (
    <div className="space-y-2 mt-3">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[230px]" />
        <div className="flex items-center gap-1">
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
      <div>
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i}>
            <Skeleton className="w-full h-12 mt-1" />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-[200px]" />
        <div className="flex items-center gap-1">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>
    </div>
  );
}
