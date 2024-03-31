import {
  SET_USER_ROLE,
  GET_ALL_USER,
  SET_CURRENT_USER,
  GET_SELECTED_USER,
  UPDATE_USER,
  DELETE_USER
} from "../constants";

export const setUserRole = (role) => ({
  type: SET_USER_ROLE,
  payload: role,
});

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const setUserWithAwait = (dispatch, role) => {
  return new Promise((resolve, reject) => {
    try {
      dispatch({
        type: SET_USER_ROLE,
        payload: role,
      });
      resolve();
    } catch (error) {
      reject(error);
    }
  });
};

export const getAllUsers = (users) => ({
  type: GET_ALL_USER,
  payload: users,
});

export const getSelectedUsers = (user) => ({
  type: GET_SELECTED_USER,
  payload: user,
});

export const updateSelectedUsers = (updatedUser) => ({
  type: UPDATE_USER,
  payload: updatedUser,
});

export const deleteSelectedUsers = (userId) => ({
    type: DELETE_USER,
    payload: userId,
  });
