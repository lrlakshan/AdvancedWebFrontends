import {
  SET_USER_ROLE,
  GET_ALL_USER,
  SET_CURRENT_USER,
  GET_SELECTED_USER,
  UPDATE_USER,
  DELETE_USER,
} from "../constants";
import { USERS } from "../../constants/constants";

const initialState = {
  role: USERS.guest,
  currentUser: {},
  allUsers: [],
  selectedUser: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_ROLE:
      return {
        ...state,
        role: action.payload,
      };
    case GET_ALL_USER:
      return {
        ...state,
        allUsers: action.payload,
      };
    case GET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case UPDATE_USER: {
      const updatedUsers = state.allUsers.map((user) => {
        if (user.id === action.payload.id) {
          return { ...user, role: action.payload.role };
        }
        return user;
      });

      const updatedSelectedUser =
        state.selectedUser.id === action.payload.id
          ? { ...state.selectedUser, role: action.payload.role }
          : state.selectedUser;

      return {
        ...state,
        allUsers: updatedUsers,
        selectedUser: updatedSelectedUser,
      };
    }
    case DELETE_USER:
      return {
        ...state,
        allUsers: state.allUsers.filter(
          (user) => user.id !== action.payload
        ),
        selectedUser: {},
      };
    default:
      return state;
  }
};

export default userReducer;
