"use client";

import CustomFormActionButtons from "@/components/shared/custom-form-action-buttons";
import { CustomFormField } from "@/components/shared/custom-form-field";
import { CustomFormWrapper } from "@/components/shared/custom-form-wrapper";
import { getQueryClient } from "@/lib/tanstack-query-setup/get-query-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { conditions, productStatuses } from "../../constants";
import { getProdutsInfo } from "../product.action";
import {
  productSchema,
  ProductSchemaShape,
  ProductSchemaType,
} from "../schema";
import { useProductStore } from "../use-product-store";
import VendorFilterInput from "./vendor-filter-input";
import { productMutation } from "../mutations";

export default function AddProductForm() {
  const { mutate, isPending } = productMutation.useCreate();

  const { selectedVendor } = useProductStore();
  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      vendorId: "",
      brand: "",
      condition: "",
      model: "",
      specs: "",
      status: "",
      purchasePrice: "",
    },
  });

  console.log(form.formState.errors);

  const onSubmit = (value: ProductSchemaType) => {
    mutate(value, { onSuccess: () => form.reset() });
  };

  const verdorId = form.watch("vendorId");
  useEffect(() => {
    if (selectedVendor) {
      form.setValue("vendorId", selectedVendor.id);
    } else {
      form.setValue("vendorId", "");
    }
  }, [selectedVendor, form]);
  return (
    <CustomFormWrapper<ProductSchemaShape> form={form} onSubmit={onSubmit}>
      <SelectedVendorSelect />
      <p className="text-red-500 text-sm">
        {!verdorId && form.formState.errors.vendorId?.message}
      </p>
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

function SelectedVendorSelect() {
  const queryClient = getQueryClient();
  const data = queryClient.getQueryData(["products"]) as unknown as Awaited<
    ReturnType<typeof getProdutsInfo>
  >;

  return <VendorFilterInput info={data ? data.allVendors : []} />;
}
