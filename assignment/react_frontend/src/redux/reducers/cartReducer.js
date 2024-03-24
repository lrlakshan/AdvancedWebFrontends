import { ADD_TO_CART, REMOVE_FROM_CART, CLEAR_CART } from "../constants";

const initialState = {
  items: [],
  total: 0
};

const roundToTwoDecimalPlaces = (value) => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      // Add product to cart
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.product.id === product.id);
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        const updatedTotal = roundToTwoDecimalPlaces(state.total + (quantity * updatedItems[existingItemIndex].product.price));
        return {
          ...state,
          items: updatedItems,
          total: updatedTotal
        };
      } else {
        const newItem = {
          product,
          quantity
        };
        const updatedTotal = roundToTwoDecimalPlaces(state.total + (quantity * product.price));
        return {
          ...state,
          items: [...state.items, newItem],
          total: updatedTotal,
        };
      }
    }
    case REMOVE_FROM_CART: {
      const updatedItems = state.items.filter(item => item.id !== action.payload.productId);
      const removedItem = state.items.find(item => item.id === action.payload.productId);
      const updatedTotal = roundToTwoDecimalPlaces(state.total - (removedItem.quantity * removedItem.price));
      return {
        ...state,
        items: updatedItems,
        total: updatedTotal
      };
    }
    case CLEAR_CART:
      return {
        ...state,
        items: [],
        total: 0
      };
    default:
      return state;
  }
};

export default cartReducer;