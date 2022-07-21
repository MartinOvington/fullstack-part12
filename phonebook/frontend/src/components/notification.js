import React from 'react';

const Notification = ({ message, msgType }) => {
  if (message === null) {
    return null;
  }

  if (msgType === 'updateMsg') {
    return <div className="updateMsg">{message}</div>;
  } else {
    return <div className="error">{message}</div>;
  }
};

export default Notification;
