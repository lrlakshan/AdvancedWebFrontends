import { ADD_TO_CART, INCREASE_QUANTITY, DECREASE_QUANTITY } from "../constants";

export const addToCart = (product, quantity) => {
  return {
    type: ADD_TO_CART,
    payload: {
      product,
      quantity
    }
  };
};

export const increaseQuantity = (product) => {
  return {
    type: INCREASE_QUANTITY,
    payload: {
      product
    }
  };
};

export const decreaseQuantity = (product) => {
  return {
    type: DECREASE_QUANTITY,
    payload: {
      product
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