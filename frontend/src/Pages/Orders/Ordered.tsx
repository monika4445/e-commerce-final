import { useDispatch, useSelector } from "react-redux";
import { getOrder, orderById } from "../../features/order-slice";
import { AppDispatch } from "../../app/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Ordered.scss";

function Ordered() {
  const order = useSelector(getOrder);
  const dispatch: AppDispatch = useDispatch();
  const { cartId } = useParams<{ cartId?: string }>();
  useEffect(() => {
    if (cartId && order?.products?.length) {
      dispatch(orderById(cartId));
    }
  }, [dispatch, cartId]);
  console.log(order, "o");
  return (
    <div className="container">
      <h2>Your Orders</h2>
      {!order?.products?.length ? (
        <p className="no-orders">You don't have ordered products</p>
      ) : (
        order?.products?.map((product) => (
          <div className="product-item" key={product.productId}>
            <img
              src={`http://localhost:5000/images/${product?.Image?.fileName}`}
              alt=""
            />
            <div className="desc">
              <p className="name">{product.name}</p>
              <p className="price">Price {product.price}</p>
              <p className="quantity">Quantity {product.quantity}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Ordered;
