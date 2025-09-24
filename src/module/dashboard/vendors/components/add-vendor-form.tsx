"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CustomFormWrapper } from "@/components/shared/custom-form-wrapper";
import { CustomFormField } from "@/components/shared/custom-form-field";
import CustomFormActionButtons from "@/components/shared/custom-form-action-buttons";
import { vendorMutation } from "../mutations";
import { vendorSchema, VendorSchemaShape, VendorSchemaType } from "../schema";

export default function AddVendorForm() {
  const { mutate, isPending } = vendorMutation.useCreate();
  const form = useForm<VendorSchemaType>({
    resolver: zodResolver(vendorSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      note: "",
    },
  });

  const onSubmit = (value: VendorSchemaType) => {
    mutate(value, { onSuccess: () => form.reset() });
  };
  return (
    <CustomFormWrapper<VendorSchemaShape> form={form} onSubmit={onSubmit}>
      <CustomFormField<VendorSchemaShape>
        form={form}
        input="text"
        name="name"
        placeHolder="Vendor's name *"
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
        input="text"
        name="note"
        placeHolder="Keep a note"
      />
      <CustomFormActionButtons<VendorSchemaShape>
        isPending={isPending}
        form={form}
      />
    </CustomFormWrapper>
  );
}
