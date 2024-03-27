import { SET_ORDERS, SET_ORDER } from "../constants";

export const setOrders = (orders) => ({
  type: SET_ORDERS,
  payload: orders,
});

export const setOrder = (order) => ({
  type: SET_ORDER,
  payload: order,
});
