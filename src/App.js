import { useSelector } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

function App() {
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);
  return (
    <Layout>
      {isCartOpen === false ? "" : <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
