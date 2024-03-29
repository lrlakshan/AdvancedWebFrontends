import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { increaseQuantity, decreaseQuantity, clearCart } from "../redux/actionCreators/cartActions";
import { setNotifications } from "../redux/actionCreators/notificationActions";
import { dataTestIds, stateTypes } from "../tests/constants/components";
import { USERS } from "../constants/constants";
import { placeOrder } from "../redux/actionCreators/thunks/orders";

const Cart = () => {
  const { containerId, textId, clickId, notificationId } = dataTestIds;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { role } = useSelector(state => state.role);

  const handleIncreaseCart = (product) => {
    dispatch(increaseQuantity(product));
  };

  const handleDecreaseCart = (product) => {
    dispatch(decreaseQuantity(product));
  };

  const handlePlaceOrder = () => {
    if (role === USERS.guest) {
      dispatch(
        setNotifications(
          stateTypes.auth,
          notificationId.error(stateTypes.auth),
          "Yu have to login first",
          Date.now()
        )
      );
      navigate("/login");
    } else if (role === USERS.customer) {
      const updatedItems = cart.items.map((item) => {
        const { image, ...productWithoutImage } = item.product;
        return {
          ...item,
          product: productWithoutImage,
        };
      });

      // Removed image field from the cart data
      // Create a new object with the updated items array
      const updatedData = { items: updatedItems };

      dispatch(placeOrder(updatedData));
      dispatch(clearCart());
    }
  };

  return (
    <div data-testid={containerId.main}>
      <h2>Cart</h2>
      {cart.items.length === 0 ? (
        <div data-testid={containerId.empty}>No items in the cart</div>
      ) : (
        <div>
          {cart.items.map((item) => (
            <div
              key={item.product.id}
              data-testid={containerId.listItem(item.product.id)}
            >
              <p data-testid={textId.name}>
                <Link to={`/products/${item.product.id}`}>
                  {item.product.name}
                </Link>
              </p>
              <p data-testid={textId.price}>Price: {item.product.price}</p>
              <p data-testid={textId.quantity}>Quantity: {item.quantity}</p>
              <button data-testid={clickId.reduce} onClick={() => handleDecreaseCart(item.product)}>
                Reduce
              </button>
              <button data-testid={clickId.add} onClick={() => handleIncreaseCart(item.product)}>
                Add
              </button>
            </div>
          ))}
          <p>Total: {cart.total}</p>
          <button data-testid={clickId.submit} onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
