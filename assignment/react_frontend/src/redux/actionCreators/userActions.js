import { SET_USER } from "../constants";

export const setUser = (role) => ({
    type: SET_USER,
    payload: role
});