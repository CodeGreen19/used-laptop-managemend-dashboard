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
    <Button
      variant={"ghost"}
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title} <ArrowUpDown />
    </Button>
  );
}

type TableActionsButton = {
  EditComponent: React.JSX.Element;
  DeleteComponent: React.JSX.Element;
};
function TableActionButton({
  DeleteComponent,
  EditComponent,
}: TableActionsButton) {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);
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
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <SheetComp
        open={editOpen}
        setOpen={setEditOpen}
        Component={EditComponent}
      />
      <DialogComp
        open={deleteOpen}
        setOpen={setDeleteOpen}
        Component={DeleteComponent}
      />
    </div>
  );
}

export function DialogComp({
  Component,
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (e: boolean) => void;
  Component: React.JSX.Element;
}) {
  return (
    <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
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
}: {
  open: boolean;
  setOpen: (e: boolean) => void;
  Component: React.JSX.Element;
}) {
  return (
    <Sheet open={open} onOpenChange={(e) => setOpen(e)}>
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
