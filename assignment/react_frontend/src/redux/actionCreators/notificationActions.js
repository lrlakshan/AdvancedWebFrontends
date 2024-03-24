import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from "../constants";

//TODO:: remove message
export const setNotifications = (stateType, dataTestId, message, timeStamp) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_NOTIFICATION,
      payload: {
        stateType,
        dataTestId,
        message,
        timeStamp
      },
    });

    // Set timeout to clear the notification after 5 seconds
    setTimeout(() => {
      const { notifications } = getState().notifications;
      const filteredNotifications = notifications.filter(
        (notification) => notification.timeStamp !== timeStamp
      );
      dispatch({
        type: CLEAR_NOTIFICATION,
        payload: {
          notifications: filteredNotifications,
        },
      });
    }, 5000);
  };
};

export const clearNotification = (notifications) => ({
  type: CLEAR_NOTIFICATION,
  payload: {
    notifications,
  },
});
