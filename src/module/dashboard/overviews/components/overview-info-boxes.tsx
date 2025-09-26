"use client";

import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarRange } from "lucide-react";
import React from "react";

function DummyList() {
  return (
    <Card className="rounded-md shadow-none">
      <CardContent>
        <ul className="space-y-2 text-sm">
          <li className="flex justify-between">
            <span>New order placed</span>
            <span className="text-muted-foreground">2m ago</span>
          </li>
          <li className="flex justify-between">
            <span>Customer signed up</span>
            <span className="text-muted-foreground">10m ago</span>
          </li>
          <li className="flex justify-between">
            <span>Product sold</span>
            <span className="text-muted-foreground">1h ago</span>
          </li>
        </ul>
      </CardContent>
    </Card>
  );
}

function SideCalendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  return (
    <Card className="rounded-md shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <CalendarRange className="h-4 w-4" />
          Calendar
        </CardTitle>
      </CardHeader>
      <CardContent className="text-muted-foreground p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-lg  w-full"
        />
      </CardContent>
    </Card>
  );
}

/* ----------------- Dummy Components ----------------- */
function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <Card className="rounded-md shadow-none">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}

export { SideCalendar, DummyList, StatCard };
