import { axiosHelper } from "../../../utils/axiosHelper";
import { setOrder, setOrders } from "../orderAction";
import { setNotifications } from "../notificationActions";
import { dataTestIds, stateTypes } from "../../../tests/constants/components";

const { notificationId } = dataTestIds;

export const getOrders = () => {
  return async (dispatch) => {
    dispatch(
      setNotifications(
        stateTypes.order,
        notificationId.loading(stateTypes.order),
        "loading",
        Date.now()
      )
    );
    try {
      const data = await axiosHelper.get("/orders");

      dispatch(
        setNotifications(
          stateTypes.order,
          notificationId.success(stateTypes.order),
          "success",
          Date.now()
        )
      );
      dispatch(setOrders(data));
    } catch (error) {
      console.error(error);
      dispatch(
        setNotifications(
          stateTypes.order,
          notificationId.error(stateTypes.order),
          "error",
          Date.now()
        )
      );
    }
  };
};

export const getOrder = (id) => {
  return async (dispatch) => {
    dispatch(
      setNotifications(
        stateTypes.order,
        notificationId.loading(stateTypes.order),
        "loading",
        Date.now()
      )
    );

    try {
      const data = await axiosHelper.get("/orders" + `/${id}`);

      dispatch(
        setNotifications(
          stateTypes.order,
          notificationId.success(stateTypes.order),
          "success",
          Date.now()
        )
      );
      dispatch(setOrder(data));
    } catch (error) {
      console.error(error);
      dispatch(
        setNotifications(
          stateTypes.order,
          notificationId.error(stateTypes.order),
          "error",
          Date.now()
        )
      );
    }
  };
};
