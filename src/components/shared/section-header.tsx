"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";

type HeaderType = {
  buttonText: string;
  AddNewFormComponent: React.JSX.Element;
  addNewFormHeading: string;
  leftSideComp?: React.JSX.Element;
};

export default function SectionHeader({
  AddNewFormComponent,
  leftSideComp,
  ...props
}: HeaderType) {
  return (
    <div className="w-full flex items-center justify-between">
      <div>{leftSideComp}</div>
      <div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>{props.buttonText}</Button>
          </SheetTrigger>
          <SheetContent className="gap-0 overflow-y-auto">
            <SheetHeader>
              <SheetTitle>{props.addNewFormHeading}</SheetTitle>
            </SheetHeader>
            <div className="p-4">{AddNewFormComponent}</div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
