import { createSlice } from "@reduxjs/toolkit";

const anecdotesAtStart = [
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const anecdoteSlice = createSlice({
  name: "anecdote",
  initialState: [],
  reducers: {
    newAnecdote: (state, action) => {
      const anecdote = asObject(action.payload);
      state.push(anecdote);
      return state;
    },
    voteAnecdote: (state, action) => {
      const id = action.payload;

      const anecdoteToChange = state.find((el) => el.id === id);

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      };

      return state.map((anecdote) =>
        anecdote.id !== id ? anecdote : changedAnecdote
      );
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { newAnecdote, voteAnecdote, appendAnecdote, setAnecdotes } =
  anecdoteSlice.actions;
export default anecdoteSlice.reducer;

//LAST IMPLEMENTATION

// const anecdoteReducer = (state = initialState, action) => {
//   // console.log("state now: ", state);
//   // console.log("action", action);

//   switch (action.type) {
//     case "NEW_ANECDOTE": {
//       const newAnecdote = action.payload.anecdote;
//       return [...state, newAnecdote];
//     }

//     case "VOTE": {
//       const id = action.payload.id;
//       const anecdoteToChange = state.find((el) => el.id === id);
//       const changedAnecdote = {
//         ...anecdoteToChange,
//         votes: anecdoteToChange.votes + 1,
//       };
//       return state.map((anecdote) =>
//         anecdote.id !== id ? anecdote : changedAnecdote
//       );
//     }

//     default:
//       return state;
//   }
// };

// export const newAnecdote = (text) => {
//   const anecdote = asObject(text);
//   return { type: "NEW_ANECDOTE", payload: { anecdote } };
// };

// export const voteAnecdote = (id) => {
//   return {
//     type: "VOTE",
//     payload: { id },
//   };
// };
