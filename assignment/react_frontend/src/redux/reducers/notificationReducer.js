import { SET_NOTIFICATION, CLEAR_NOTIFICATION } from "../constants";

const initialState = {
  notifications: [],
};

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_NOTIFICATION: {
      const { stateType, dataTestId, message, timeStamp } = action.payload;
      const notificationList = state.notifications.filter(notification => notification.stateType !== stateType);
      const newNotification = {
        stateType,
        dataTestId,
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
