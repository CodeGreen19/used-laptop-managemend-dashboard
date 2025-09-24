"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldPath, UseFormReturn } from "react-hook-form";
import z, { ZodObject, ZodRawShape } from "zod";

type FormFieldType<T extends ZodRawShape> = {
  form: UseFormReturn<z.infer<ZodObject<T>>>;
  name: FieldPath<z.infer<ZodObject<T>>>;
  input: "text" | "email" | "textarea";
  placeHolder?: string;
};

export function CustomFormField<T extends ZodRawShape>({
  form,
  name,
  placeHolder,
  input,
}: FormFieldType<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const safeField = {
          ...field,

          value: field.value as string | undefined,
        };
        return (
          <FormItem>
            <FormControl>
              {input === "text" ? (
                <Input placeholder={placeHolder} type="text" {...safeField} />
              ) : input === "email" ? (
                <Input placeholder={placeHolder} type="email" {...safeField} />
              ) : input === "textarea" ? (
                <Textarea placeholder={placeHolder} {...safeField} />
              ) : null}
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
