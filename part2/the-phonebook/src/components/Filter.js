import React from "react";

const Filter = (props) => {
  return (
    <>
      Filter by name: <input onKeyUp={props.handlePersonSearch} />
    </>
  );
};

export default Filter;
