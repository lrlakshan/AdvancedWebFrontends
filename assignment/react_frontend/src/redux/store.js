import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Redux-devtools extension library
import { composeWithDevTools } from "@redux-devtools/extension";

import cartReducer from "./reducers/cartReducer";
import productReducer from "./reducers/productReducer"
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";
import orderReducer from "./reducers/orderReducer";

export const reducers = combineReducers({
  cart: cartReducer,
  products: productReducer,
  notifications: notificationReducer,
  user: userReducer,
  orders: orderReducer
});

export default legacy_createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
