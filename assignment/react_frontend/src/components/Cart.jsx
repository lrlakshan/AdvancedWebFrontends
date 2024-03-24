import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { dataTestIds } from "../tests/constants/components";

const Cart = () => {
  const { containerId, textId, clickId } = dataTestIds;

  const cart = useSelector((state) => state.cart);

  const handleIncreaseCart = () => {
    // Handle place order logic here
    console.log("Increase...");
  };

  const handleDecreaseCart = () => {
    // Handle place order logic here
    console.log("Decrease...");
  };

  const handlePlaceOrder = () => {
    // Handle place order logic here
    console.log("Placing order...");
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
              <button data-testid={clickId.reduce} onClick={() => handleDecreaseCart()}>
                Reduce
              </button>
              <button data-testid={clickId.add} onClick={() => handleIncreaseCart()}>
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
