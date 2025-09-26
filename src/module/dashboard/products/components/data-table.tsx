"use client";

import { CustomTable } from "@/components/shared/custom-table";
import {
  selectColumn,
  SortableButton,
  TableActionButton,
} from "@/components/shared/custom-table-column-element";
import { Badge } from "@/components/ui/badge";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { getProdutsInfo } from "../product.action";
import { useProductStore } from "../use-product-store";
import DeleteProductForm from "./delete-product-form";
import ProductDetailInfo from "./product-detail-info";
import SellProduct from "./sell-product";
import UpdateProductForm from "./update-product-form";
import VendorFilterInput from "./vendor-filter-input";

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
    cell: (props) => {
      const status = props.row.original.status;
      return <Badge variant={"outline"}>{status}</Badge>;
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
              text: "Detail info",
              heading: "Detail info",

              type: "sheet",
              component: <ProductDetailInfo info={props.row.original} />,
            },
            {
              text: "Sell",
              type: "sheet",
              heading: "Sell the product",
              component: (
                <SellProduct
                  productId={props.row.original.id}
                  soldStatus={props.row.original.soldPrice ? true : false}
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
