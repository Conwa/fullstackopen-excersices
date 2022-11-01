import React from "react";

const AddContact = (props) => {
  return (
    <>
      name:{" "}
      <input
        value={props.newName}
        name={props.newName}
        onChange={props.handleNameChange}
      />
      number:{" "}
      <input name={props.newNumber} onChange={props.handleNumberChange} />
    </>
  );
};

export default AddContact;
