import { useSelector } from "react-redux";
import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((x) => {
          return (
            <CartItem
              title={x.title}
              quantity={x.quantity}
              total={x.total}
              price={x.price}
              key={Math.random()}
              id={x.id}
              totalPrice={x.totalPrice}
              initialPrice={x.initialPrice}

              // item={{ title: "Test Item", quantity: 3, total: 18, price: 6 }}
            />
          );
        })}
      </ul>
    </Card>
  );
};

export default Cart;
