import { ExternalBlob } from "@/backend";
import type { CartItem, CartState, Product, ProductId } from "@/types";
import { type ReactNode, createContext, useContext } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

// Custom storage that handles BigInt + ExternalBlob serialization
const cartStorage = createJSONStorage<CartState>(() => localStorage, {
  reviver: (_key: string, value: unknown) => {
    // Revive BigInt values stored as strings with "n" suffix
    if (typeof value === "string" && /^\d+n$/.test(value)) {
      return BigInt(value.slice(0, -1));
    }
    return value;
  },
  replacer: (_key: string, value: unknown) => {
    if (typeof value === "bigint") return `${value}n`;
    return value;
  },
});

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product: Product, quantity = 1) => {
        const existing = get().items.find((i) => i.product.id === product.id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.product.id === product.id
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            ),
          });
        } else {
          set({ items: [...get().items, { product, quantity }] });
        }
      },

      removeItem: (productId: ProductId) => {
        set({ items: get().items.filter((i) => i.product.id !== productId) });
      },

      updateQuantity: (productId: ProductId, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set({
          items: get().items.map((i) =>
            i.product.id === productId ? { ...i, quantity } : i,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      get total() {
        return get().items.reduce(
          (sum, i) => sum + i.product.price * BigInt(i.quantity),
          0n,
        );
      },

      get itemCount() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },
    }),
    {
      name: "jumia-cart",
      storage: cartStorage,
      // Only persist items; computed properties are getters
      partialize: (state) => ({ items: state.items }) as CartState,
      // After rehydration, restore ExternalBlob methods on image field
      onRehydrateStorage: () => (state) => {
        if (!state?.items) return;
        state.items = state.items.map((item: CartItem) => ({
          ...item,
          product: {
            ...item.product,
            image: ExternalBlob.fromURL(
              item.product.image instanceof ExternalBlob
                ? item.product.image.getDirectURL()
                : ((item.product.image as unknown as { __url?: string })
                    ?.__url ?? ""),
            ),
          },
        }));
      },
    },
  ),
);

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const store = useCartStore();
  return <CartContext.Provider value={store}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
