"use client";

import { Form } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import z, { ZodObject, ZodRawShape } from "zod";

type FormWrapperType<T extends ZodRawShape> = {
  children: ReactNode;
  form: UseFormReturn<z.infer<ZodObject<T>>>;
  onSubmit: (values: z.infer<ZodObject<T>>) => void;
  className?: string;
};
export function CustomFormWrapper<T extends ZodRawShape>({
  children,
  form,
  onSubmit,
  className,
}: FormWrapperType<T>) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-6", className)}
      >
        {children}
      </form>
    </Form>
  );
}
