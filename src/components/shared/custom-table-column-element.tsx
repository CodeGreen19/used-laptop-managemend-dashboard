"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Column, ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React, { useState } from "react";

function selectColumn<Tdata>(): ColumnDef<Tdata> {
  return {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  };
}

function SortableButton<Tdata>({
  column,
  title,
}: {
  column: Column<Tdata>;
  title: string;
}) {
  return (
    <div
      className="flex items-center gap-1 cursor-pointer"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title} <ArrowUpDown className="size-3" />
    </div>
  );
}

type TableActionsCompType = {
  type: "sheet" | "dialog";
  text: string;
  component: React.JSX.Element;
};

function TableActionButton({
  conponentInfo,
}: {
  conponentInfo: TableActionsCompType[];
}) {
  const [sheetOpen, setSheetOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [selectedComp, setSelectedComp] = useState<React.JSX.Element | null>(
    null
  );

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {conponentInfo.map((item) => (
            <DropdownMenuItem
              key={item.text}
              onClick={() => {
                setSelectedComp(item.component);
                if (item.type === "dialog") {
                  setDialogOpen(true);
                } else {
                  setSheetOpen(true);
                }
              }}
            >
              {item.text}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <SheetComp
        open={sheetOpen}
        setOpen={setSheetOpen}
        Component={selectedComp}
        cleanUpAdditionalComponent={() => setSelectedComp(null)}
      />
      <DialogComp
        open={dialogOpen}
        setOpen={setDialogOpen}
        Component={selectedComp}
        cleanUpAdditionalComponent={() => setSelectedComp(null)}
      />
    </div>
  );
}

export function DialogComp({
  Component,
  open,
  setOpen,
  cleanUpAdditionalComponent,
}: {
  open: boolean;
  setOpen: (e: boolean) => void;
  Component: React.JSX.Element | null;
  cleanUpAdditionalComponent?: () => void;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={(e) => {
        //@ts-ingore
        if (e === false && typeof cleanUpAdditionalComponent !== "undefined") {
          setTimeout(() => {
            cleanUpAdditionalComponent();
          }, 400);
        }
        setOpen(e);
      }}
    >
      <form>
        <DialogTrigger asChild>
          <Button className="hidden" variant="outline"></Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] px-5">
          <DialogHeader>
            <DialogTitle>Are you sure ?</DialogTitle>
          </DialogHeader>
          {Component}
        </DialogContent>
      </form>
    </Dialog>
  );
}

export function SheetComp({
  Component,
  open,
  setOpen,
  cleanUpAdditionalComponent,
}: {
  open: boolean;
  setOpen: (e: boolean) => void;
  Component: React.JSX.Element | null;
  cleanUpAdditionalComponent?: () => void;
}) {
  return (
    <Sheet
      open={open}
      onOpenChange={(e) => {
        if (e === false) {
          cleanUpAdditionalComponent &&
            setTimeout(() => {
              cleanUpAdditionalComponent();
            }, 400);
        }
        setOpen(e);
      }}
    >
      <SheetTrigger asChild>
        <Button className="hidden" variant="outline"></Button>
      </SheetTrigger>
      <SheetContent className="gap-0 px-5">
        <SheetHeader>
          <SheetTitle>Edit</SheetTitle>
        </SheetHeader>
        {Component}
      </SheetContent>
    </Sheet>
  );
}

export { selectColumn, SortableButton, TableActionButton };
