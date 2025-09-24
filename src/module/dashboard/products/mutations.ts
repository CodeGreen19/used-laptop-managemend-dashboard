import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { createProduct, deleteProduct, updateProduct } from "./product.action";
import { ProductSchemaType } from "./schema";

export const productMutation = {
  useCreate: () => {
    return useMutation({
      mutationFn: async (input: ProductSchemaType) => {
        return await createProduct(input);
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
      mutationFn: async (info: { input: ProductSchemaType; id: string }) => {
        return await updateProduct(info);
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
        return await deleteProduct(info);
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
