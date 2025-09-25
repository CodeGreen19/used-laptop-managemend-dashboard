"use client";

import CustomFormActionButtons from "@/components/shared/custom-form-action-buttons";
import { CustomFormField } from "@/components/shared/custom-form-field";
import { CustomFormWrapper } from "@/components/shared/custom-form-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { conditions, productStatuses } from "../../constants";
import { productMutation } from "../mutations";
import { getProdutsInfo } from "../product.action";
import {
  productSchema,
  ProductSchemaShape,
  ProductSchemaType,
} from "../schema";

export default function UpdateProductForm({
  info,
  id,
}: {
  info: Awaited<ReturnType<typeof getProdutsInfo>>["allProducts"][number];
  id: string;
}) {
  const { mutate, isPending } = productMutation.useUpdate();

  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      vendorId: info.vendorId,
      brand: info.brand,
      condition: info.condition,
      model: info.model,
      specs: info.specs ?? "",
      status: info.status,
      purchasePrice: info.purchasePrice,
      importingExpenses: info.importingExpenses ?? "",
      purchaseDate: info.purchaseDate ?? null,
      sellingPrice: info.sellingPrice ?? "",
    },
  });

  const onSubmit = (value: ProductSchemaType) => {
    mutate({ id: id, input: value });
  };

  return (
    <CustomFormWrapper<ProductSchemaShape> form={form} onSubmit={onSubmit}>
      <CustomFormField<ProductSchemaShape>
        form={form}
        input="text"
        name="brand"
        placeHolder="Product brand name"
        required
      />
      <CustomFormField<ProductSchemaShape>
        form={form}
        input="text"
        name="model"
        placeHolder="Product model name"
        required
      />
      <CustomFormField<ProductSchemaShape>
        form={form}
        input="date"
        name="purchaseDate"
        placeHolder="Purchase date"
        required
      />
      <CustomFormField<ProductSchemaShape>
        form={form}
        input="select"
        name="condition"
        placeHolder="Product condition"
        selectData={[...conditions]}
        required
      />
      <CustomFormField<ProductSchemaShape>
        form={form}
        input="select"
        name="status"
        selectData={[...productStatuses]}
        placeHolder="Product Status"
        required
      />
      <CustomFormField<ProductSchemaShape>
        form={form}
        input="number"
        name="purchasePrice"
        placeHolder="Purchase amount"
        required
      />
      <CustomFormField<ProductSchemaShape>
        form={form}
        input="number"
        name="importingExpenses"
        placeHolder="Importing consts"
      />
      <CustomFormField<ProductSchemaShape>
        form={form}
        input="number"
        name="sellingPrice"
        placeHolder="Expected selling amount"
        required
      />
      <CustomFormField<ProductSchemaShape>
        form={form}
        input="textarea"
        name="specs"
        placeHolder="addition info such as : RAM , CPU, Battery ect."
      />

      <CustomFormActionButtons<ProductSchemaShape>
        isPending={isPending}
        form={form}
      />
    </CustomFormWrapper>
  );
}
