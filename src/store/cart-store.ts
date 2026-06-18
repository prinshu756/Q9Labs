import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, CartState } from "@/types";

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) =>
        set((state) => {
          const existingItem = state.items.find(
            (i) => i.productId === item.productId && i.variant === item.variant
          );

          if (existingItem) {
            return {
              items: state.items.map((i) =>
                i.id === existingItem.id
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }

          return {
            items: [...state.items, { ...item, id: crypto.randomUUID() }],
            isOpen: true,
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
          ),
        })),

      clearCart: () => set({ items: [] }),

      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getSubtotal: () => {
        const { items } = get();
        return items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const shipping = subtotal > 100 ? 0 : 9.99;
        const tax = subtotal * 0.08;
        return subtotal + shipping + tax;
      },
    }),
    {
      name: "q9-labs-cart",
      partialize: (state) => ({ items: state.items }),
    }
  )
);