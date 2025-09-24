"use client";

import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import React, { useRef } from "react";
import { productMutation } from "../mutations";

export default function DeleteProductForm({
  id,
  brandName,
}: {
  id: string;
  brandName: string;
}) {
  const { mutate, isPending } = productMutation.useDelete();
  const closeRef = useRef<HTMLButtonElement>(null);
  return (
    <div>
      <h1 className="my-1 text-xl font-semibold">Brand : {brandName}</h1>
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
