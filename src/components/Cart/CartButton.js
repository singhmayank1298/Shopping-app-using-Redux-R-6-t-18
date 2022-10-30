import { useDispatch, useSelector } from "react-redux";
import { cartAction } from "../../store/cart";
import classes from "./CartButton.module.css";

const CartButton = (props) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  let totalItems = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalItems += cartItems[i].quantity;
  }

  const dispatch = useDispatch();

  const cartVisibleHandler = () => {
    dispatch(cartAction.isCartOpenHandler());
  };
  return (
    <button onClick={cartVisibleHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default CartButton;
