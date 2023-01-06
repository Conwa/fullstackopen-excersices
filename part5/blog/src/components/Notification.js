const Notification = ({ message, error }) => {
  if (message === null) {
    return null;
  }

  return (
    <>
      <h1 className={error === true ? "error" : "note"}>{message}</h1>
    </>
  );
};

export default Notification;
