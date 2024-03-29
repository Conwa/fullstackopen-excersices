import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: { value: "ALL" },
  reducers: {
    setFilter: (state, action) => {
      return { ...state, value: action.payload };
    },
  },
});

export const { setFilter } = filterSlice.actions;

export default filterSlice.reducer;

//LAST IMPLEMENTATION

// const filterReducer = (state = "ALL", action) => {
//   switch (action.type) {
//     case "SET_FILTER": {
//       return action.payload;
//     }
//     default:
//       return state;
//   }
// };

// export const filterChange = (filter) => {
//   return {
//     type: "SET_FILTER",
//     payload: filter,
//   };
// };

// export default filterReducer;
