import { legacy_createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

// Redux-devtools extension library
import { composeWithDevTools } from "@redux-devtools/extension";

export const reducers = combineReducers({
  // Add reducers here
});

export default legacy_createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);
