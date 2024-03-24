import { ADD_TO_CART } from "../constants";

export const addToCart = (product, quantity) => {
  return {
    type: ADD_TO_CART,
    payload: {
      product,
      quantity
    }
  };
};

export const removeFromCart = (productId) => {
  return {
    type: 'REMOVE_FROM_CART',
    payload: {
      productId
    }
  };
};

export const clearCart = () => {
  return {
    type: 'CLEAR_CART'
  };
};