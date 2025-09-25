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
import { getProdutsInfo } from "../product.action";
import VendorFilterInput from "./vendor-filter-input";
import UpdateProductForm from "./update-product-form";
import DeleteProductForm from "./delete-product-form";
import { useProductStore } from "../use-product-store";

type DataType = Awaited<ReturnType<typeof getProdutsInfo>>;
type SingleDataType = DataType["allProducts"][number];

const columns: ColumnDef<SingleDataType>[] = [
  selectColumn(),
  {
    accessorKey: "brand",
    header: ({ column }) => {
      return <SortableButton column={column} title="Brand" />;
    },
  },
  {
    accessorKey: "model",
    header: ({ column }) => {
      return <SortableButton column={column} title="Model" />;
    },
  },
  {
    accessorKey: "condition",
    header: ({ column }) => {
      return <SortableButton column={column} title="Condition" />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <SortableButton column={column} title="Status" />;
    },
  },
  {
    accessorKey: "sellingPrice",
    header: ({ column }) => {
      return <SortableButton column={column} title="Selling Price" />;
    },
    cell: (props) => {
      return `${props.row.original.sellingPrice} ৳`;
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
              component: (
                <UpdateProductForm
                  id={props.row.original.id}
                  info={props.row.original}
                />
              ),
            },

            {
              text: "Delete",
              type: "dialog",
              component: (
                <DeleteProductForm
                  id={props.row.original.id}
                  brandName={props.row.original.brand}
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
  const { selectedVendor } = useProductStore();
  const { data } = useSuspenseQuery({
    queryKey: ["products"],
    queryFn: () => getProdutsInfo(),
  });

  const filteredProducts = selectedVendor
    ? data.allProducts.filter((item) => item.vendorId === selectedVendor.id)
    : null;
  return (
    <div className="mt-3">
      <CustomTable
        searchBy={"model"}
        columns={columns}
        data={filteredProducts ?? data.allProducts}
        headerFilterComponent={<VendorFilterInput info={data.allVendors} />}
      />
    </div>
  );
}
