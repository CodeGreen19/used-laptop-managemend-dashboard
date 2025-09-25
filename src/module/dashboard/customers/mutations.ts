import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { CustomerSchemaType } from "./schema";
import {
  createCustomer,
  deleteCustomer,
  updateCustomer,
} from "./customer.action";

export const customerMutation = {
  useCreate: () => {
    return useMutation({
      mutationFn: async (input: CustomerSchemaType) => {
        return await createCustomer(input);
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
      mutationFn: async (info: { input: CustomerSchemaType; id: string }) => {
        return await updateCustomer(info);
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
        return await deleteCustomer(info);
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
