import React from "react";

const Person = (props) => {
  return (
    <>
      name: <input name={props.newName} onChange={props.handleNameChange} />
      number:{" "}
      <input name={props.newNumber} onChange={props.handleNumberChange} />
    </>
  );
};

export default Person;
