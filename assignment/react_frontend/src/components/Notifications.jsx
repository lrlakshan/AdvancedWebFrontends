import React from 'react'
import { useSelector } from 'react-redux';

const Notifications = () => {
    const { notifications } = useSelector((state) => state.notifications);
    return (
      <div
        data-testid={
          notifications.length ? "notifications-container" : "empty-container"
        }
      >
        {notifications.map((notification) => (
          <div
            key={notification.stateType}
            data-testid={`${notification.stateType}-${notification.notificationId}-notification`}
          >
            {`${notification.message}`}
          </div>
        ))}
      </div>
    );
}

export default Notifications

