import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // 1. addItem logic from your instruction
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; 
      const existingItem = state.items.find(item => item.name === name);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // 2. removeItem logic from your instruction
    removeItem: (state, action) => {
      // action.payload should be the name of the item to remove
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    // 3. updateQuantity logic from your instruction
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity; 
      }
    },
  },
});

// Handle Actions: Export the action creators
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export the reducer as the default to use in store.js
export default CartSlice.reducer;