import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { VendorSchemaType } from "./schema";
import { createVendor, deleteVendor, updateVendor } from "./vendor.action";

export const vendorMutation = {
  useCreate: () => {
    return useMutation({
      mutationFn: async (input: VendorSchemaType) => {
        return await createVendor(input);
      },

      onSuccess: ({ message }) => {
        toast.success(message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  },
  useUpdate: () => {
    return useMutation({
      mutationFn: async (info: { input: VendorSchemaType; id: string }) => {
        return await updateVendor(info);
      },

      onSuccess: ({ message }) => {
        toast.success(message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  },
  useDelete: () => {
    return useMutation({
      mutationFn: async (info: { id: string }) => {
        return await deleteVendor(info);
      },

      onSuccess: ({ message }) => {
        toast.success(message);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  },
};
