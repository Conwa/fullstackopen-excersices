import React from "react";

const Filter = (props) => {
  return (
    <div>
      Filter by name: <input onKeyUp={props.handlePersonSearch} />
    </div>
  );
};

export default Filter;
