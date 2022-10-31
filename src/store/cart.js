import { createSlice } from "@reduxjs/toolkit";
import { uiAction } from "./ui";
const initialState = { isCartOpen: false, cartItems: [] }; // 3 things
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
          return;
        }
      }
    },
  },
});

export const sendCartData = (cart) => {
  return async (dispatch) => {
    // this dispatch will automatic given by redux toolkit so we can use dispatch hook in this finction
    dispatch(
      uiAction.notificationContent({
        title: "Sending...",
        message: "Sending cart data",
        status: "pending",
      })
    );
    const sendRequest = async () => {
      const response = await fetch(
        "https://shoping-app-using-redux-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify(cart),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (response.ok === false) {
        throw new Error("error");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiAction.notificationContent({
          title: "Success",
          message: "sent cart data successfully",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        uiAction.notificationContent({
          title: "Error",
          message: "Sending cart data fails !!",
          status: "error",
        })
      );
    }
  };
};

export const cartAction = cartSlice.actions;
export default cartSlice.reducer;
