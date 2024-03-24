import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../redux/actionCreators/cartActions';

const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const { products } = useSelector(state => state.products);

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div>
      <h2>Cart</h2>
      {cart.items.map(item => (
        <div key={item.productId}>
          <p>{item.productId}</p>
          <p>Quantity: {item.quantity}</p>
          <p>Price: {item.price}</p>
          <button onClick={() => handleRemoveFromCart(item.productId)}>Remove</button>
        </div>
      ))}
      <p>Total: {cart.total}</p>
      <button onClick={handleClearCart}>Clear Cart</button>
    </div>
  );
};

export default Cart;