import { SET_ORDERS, SET_ORDER, PLACE_NEW_ORDER } from "../constants";

export const setOrders = (orders) => ({
  type: SET_ORDERS,
  payload: orders,
});

export const setOrder = (order) => ({
  type: SET_ORDER,
  payload: order,
});

export const placeNewOrder = (order) => ({
    type: PLACE_NEW_ORDER,
    payload: order,
  });
