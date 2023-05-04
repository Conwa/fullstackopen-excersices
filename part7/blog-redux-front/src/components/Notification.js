import { useSelector } from "react-redux";

const Notification = (error) => {
  const notification = useSelector((state) => state.notification);

  if (notification === null) {
    return null;
  }

  return (
    <>
      <h1
        id="notification-message"
        className={error.error === true ? "error" : "note"}
      >
        {notification}
      </h1>
    </>
  );
};

export default Notification;
