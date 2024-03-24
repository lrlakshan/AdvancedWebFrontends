import { ADD_TO_CART } from "../constants";

export const addToCart = (productId, quantity, products) => {
  return {
    type: ADD_TO_CART,
    payload: {
      productId,
      quantity,
      products
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