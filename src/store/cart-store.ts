"use client"

import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

import type { CartItem } from "@/types/product"

type AddCartItemInput = Omit<CartItem, "id">

type CartStore = {
  items: CartItem[]
  isOpen: boolean
  hasHydrated: boolean
  addItem: (item: AddCartItemInput) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  setHasHydrated: (value: boolean) => void
}

function createCartItemId(item: AddCartItemInput) {
  return `${item.productId}:${item.size}:${item.colorName}`
}

export const useCartStore = create<CartStore>()(
  persist(
    (set) => ({
      items: [],
      isOpen: false,
      hasHydrated: false,
      addItem: (item) =>
        set((state) => {
          const id = createCartItemId(item)
          const existing = state.items.find((entry) => entry.id === id)

          if (existing) {
            return {
              items: state.items.map((entry) =>
                entry.id === id
                  ? {
                      ...entry,
                      quantity: Math.min(
                        entry.quantity + item.quantity,
                        entry.stock
                      ),
                    }
                  : entry
              ),
              isOpen: true,
            }
          }

          return {
            items: [...state.items, { ...item, id }],
            isOpen: true,
          }
        }),
      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),
      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id
              ? {
                  ...item,
                  quantity: Math.min(Math.max(quantity, 1), item.stock),
                }
              : item
          ),
        })),
      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      setHasHydrated: (value) => set({ hasHydrated: value }),
    }),
    {
      name: "sable-cart",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true)
      },
    }
  )
)
