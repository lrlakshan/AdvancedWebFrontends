import { SET_PRODUCTS, SET_PRODUCT } from "../constants";

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});

export const setProduct = (product) => ({
  type: SET_PRODUCT,
  payload: product,
});
