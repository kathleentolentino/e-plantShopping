import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {

    // ✅ ADD ITEM
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;

      const existingItem = state.items.find(
        (item) => item.name === name
      );

      if (existingItem) {
        // kung existing na → dagdag quantity
        existingItem.quantity += 1;
      } else {
        // kung bago → add sa cart
        state.items.push({
          name,
          image,
          cost,
          quantity: 1,
        });
      }
    },

    // ✅ REMOVE ITEM
    removeItem: (state, action) => {
      const name = action.payload;

      state.items = state.items.filter(
        (item) => item.name !== name
      );
    },

    // ✅ UPDATE QUANTITY
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;

      const item = state.items.find(
        (item) => item.name === name
      );

      if (item) {
        if (quantity <= 0) {
          // auto remove pag zero
          state.items = state.items.filter(
            (i) => i.name !== name
          );
        } else {
          item.quantity = quantity;
        }
      }
    },

  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;