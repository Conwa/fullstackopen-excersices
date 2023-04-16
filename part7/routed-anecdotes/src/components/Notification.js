const Notification = ({ content }) => {
  console.log(content);

  return (
    <div>
      <p>Anecdote {content} has been created!</p>
    </div>
  );
};

export default Notification;
