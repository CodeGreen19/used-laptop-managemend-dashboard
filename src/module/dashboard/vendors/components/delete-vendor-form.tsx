"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import React, { useRef } from "react";
import { vendorMutation } from "../mutations";

export default function DeleteVendorForm({
  id,
  name,
}: {
  id: string;
  name: string;
}) {
  const { mutate, isPending } = vendorMutation.useDelete();
  const closeRef = useRef<HTMLButtonElement>(null);
  return (
    <div>
      <h1 className="my-1 text-xl font-semibold">Vendor : {name}</h1>
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
