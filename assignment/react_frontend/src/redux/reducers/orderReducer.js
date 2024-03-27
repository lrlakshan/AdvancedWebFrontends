import { SET_ORDERS, SET_ORDER } from "../constants";

const initialState = {
  orders: [],
  order: {}
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
    default:
      return state;
  }
};

export default orderReducer;
