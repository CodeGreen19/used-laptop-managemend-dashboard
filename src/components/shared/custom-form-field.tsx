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

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormFieldType<T extends ZodRawShape> = {
  form: UseFormReturn<z.infer<ZodObject<T>>>;
  name: FieldPath<z.infer<ZodObject<T>>>;
  input: "text" | "email" | "textarea" | "select" | "number" | "date";
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
                    <SelectGroup>
                      {selectData &&
                        selectData.map((item) => (
                          <SelectItem key={item} value={item}>
                            {item}
                          </SelectItem>
                        ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              ) : input === "date" ? (
                <div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !safeField.value && "text-muted-foreground"
                          )}
                        >
                          {safeField.value ? (
                            format(safeField.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={new Date()}
                        onSelect={safeField.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              ) : null}
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
