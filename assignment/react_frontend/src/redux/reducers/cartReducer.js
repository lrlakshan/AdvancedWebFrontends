import {
  ADD_TO_CART,
  CLEAR_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
} from "../constants";

const initialState = {
  items: [],
  total: 0,
};

const roundToTwoDecimalPlaces = (value) => {
  return Math.round((value + Number.EPSILON) * 100) / 100;
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      // Add product to cart
      const { product, quantity } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );
      if (existingItemIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity += quantity;
        const updatedTotal = roundToTwoDecimalPlaces(
          state.total + quantity * updatedItems[existingItemIndex].product.price
        );
        return {
          ...state,
          items: updatedItems,
          total: updatedTotal,
        };
      } else {
        const newItem = {
          product,
          quantity,
        };
        const updatedTotal = roundToTwoDecimalPlaces(
          state.total + quantity * product.price
        );
        return {
          ...state,
          items: [...state.items, newItem],
          total: updatedTotal,
        };
      }
    }
    case INCREASE_QUANTITY: {
      const { product } = action.payload;

      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );
      const updatedItems = [...state.items];
      updatedItems[existingItemIndex].quantity += 1;
      const updatedTotal = roundToTwoDecimalPlaces(
        state.total + updatedItems[existingItemIndex].product.price
      );
      return {
        ...state,
        items: updatedItems,
        total: updatedTotal,
      };
    }
    case DECREASE_QUANTITY: {
      const { product } = action.payload;

      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );

      if (state.items[existingItemIndex].quantity > 1) {
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex].quantity -= 1;
        const updatedTotal = roundToTwoDecimalPlaces(
          state.total - product.price
        );

        return {
          ...state,
          items: updatedItems,
          total: updatedTotal,
        };
      } else {
        const updatedItems = state.items.filter(
          (item) => item.product.id !== product.id
        );
        const updatedTotal = roundToTwoDecimalPlaces(
          state.total - product.price
        );

        return {
          ...state,
          items: updatedItems,
          total: updatedTotal,
        };
      }
    }
    case CLEAR_CART:
      return {
        ...state,
        items: [],
        total: 0,
      };
    default:
      return state;
  }
};

export default cartReducer;
