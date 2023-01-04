const Notification = (props, { message }) => {
  if (message === null) {
    return null;
  }
  <>
    {props.isError === true ? (
      <h1 className="note">{message}</h1>
    ) : (
      <h1 className="error">{message}</h1>
    )}
  </>;
};

export default Notification;
