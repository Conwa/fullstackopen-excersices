import { useMutation, useQueryClient } from "react-query";
import { useNotificationDispatch } from "../NotificationContext";
import { createAnecdote } from "../requests";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useNotificationDispatch();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
    onError: (response) => {
      console.log("sdf");
      console.log(response);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    newAnecdoteMutation.mutate({ content, votes: 0 });
    dispatch({ type: "CREATE", payload: content });
    event.target.anecdote.value = "";
    setTimeout(() => {
      dispatch({ type: "" });
    }, 5000);
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
