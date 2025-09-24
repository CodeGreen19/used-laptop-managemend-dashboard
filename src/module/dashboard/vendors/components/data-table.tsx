"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { CustomTable } from "@/components/shared/custom-table";
import {
  selectColumn,
  SortableButton,
  TableActionButton,
} from "@/components/shared/custom-table-column-element";
import { getVendorsInfo } from "../vendor.action";
import UpdateVendorForm from "./update-vendor-form";
import DeleteVendorForm from "./delete-vendor-form";

type DataType = Awaited<ReturnType<typeof getVendorsInfo>>;
type SingleDataType = DataType[number];

const columns: ColumnDef<SingleDataType>[] = [
  selectColumn(),
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <SortableButton column={column} title="Name" />;
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return <SortableButton column={column} title="Phone No." />;
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return <SortableButton column={column} title="Address" />;
    },
  },
  {
    accessorKey: "notes",
    header: ({ column }) => {
      return <SortableButton column={column} title="Notes" />;
    },
  },
  {
    accessorKey: "createdAt",
    cell(props) {
      return (
        <span className="font-sm font-light">
          {format(new Date(props.cell.getValue() as string), "PP")}
        </span>
      );
    },
    header: ({ column }) => {
      return <SortableButton column={column} title="Created At" />;
    },
  },
  {
    id: "Actions",
    cell(props) {
      return (
        <TableActionButton
          DeleteComponent={
            <DeleteVendorForm
              id={props.row.original.id}
              name={props.row.original.name}
            />
          }
          EditComponent={<UpdateVendorForm data={props.row.original} />}
        />
      );
    },
  },
];
export default function DataTable() {
  const { data } = useSuspenseQuery({
    queryKey: ["vendors"],
    queryFn: () => getVendorsInfo(),
  });

  return (
    <div className="mt-3">
      <CustomTable searchBy={"name"} columns={columns} data={data} />
    </div>
  );
}
