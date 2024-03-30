import { axiosHelper } from "../../../utils/axiosHelper";
import { setNotifications } from "../notificationActions";
import { getAllUsers, getSelectedUsers, setCurrentUser, setUserRole, updateSelectedUsers } from "../userActions";
import { dataTestIds, stateTypes } from "../../../tests/constants/components";

export const register = (userData) => {
  const { notificationId } = dataTestIds;

  return async (dispatch) => {

    dispatch(
      setNotifications(
        stateTypes.auth,
        notificationId.loading(stateTypes.auth),
        "loading",
        Date.now()
      )
    );

    try {
      const data = await axiosHelper.post("/register", userData);

      dispatch(
        setNotifications(
          stateTypes.auth,
          notificationId.success(stateTypes.auth),
          "success",
          Date.now()
        )
      );

      dispatch(setUserRole(data.user.role));
      dispatch(setCurrentUser(data.user));
    } catch (error) {
      console.error(error);
      dispatch(
        setNotifications(
          stateTypes.auth,
          notificationId.error(stateTypes.auth),
          error.response.data.error,
          Date.now()
        )
      );
    }
  };
};

export const login = (userData) => {
  const { notificationId } = dataTestIds;

  return async (dispatch) => {

    dispatch(
      setNotifications(
        stateTypes.auth,
        notificationId.loading(stateTypes.auth),
        "loading",
        Date.now()
      )
    );
    
    try {
      const data = await axiosHelper.post("/login", userData);

      dispatch(
        setNotifications(
          stateTypes.auth,
          notificationId.success(stateTypes.auth),
          "success",
          Date.now()
        )
      );
      dispatch(setUserRole(data.user.role));
      dispatch(setCurrentUser(data.user));
    } catch (error) {
      console.error(error);
      dispatch(
        setNotifications(
          stateTypes.auth,
          notificationId.error(stateTypes.auth),
          error.response.data.error,
          Date.now()
        )
      );
    }
  };
};

export const fetchUsers = () => {
  const { notificationId } = dataTestIds;

  return async (dispatch) => {

    dispatch(
      setNotifications(
        stateTypes.auth,
        notificationId.loading(stateTypes.auth),
        "loading",
        Date.now()
      )
    );
    
    try {
      const data = await axiosHelper.get("/users");

      dispatch(
        setNotifications(
          stateTypes.auth,
          notificationId.success(stateTypes.auth),
          "success",
          Date.now()
        )
      );
      dispatch(getAllUsers(data));
    } catch (error) {
      console.error(error);
      dispatch(
        setNotifications(
          stateTypes.auth,
          notificationId.error(stateTypes.auth),
          error.response.data.error,
          Date.now()
        )
      );
    }
  };
};

export const fetchUser = (id) => {
  const { notificationId } = dataTestIds;

  return async (dispatch) => {

    dispatch(
      setNotifications(
        stateTypes.auth,
        notificationId.loading(stateTypes.auth),
        "loading",
        Date.now()
      )
    );
    
    try {
      const data = await axiosHelper.get("/users" + `/${id}`);

      dispatch(
        setNotifications(
          stateTypes.auth,
          notificationId.success(stateTypes.auth),
          "success",
          Date.now()
        )
      );
      dispatch(getSelectedUsers(data));
    } catch (error) {
      console.error(error);
      dispatch(
        setNotifications(
          stateTypes.auth,
          notificationId.error(stateTypes.auth),
          error.response.data.error,
          Date.now()
        )
      );
    }
  };
};

export const modifyUser = (id, role) => {
  const { notificationId } = dataTestIds;

  return async (dispatch) => {

    dispatch(
      setNotifications(
        stateTypes.auth,
        notificationId.loading(stateTypes.auth),
        "loading",
        Date.now()
      )
    );
    
    try {
      const data = await axiosHelper.put("/users" + `/${id}`, role);

      dispatch(
        setNotifications(
          stateTypes.auth,
          notificationId.success(stateTypes.auth),
          "success",
          Date.now()
        )
      );
      dispatch(updateSelectedUsers(data));
    } catch (error) {
      console.error(error);
      dispatch(
        setNotifications(
          stateTypes.auth,
          notificationId.error(stateTypes.auth),
          error.response.data.error,
          Date.now()
        )
      );
    }
  };
};