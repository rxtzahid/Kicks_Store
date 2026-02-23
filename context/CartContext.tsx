"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";
import { CartItem, Product } from "@/types";

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { productId: number; size: number } }
  | { type: "UPDATE_QUANTITY"; payload: { productId: number; size: number; quantity: number } }
  | { type: "LOAD_CART"; payload: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingIndex = state.items.findIndex(
        (item) => item.product.id === action.payload.product.id && item.size === action.payload.size
      );
      if (existingIndex >= 0) {
        const updated = [...state.items];
        updated[existingIndex].quantity += action.payload.quantity;
        return { items: updated };
      }
      return { items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return {
        items: state.items.filter(
          (item) => !(item.product.id === action.payload.productId && item.size === action.payload.size)
        ),
      };
    case "UPDATE_QUANTITY": {
      const updated = state.items.map((item) =>
        item.product.id === action.payload.productId && item.size === action.payload.size
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return { items: updated };
    }
    case "LOAD_CART":
      return { items: action.payload };
    default:
      return state;
  }
};

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: number, color: string, quantity?: number) => void;
  removeItem: (productId: number, size: number) => void;
  updateQuantity: (productId: number, size: number, quantity: number) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const saved = localStorage.getItem("kicks-cart");
      if (saved) dispatch({ type: "LOAD_CART", payload: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("kicks-cart", JSON.stringify(state.items));
  }, [state.items]);

  const addItem = (product: Product, size: number, color: string, quantity = 1) => {
    dispatch({ type: "ADD_ITEM", payload: { product, size, color, quantity } });
  };

  const removeItem = (productId: number, size: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: { productId, size } });
  };

  const updateQuantity = (productId: number, size: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { productId, size, quantity } });
  };

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = state.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items: state.items, addItem, removeItem, updateQuantity, totalItems, totalPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
