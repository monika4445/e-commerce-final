import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import {
  decrementQuantity,
  getCartItems,
  incrementQuantity,
} from "../features/cart-slice";

function Counter({cart}:any) {
  const dispatch: AppDispatch = useDispatch();
  function increment(id: number) {
    dispatch(incrementQuantity(id));
  }

  function decrement(id: number, quantity: number) {
    if (quantity > 0) {
      dispatch(decrementQuantity(id));
    }
  }
  return (
    <div>
          <button
            className="btn"
            onClick={() => decrement(cart.productId, cart.quantity)}
          >
            -
          </button>
          <span>{cart.quantity}</span>
          <button className="btn" onClick={() => increment(cart.productId)}>
            +
          </button>
    </div>
  );
}

export default Counter;
