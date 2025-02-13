import { SET_PRODUCTS, SET_PRODUCT, EDIT_PRODUCT, DELETE_PRODUCT, ADD_NEW_PRODUCT } from "../constants";

export const setProducts = (products) => ({
  type: SET_PRODUCTS,
  payload: products,
});

export const setProduct = (product) => ({
  type: SET_PRODUCT,
  payload: product,
});

export const addNewProduct = (product) => ({
  type: ADD_NEW_PRODUCT,
  payload: product,
});

export const editProduct = (product) => ({
  type: EDIT_PRODUCT,
  payload: product,
});

export const removeProduct = (product) => ({
  type: DELETE_PRODUCT,
  payload: product,
});
