import { SET_PRODUCTS, SET_PRODUCT } from "../constants";

const initialState = {
  products: [],
  product: {},
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case SET_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
};

export default productReducer;
