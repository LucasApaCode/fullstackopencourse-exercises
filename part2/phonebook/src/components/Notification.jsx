const Notification = ({ message, type }) => {
  if (message === null) {
    return null;
  } else if (type === "success") {
    return <div className="success">{message}</div>;
  } else if (type === "error") {
    return <div className="error">{message}</div>;
  }
};

export default Notification;
