"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import React, { useRef } from "react";
import { customerMutation } from "../mutations";

export default function DeleteCustomerForm({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const { mutate, isPending } = customerMutation.useDelete();
  const closeRef = useRef<HTMLButtonElement>(null);
  return (
    <div>
      <h1 className="my-1 text-xl font-semibold">Customer : {name}</h1>
      <div className="flex items-center justify-start gap-1 py-6">
        <Button
          type="button"
          disabled={isPending}
          onClick={() =>
            mutate({ id }, { onSuccess: () => closeRef.current?.click() })
          }
          variant={"destructive"}
        >
          Delete
        </Button>
        <DialogClose asChild>
          <Button ref={closeRef} type="button" variant={"outline"}>
            Cancel
          </Button>
        </DialogClose>
      </div>
    </div>
  );
}
