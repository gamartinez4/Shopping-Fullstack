import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // array of {id, name, price, stock, quantity, ...}
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity } = action.payload;
      const existingIndex = state.items.findIndex((item) => item.id === product.id);
      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += quantity;
      } else {
        state.items.push({ ...product, quantity });
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 