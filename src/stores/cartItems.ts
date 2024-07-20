import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export type CartItem = {
  id: string;
  quantity: number;
  variant: number;
};

interface CartItemsStore {
  cartItems: CartItem[];
  setCartItemQuantity: (
    product: {
      id: string;
      variant: number;
    },
    quantity: number,
  ) => void;
}

export const useCartItemsStore = create<
  CartItemsStore,
  ["zustand/immer", unknown][]
>(
  immer((set) => ({
    cartItems: [],
    setCartItemQuantity: (
      product: {
        id: string;
        variant: number;
      },
      quantity: number,
    ) =>
      set((state: CartItemsStore) => {
        if (quantity === 0) {
          state.cartItems = state.cartItems.filter(
            (item) =>
              !(item.id === product.id && item.variant === product.variant),
          );
          return;
        }

        const index = state.cartItems.findIndex(
          (item) => item.id === product.id && item.variant === product.variant,
        );

        if (index === -1) {
          state.cartItems.push({
            ...product,
            quantity,
          });
          return;
        }

        state.cartItems[index]!.quantity = quantity;
      }),
  })),
);
