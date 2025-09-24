import { create } from "zustand";
import { getProdutsInfo } from "./product.action";

type VendorInfoType = Awaited<
  ReturnType<typeof getProdutsInfo>
>["allVendors"][number];

type Store = {
  selectedVendor: VendorInfoType | null;
  setSelectedVendor: (vendor: VendorInfoType | null) => void;
};

export const useProductStore = create<Store>((set) => ({
  selectedVendor: null,
  setSelectedVendor: (vendor) => set({ selectedVendor: vendor }),
}));
