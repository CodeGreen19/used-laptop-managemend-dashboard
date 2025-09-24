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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormFieldType<T extends ZodRawShape> = {
  form: UseFormReturn<z.infer<ZodObject<T>>>;
  name: FieldPath<z.infer<ZodObject<T>>>;
  input: "text" | "email" | "textarea" | "select" | "number";
  placeHolder: string;
  selectData?: string[];
  required?: boolean;
};

export function CustomFormField<T extends ZodRawShape>({
  form,
  name,
  placeHolder: unsetteledPlaceholder,
  input,
  required,
  selectData,
}: FormFieldType<T>) {
  const placeHolder = `${unsetteledPlaceholder} ${required ? "*" : ""}`;
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
              ) : input === "number" ? (
                <Input placeholder={placeHolder} type="number" {...safeField} />
              ) : input === "email" ? (
                <Input placeholder={placeHolder} type="email" {...safeField} />
              ) : input === "textarea" ? (
                <Textarea placeholder={placeHolder} {...safeField} />
              ) : input === "select" ? (
                <Select
                  onValueChange={safeField.onChange}
                  value={safeField.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeHolder} />
                  </SelectTrigger>
                  <SelectContent>
                    {selectData &&
                      selectData.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              ) : null}
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
