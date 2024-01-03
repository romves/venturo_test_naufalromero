import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartState, TAddCatatan, TCartItem } from "../../types";

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<TCartItem>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    incrementItem: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decrementItem: (state, action: PayloadAction<number>) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload
      );

      if (existingItem) {
        existingItem.quantity -= 1;
      }

      if (existingItem?.quantity === 0) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity = action.payload.quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    addCatatan: (state, action: PayloadAction<TAddCatatan>) => {
      const item = state.items.find((item) => item.id === action.payload.id);
      if (item) {
        item.catatan = action.payload.catatan;
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  incrementItem,
  decrementItem,
  addCatatan,
} = cartSlice.actions;
export default cartSlice.reducer;
