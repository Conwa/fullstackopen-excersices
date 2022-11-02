const Notification = ({ message, error = false }) => {
  if (message || error) {
    if (error) {
      return (
        <div className="error">
          <h2 className="error__message">{error}</h2>
        </div>
      );
    } else {
      return (
        <div className="successful">
          <h2 className="successful__message">{message}</h2>
        </div>
      );
    }
  }
  return null;
};

export default Notification;
