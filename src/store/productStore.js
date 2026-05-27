import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useProductStore = create(
  persist(
    (set, get) => ({
      hiddenProducts: [], 

      toggleProductVisibility: (productId) => {
        const { hiddenProducts } = get();
        if (hiddenProducts.includes(productId)) {
          set({ hiddenProducts: hiddenProducts.filter((id) => id !== productId) });
        } else {
          set({ hiddenProducts: [...hiddenProducts, productId] });
        }
      },

      isPublished: (productId) => {
        return !get().hiddenProducts.includes(productId);
      },
    }),
    { name: "alpha-products" }
  )
);
