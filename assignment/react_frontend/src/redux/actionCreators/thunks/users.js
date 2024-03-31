import { axiosHelper } from "../../../utils/axiosHelper";
import { setNotifications } from "../notificationActions";
import { deleteSelectedUsers, getAllUsers, getSelectedUsers, setCurrentUser, setUserRole, updateSelectedUsers } from "../userActions";
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
        stateTypes.user,
        notificationId.loading(stateTypes.user),
        "loading",
        Date.now()
      )
    );
    
    try {
      const data = await axiosHelper.get("/users");
      dispatch(getAllUsers(data));
      dispatch(
        setNotifications(
          stateTypes.user,
          notificationId.success(stateTypes.user),
          "success",
          Date.now()
        )
      );
    } catch (error) {
      console.error(error);
      dispatch(
        setNotifications(
          stateTypes.user,
          notificationId.error(stateTypes.user),
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
        stateTypes.user,
        notificationId.loading(stateTypes.user),
        "loading",
        Date.now()
      )
    );
    
    try {
      const data = await axiosHelper.get("/users" + `/${id}`);
      dispatch(getSelectedUsers(data));
      dispatch(
        setNotifications(
          stateTypes.user,
          notificationId.success(stateTypes.user),
          "success",
          Date.now()
        )
      );
    } catch (error) {
      dispatch(getSelectedUsers({}));
      console.error(error);
      dispatch(
        setNotifications(
          stateTypes.user,
          notificationId.error(stateTypes.user),
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
        stateTypes.user,
        notificationId.loading(stateTypes.user),
        "loading",
        Date.now()
      )
    );
    
    try {
      const data = await axiosHelper.put("/users" + `/${id}`, role);
      dispatch(updateSelectedUsers(data));
      dispatch(
        setNotifications(
          stateTypes.user,
          notificationId.success(stateTypes.user),
          "success",
          Date.now()
        )
      );
    } catch (error) {
      console.error(error);
      dispatch(
        setNotifications(
          stateTypes.user,
          notificationId.error(stateTypes.user),
          error.response.data.error,
          Date.now()
        )
      );
    }
  };
};

export const deleteUser = (userId) => {
  const { notificationId } = dataTestIds;

  return async (dispatch) => {

    dispatch(
      setNotifications(
        stateTypes.user,
        notificationId.loading(stateTypes.user),
        "loading",
        Date.now()
      )
    );
    
    try {
      const data = await axiosHelper.delete("/users" + `/${userId}`);

      dispatch(
        setNotifications(
          stateTypes.user,
          notificationId.success(stateTypes.user),
          "success",
          Date.now()
        )
      );
      dispatch(deleteSelectedUsers(userId));
    } catch (error) {
      console.error(error);
      dispatch(
        setNotifications(
          stateTypes.user,
          notificationId.error(stateTypes.user),
          error.response.data.error,
          Date.now()
        )
      );
    }
  };
};