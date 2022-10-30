import { useDispatch } from "react-redux";
import { cartAction } from "../../store/cart";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const dispatch = useDispatch();
  // const { title, quantity, total, price } = props.item;

  const removeHandler = () => {
    const obj = {
      id: props.id,
      initialPrice: props.initialPrice,
    };
    dispatch(cartAction.removeCartItemsHandler(obj));
  };

  const addHandler = () => {
    const obj = {
      id: props.id,
      initialPrice: props.initialPrice,
    };
    dispatch(cartAction.addCartItemsHandler(obj));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{props.title}</h3>
        <div className={classes.price}>
          {props.total}
          <span className={classes.itemprice}>
            $ {props.totalPrice} ({props.initialPrice})
          </span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{props.quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeHandler}>-</button>
          <button onClick={addHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
