"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type CustomTableFilterBoxType<TData> = {
  table: Table<TData>;
  searchBy: string;
};

export function CustomTableHeader<TData>({
  table,
  searchBy,
}: CustomTableFilterBoxType<TData>) {
  return (
    <div className="flex items-center justify-between mb-2">
      <section className="flex flex-col md:flex-row items-start justify-start gap-1">
        <Input
          value={(table.getColumn(searchBy)?.getFilterValue() as string) ?? ""}
          onChange={(e) =>
            table.getColumn(searchBy)?.setFilterValue(e.target.value)
          }
          placeholder="Search by name..."
          className="w-[230px] md:max-w-[250]"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Views <Camera />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
      <div className="flex gap-1 self-end">
        <Button variant={"ghost"}>
          page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </Button>
        <div className="flex gap-1">
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
            className="hidden md:inline-flex"
            variant={"outline"}
          >
            <ChevronsLeft />
          </Button>
          <Button
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
            variant={"outline"}
          >
            <ChevronLeft />
          </Button>

          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
            variant={"outline"}
          >
            <ChevronRight />
          </Button>
          <Button
            disabled={!table.getCanNextPage()}
            onClick={() => table.lastPage()}
            className="hidden md:inline-flex"
            variant={"outline"}
          >
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
