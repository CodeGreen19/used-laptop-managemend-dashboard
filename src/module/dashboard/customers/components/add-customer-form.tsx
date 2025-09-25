"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CustomFormWrapper } from "@/components/shared/custom-form-wrapper";
import { CustomFormField } from "@/components/shared/custom-form-field";
import CustomFormActionButtons from "@/components/shared/custom-form-action-buttons";
import { customerMutation } from "../mutations";
import {
  customerSchema,
  CustomerSchemaShape,
  CustomerSchemaType,
} from "../schema";

export default function AddCustomerForm() {
  const { mutate, isPending } = customerMutation.useCreate();
  const form = useForm<CustomerSchemaType>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      phone: "",
      address: "",
    },
  });

  const onSubmit = (value: CustomerSchemaType) => {
    mutate(value, { onSuccess: () => form.reset() });
  };
  return (
    <CustomFormWrapper<CustomerSchemaShape> form={form} onSubmit={onSubmit}>
      <CustomFormField<CustomerSchemaShape>
        form={form}
        input="text"
        name="name"
        placeHolder="Customer's name"
        required
      />
      <CustomFormField<CustomerSchemaShape>
        form={form}
        input="text"
        name="phone"
        placeHolder="Phone number"
      />
      <CustomFormField<CustomerSchemaShape>
        form={form}
        input="text"
        name="address"
        placeHolder="Customer's address"
      />

      <CustomFormActionButtons<CustomerSchemaShape>
        isPending={isPending}
        form={form}
      />
    </CustomFormWrapper>
  );
}
