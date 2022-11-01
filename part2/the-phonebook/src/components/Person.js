import fetch from "../services/fetch";

import { useEffect } from "react";

const Person = ({ id, name, number, setPersons }) => {
  const handleDelete = () => {
    const message = `Delete ${name}?`;
    console.log(message);
    if (window.confirm(message)) {
      fetch.deleteContact(id);
      fetch.getAll().then((data) => setPersons(data));
    }
  };

  return (
    <>
      <p key={id}>
        {name} {number}
        <>
          <button onClick={handleDelete}>Delete Contact</button>
        </>
      </p>
    </>
  );
};

export default Person;
