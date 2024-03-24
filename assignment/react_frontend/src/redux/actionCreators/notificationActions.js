import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from "../constants";

//TODO:: remove message
export const setNotifications = (stateType, notificationId, message, timeStamp) => {
  return (dispatch, getState) => {
    dispatch({
      type: SET_NOTIFICATION,
      payload: {
        stateType,
        notificationId,
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

// export const setNotifications = (stateType, notificationId, message) => {
//   return (dispatch, getState) => {
//     const { notifications } = getState().notifications;
//     const existingNotification = notifications.find(
//       (notification) => notification.stateType === stateType
//     );

//     if (existingNotification) {
//       // If a notification of the same state type already exists, clear it
//       dispatch({
//         type: CLEAR_NOTIFICATION,
//         payload: {
//             stateType: existingNotification.stateType,
//         },
//       });
//     }

//     // Add the new notification
//     dispatch({
//       type: SET_NOTIFICATION,
//       payload: {
//         stateType,
//         notificationId,
//         message,
//       },
//     });

//     // Set timeout to clear the new notification after 5 seconds
//     setTimeout(() => {
//       dispatch({
//         type: CLEAR_NOTIFICATION,
//         payload: {
//             stateType,
//         },
//       });
//     }, 5000);
//   };
// };

export const clearNotification = (notifications) => ({
  type: CLEAR_NOTIFICATION,
  payload: {
    notifications,
  },
});
