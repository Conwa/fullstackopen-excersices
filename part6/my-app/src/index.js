import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

import App from "./App";
import filterReducer, { filterChange } from "./reducers/filterReducer";
import noteReducer, { createNote } from "./reducers/noteReducer";

const reducer = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);

// store.subscribe(() => console.log(store.getState()));
// store.dispatch(filterChange("IMPORTANT"));
// store.dispatch(
//   createNote("combineReducers forms one reducer from many simple reducers")
// );

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <div />
//   </Provider>
// );
