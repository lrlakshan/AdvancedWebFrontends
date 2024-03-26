import { axiosHelper } from "../../../utils/axiosHelper";
import { setNotifications } from "../notificationActions";
import { setUser } from "../userActions";
import { dataTestIds, stateTypes } from "../../../tests/constants/components";

export const register = (userData) => {
  const { notificationId } = dataTestIds;

  return async (dispatch) => {
    try {
      const data = await axiosHelper.post("/register", userData);

      console.log("data:", data.user.role);

      dispatch(
        setNotifications(
          stateTypes.auth,
          notificationId.success(stateTypes.auth),
          "success",
          Date.now()
        )
      );
      dispatch(setUser(data.user.role));
    } catch (error) {
      console.error(error);
      dispatch(
        setNotifications(
          stateTypes.auth,
          notificationId.error(stateTypes.auth),
          "error",
          Date.now()
        )
      );
    }
  };
};
