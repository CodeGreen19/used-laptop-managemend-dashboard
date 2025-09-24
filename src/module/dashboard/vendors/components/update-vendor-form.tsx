"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { vendorMutation } from "../mutations";
import { vendorSchema, VendorSchemaShape, VendorSchemaType } from "../schema";
import { getVendorsInfo } from "../vendor.action";
import { CustomFormWrapper } from "@/components/shared/custom-form-wrapper";
import { CustomFormField } from "@/components/shared/custom-form-field";
import CustomFormActionButtons from "@/components/shared/custom-form-action-buttons";

export default function UpdateVendorForm({
  data,
}: {
  data: Awaited<ReturnType<typeof getVendorsInfo>>[number];
}) {
  const { mutate, isPending } = vendorMutation.useUpdate();
  const form = useForm<VendorSchemaType>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      name: data.name,
      phone: data.phone ?? "",
      address: data.address ?? "",
      notes: data.notes ?? "",
    },
  });

  const onSubmit = (value: VendorSchemaType) => {
    mutate({ id: data.id, input: value });
  };
  return (
    <CustomFormWrapper<VendorSchemaShape> form={form} onSubmit={onSubmit}>
      <CustomFormField<VendorSchemaShape>
        form={form}
        input="text"
        name="name"
        placeHolder="Vendor's name"
        required
      />
      <CustomFormField<VendorSchemaShape>
        form={form}
        input="text"
        name="phone"
        placeHolder="Phone number"
      />
      <CustomFormField<VendorSchemaShape>
        form={form}
        input="text"
        name="address"
        placeHolder="Vendor's address"
      />
      <CustomFormField<VendorSchemaShape>
        form={form}
        input="textarea"
        name="notes"
        placeHolder="Keep a note"
      />
      <CustomFormActionButtons<VendorSchemaShape>
        isPending={isPending}
        form={form}
      />
    </CustomFormWrapper>
  );
}
