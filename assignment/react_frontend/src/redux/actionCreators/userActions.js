import { SET_USER } from "../constants";

export const setUser = (role) => ({
    type: SET_USER,
    payload: role
});

export const setUserWithAwait = (dispatch, role) => {
    return new Promise((resolve, reject) => {
      try {
        dispatch({
          type: SET_USER,
          payload: role
        });
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };