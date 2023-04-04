import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNew = async (content) => {
  const object = { content, votes: 0 };
  const response = await axios.post(baseUrl, object);
  return response.data;
};

const vote = async (id) => {
  const anecdoteUrl = `${baseUrl}/${id}`;
  const response = await axios.get(anecdoteUrl);
  let anecdoteToChange = response.data;

  const changedAnecdote = {
    ...anecdoteToChange,
    votes: anecdoteToChange.votes + 1,
  };

  const request = await axios.put(anecdoteUrl, changedAnecdote);

  return request.data;
};

export default {
  getAll,
  createNew,
  vote,
};
