import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Redux-devtools extension library
import { composeWithDevTools } from "@redux-devtools/extension";

import cartReducer from "./reducers/cartReducer";
import productReducer from "./reducers/productReducer"
import notificationReducer from "./reducers/notificationReducer";
import userReducer from "./reducers/userReducer";

export const reducers = combineReducers({
  cart: cartReducer,
  products: productReducer,
  notifications: notificationReducer,
  role: userReducer
});

export default legacy_createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
