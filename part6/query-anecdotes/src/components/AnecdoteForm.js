import { useMutation, useQueryClient } from "react-query";
import { useNotificationDispatch } from "../NotificationContext";
import { createAnecdote } from "../requests";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatchNotification = useNotificationDispatch();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    newAnecdoteMutation.mutate(
      { content, votes: 0 },
      {
        onSuccess: () => {
          dispatchNotification({
            type: "CREATE",
            payload: `You created the anecdote '${content}'!`,
          });
          setTimeout(() => {
            dispatchNotification({ type: "HIDE" });
          }, 5000);
        },
        onError: () => {
          dispatchNotification({
            type: "CREATE",
            payload: `too short anecdote, must have length 5 or more`,
          });
          setTimeout(() => {
            dispatchNotification({ type: "HIDE" });
          }, 5000);
        },
      }
    );

    event.target.anecdote.value = "";
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
