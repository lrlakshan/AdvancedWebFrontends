import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from "../constants";

const initialState = {
  notifications: [],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION: {
      const { stateType, notificationId, message, timeStamp } = action.payload;
      //const existingNotificationId = state.notifications.findIndex(notification => notification.notificationId === notificationId);
      const notificationList = state.notifications.filter(notification => notification.stateType !== stateType);
      const newNotification = {
        stateType,
        notificationId,
        message,
        timeStamp
      };
      const updatedState = {
        ...state,
        notifications: [...notificationList, newNotification],
      };

      return updatedState;
    }
    case CLEAR_NOTIFICATION: {
      return {
        ...state,
        notifications: action.payload.notifications,
      };
    }
    default:
      return state;
  }
};

export default notificationReducer;


// const notificationReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case SET_NOTIFICATION: {
//       const { stateType, notificationId, message } = action.payload;
//       const updatedNotifications = state.notifications.filter(notification => notification.stateType !== stateType);
//       const newNotification = {
//         stateType,
//         notificationId,
//         message,
//       };
//       return {
//         ...state,
//         notifications: [...updatedNotifications, newNotification],
//       };
//     }
//     case CLEAR_NOTIFICATION: {
//       const { stateType } = action.payload;
//       return {
//         ...state,
//         notifications: state.notifications.filter(notification => notification.stateType !== stateType),
//       };
//     }
//     default:
//       return state;
//   }
// };

// export default notificationReducer;
