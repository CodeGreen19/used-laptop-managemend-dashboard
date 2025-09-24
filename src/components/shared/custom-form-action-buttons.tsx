"use client";

import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import z, { ZodObject, ZodRawShape } from "zod";

export default function CustomFormActionButtons<T extends ZodRawShape>({
  form,
  isPending,
}: {
  form: UseFormReturn<z.infer<ZodObject<T>>>;
  isPending?: boolean;
}) {
  return (
    <div className="flex justify-end w-full gap-1">
      <Button onClick={() => form.reset()} type="button" variant={"ghost"}>
        Reset
      </Button>
      <SheetClose asChild>
        <Button type="button" variant={"outline"}>
          Cancel
        </Button>
      </SheetClose>
      <Button disabled={isPending} type="submit">
        Submit
      </Button>
    </div>
  );
}
