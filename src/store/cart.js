import { createSlice } from "@reduxjs/toolkit";

const initialState = { isCartOpen: false, cartItems: [], changed: false }; // 3 things
const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    isCartOpenHandler(state) {
      state.isCartOpen = !state.isCartOpen;
    },
    addCartItemsHandler(state, action) {
      const array = state.cartItems;
      const newObj = action.payload;
      for (let i = 0; i < array.length; i++) {
        console.log(state.cartItems);
        if (array[i].id === newObj.id) {
          state.cartItems[i].quantity++;
          state.cartItems[i].totalPrice += newObj.initialPrice;
          state.changed = true; // extra logic for extra api call fix automatic put request happning
          return;
        }
      }

      state.cartItems = [...state.cartItems, action.payload];
    },
    removeCartItemsHandler(state, action) {
      const array = state.cartItems;
      const newObj = action.payload;
      for (let i = 0; i < array.length; i++) {
        console.log(state.cartItems);
        if (array[i].id === newObj.id) {
          if (array[i].quantity === 0) {
            state.cartItems.splice(i, 1);
            return;
          }
          state.cartItems[i].quantity--;
          state.cartItems[i].totalPrice -= newObj.initialPrice;
          state.changed = true; // extra logic for extra api call fix automatic put request happning
          return;
        }
      }
    },
    initialItem(state, action) {
      state.cartItems = action.payload;
    },
  },
});

export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
