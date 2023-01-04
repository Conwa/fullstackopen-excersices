const Notification = ({ message }) => {
  console.log(message);
  if (message === null) {
    return null;
  }

  return (
    <>
      <h1 className="error">{message}</h1>
    </>
  );
};

export default Notification;
