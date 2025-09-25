"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { customerMutation } from "../mutations";
import {
  customerSchema,
  CustomerSchemaShape,
  CustomerSchemaType,
} from "../schema";
import { CustomFormWrapper } from "@/components/shared/custom-form-wrapper";
import { CustomFormField } from "@/components/shared/custom-form-field";
import CustomFormActionButtons from "@/components/shared/custom-form-action-buttons";
import { getCustomersInfo } from "../customer.action";

export default function UpdateCustomerForm({
  data,
}: {
  data: Awaited<ReturnType<typeof getCustomersInfo>>[number];
}) {
  const { mutate, isPending } = customerMutation.useUpdate();
  const form = useForm<CustomerSchemaType>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: data.name,
      phone: data.phone ?? "",
      address: data.address ?? "",
    },
  });

  const onSubmit = (value: CustomerSchemaType) => {
    mutate({ id: data.id, input: value });
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
