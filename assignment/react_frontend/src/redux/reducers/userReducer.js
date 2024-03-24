import { SET_USER } from "../constants";
import { USERS } from "../../constants/constants";

const initialState = {
  role: USERS.guest,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        role: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
