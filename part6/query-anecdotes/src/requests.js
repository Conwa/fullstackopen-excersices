import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const createAnecdote = (newAnecdote) => {
  axios
    .post(baseUrl, newAnecdote)
    .then((res) => res.data)
    .catch((err) => console.log(err.response.data));
};

export const voteAnecdote = (updatedAnecdote) => {
  const id = updatedAnecdote.id;

  axios.put(`${baseUrl}/${id}`, updatedAnecdote).then((res) => res.data);
};
