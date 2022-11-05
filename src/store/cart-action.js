import { uiAction } from "./ui";
import { cartAction } from "./cart";

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

export const fetchCartData = () => {
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
          method: "GET",
          // body: JSON.stringify(cart),
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (response.ok === false) {
        throw new Error("error");
      }
      const data = await response.json();
      console.log(data);
      return data;
    };
    try {
      const data = await sendRequest();
      const cart = data.cartItems || [];
      console.log(data.cartItems);
      dispatch(cartAction.initialItem(cart));
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
