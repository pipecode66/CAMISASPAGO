"use client"

import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

type WishlistStore = {
  productIds: string[]
  toggle: (productId: string) => void
  has: (productId: string) => boolean
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      productIds: [],
      toggle: (productId) =>
        set((state) => ({
          productIds: state.productIds.includes(productId)
            ? state.productIds.filter((id) => id !== productId)
            : [...state.productIds, productId],
        })),
      has: (productId) => get().productIds.includes(productId),
    }),
    {
      name: "sable-wishlist",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ productIds: state.productIds }),
    }
  )
)
