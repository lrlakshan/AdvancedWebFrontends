import { SET_ORDERS, SET_ORDER, PLACE_NEW_ORDER } from "../constants";

const initialState = {
  orders: [],
  order: {},
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS: {
      return {
        ...state,
        orders: action.payload,
      };
    }
    case SET_ORDER:
      return {
        ...state,
        order: action.payload,
      };
    case PLACE_NEW_ORDER:
      const updatedOrder = [...state.orders, action.payload];
      return {
        ...state,
        orders: updatedOrder,
      };
    default:
      return state;
  }
};

export default orderReducer;
