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
import { getCustomersInfo } from "../customer.action";
import UpdateCustomerForm from "./update-customer-form";
import DeleteCustomerForm from "./delete-customer-form";
import CustomerBoughtProductInfo from "./customer-bought-product-info";

type DataType = Awaited<ReturnType<typeof getCustomersInfo>>;
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
    accessorKey: "products",
    header: ({ column }) => {
      return <SortableButton column={column} title="Own" />;
    },
    cell: (props) => {
      return props.row.original.products.length;
    },
  },
  {
    accessorKey: "address",
    header: ({ column }) => {
      return <SortableButton column={column} title="Address" />;
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
          conponentInfo={[
            {
              text: "Edit",
              type: "sheet",
              component: <UpdateCustomerForm data={props.row.original} />,
            },
            {
              text: "Products",
              type: "sheet",
              heading: "Product Info",
              component: (
                <CustomerBoughtProductInfo info={props.row.original.products} />
              ),
            },

            {
              text: "Delete",
              type: "dialog",
              component: (
                <DeleteCustomerForm
                  id={props.row.original.id}
                  name={props.row.original.name}
                />
              ),
            },
          ]}
        />
      );
    },
  },
];
export default function DataTable() {
  const { data } = useSuspenseQuery({
    queryKey: ["customers"],
    queryFn: () => getCustomersInfo(),
  });

  return (
    <div className="mt-3">
      <CustomTable searchBy={"name"} columns={columns} data={data} />
    </div>
  );
}
