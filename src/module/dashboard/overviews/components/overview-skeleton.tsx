"use client";

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardSkeleton() {
  return (
    <main className="grid gap-6 md:grid-cols-[3fr_1.3fr] p-4">
      {/* Left Section */}
      <section className="space-y-6">
        {/* Row 1 - Stats */}
        <div>
          <Skeleton className="h-5 w-32 mb-3" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
          </div>
        </div>

        {/* Row 2 - Charts */}
        <div>
          <Skeleton className="h-5 w-40 mb-3" />
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4">
            <div className="grid grid-cols-1 gap-4">
              <ChartSkeleton />
              <ChartSkeleton />
            </div>
            <Card className="rounded-md shadow-none">
              <CardHeader>
                <Skeleton className="h-5 w-28" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-32 w-full rounded-md" />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Row 3 - List */}
        <div>
          <Skeleton className="h-5 w-36 mb-3" />
          <ListSkeleton />
        </div>
      </section>

      {/* Right Section */}
      <section className="hidden md:block space-y-6">
        <div>
          <Skeleton className="h-5 w-28 mb-3" />
          <CalendarSkeleton />
        </div>
      </section>
    </main>
  );
}

/* ----------------- Sub Skeletons ----------------- */

function StatSkeleton() {
  return (
    <Card className="rounded-md shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-6 w-6 rounded-full" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-16" />
      </CardContent>
    </Card>
  );
}

function ChartSkeleton() {
  return (
    <Card className="rounded-md shadow-none">
      <CardHeader>
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-40 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}

function ListSkeleton() {
  return (
    <Card className="rounded-md shadow-none">
      <CardHeader>
        <Skeleton className="h-4 w-32" />
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[1.5rem_1fr_auto] gap-4 border-b pb-2">
          <div></div>
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-12 ml-auto" />
        </div>
        <ul className="divide-y">
          {[1, 2, 3].map((i) => (
            <li
              key={i}
              className="grid grid-cols-[1.5rem_1fr_auto] gap-4 py-2 items-center"
            >
              <Skeleton className="h-4 w-4 rounded-full" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-12 ml-auto" />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function CalendarSkeleton() {
  return (
    <Card className="rounded-md shadow-none">
      <CardHeader>
        <Skeleton className="h-4 w-24" />
      </CardHeader>
      <CardContent className="h-64 flex items-center justify-center">
        <Skeleton className="h-56 w-full rounded-md" />
      </CardContent>
    </Card>
  );
}
