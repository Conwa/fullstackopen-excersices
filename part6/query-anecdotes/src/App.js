import { useMutation, useQuery, useQueryClient } from "react-query";

import { getAnecdotes, voteAnecdote } from "./requests";

import { useNotificationDispatch } from "./NotificationContext";

import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
  const queryClient = useQueryClient();
  const dispatchNotification = useNotificationDispatch();

  const voteAnecdoteMutation = useMutation(voteAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries("anecdotes");
    },
  });

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(
      { ...anecdote, votes: anecdote.votes + 1 },
      {
        onSuccess: () => {
          dispatchNotification({
            type: "VOTE",
            payload: `You voted for ${anecdote.content} anecdote!`,
          });

          setTimeout(() => {
            dispatchNotification({ type: "HIDE" });
          }, 5000);
        },
      }
    );
  };

  const result = useQuery("anecdotes", getAnecdotes);

  if (result.isLoading) {
    return <div>anecdote service not availibe due to server error</div>;
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                handleVote(anecdote);
              }}
            >
              vote
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
