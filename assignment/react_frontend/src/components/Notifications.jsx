import React from 'react'
import { useSelector } from 'react-redux';
import { dataTestIds } from '../tests/constants/components';

const Notifications = () => {
    const { containerId } = dataTestIds;
    const { notifications } = useSelector((state) => state.notifications);
    return (
      <div
        data-testid={
          notifications.length ? containerId.notification : containerId.empty
        }
      >
        {notifications.map((notification) => (
          <div
            key={notification.stateType}
            data-testid={notification.dataTestId}
          >
            {`${notification.message}`}
          </div>
        ))}
      </div>
    );
}

export default Notifications

