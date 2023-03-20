import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import counterReducer from "./reducer";

const store = createStore(
  counterReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const App = () => {
  return (
    <div>
      <div>
        <button onClick={(e) => store.dispatch({ type: "GOOD" })}>GOOD</button>
        <button onClick={(e) => store.dispatch({ type: "OK" })}>OK</button>
        <button onClick={(e) => store.dispatch({ type: "BAD" })}>BAD</button>
        <button onClick={(e) => store.dispatch({ type: "RESET" })}>
          RESET
        </button>
      </div>
      <div>
        {Object.entries(store.getState()).map((key, index) => (
          <p key={index}>
            {key[0]} {key[1]}{" "}
          </p>
        ))}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
