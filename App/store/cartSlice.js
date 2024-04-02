import { createSlice } from '@reduxjs/toolkit';

import { PRICE_PER_WEIGHT } from '../config';  

const initialState = {
  cartItems: [], //added cartItems array to store the items in the cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      // Find the index of the item in the cart, if it exists
      const found = state.cartItems.find(item => item.id === newItem.id)
      if(found){
        const totalCount = found.count + newItem.count
        const totalPrice = PRICE_PER_WEIGHT * found.weight * totalCount
        const newer = { ...found, count: totalCount, price: totalPrice }
        state.cartItems.forEach((item, index) => {
          if (item.id === newItem.id) {
            state.cartItems[index] = newer
          }
        })
      } 
      else {
        // Item doesn't exist, add it to cart with price calculation
        const itemWithPrice = {
          ...newItem,
          quantity: newItem.count, // Use 'count' as the initial quantity
          price: PRICE_PER_WEIGHT * newItem.weight * newItem.count, // Initial price calculation
        };
        state.cartItems.push(itemWithPrice);
      }
    },
    updateItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
        // Update price based on new quantity
        item.price = PRICE_PER_WEIGHT * item.weight * quantity;
      }
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== id);
    },
  },
});

export const { addItem, updateItemQuantity, deleteItem } = cartSlice.actions;

export default cartSlice.reducer;
