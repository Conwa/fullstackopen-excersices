import { useState, useEffect } from "react";
import axios from "axios";
import Person from "./components/Person";
import Filter from "./components/Filter";

const ReturnList = (props) => {
  if (
    Object.keys(props.match).length === 0 &&
    (props.match.constructor === Array || props.match.constructor === Object)
  ) {
    console.log(props);
    return props.persons.map((person) => {
      return (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      );
    });
  } else if (props.match.length >= 1) {
    return props.match.map((match) => {
      return (
        <p key={match.id}>
          {match.name} {match.number}
        </p>
      );
    });
  }
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [match, newMatch] = useState([]);

  function handleNameChange(event) {
    setNewName(event.target.value);
  }
  function handleNumberChange(event) {
    setNewNumber(event.target.value);
  }

  const submitPerson = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    const aMatch = persons.some((person) => {
      return person.name.toLowerCase() === newPerson.name.toLowerCase();
    });

    if (!aMatch) {
      console.log("todo ok");
      return setPersons(persons.concat(newPerson));
    }
    return alert(`${newPerson.name} is already added to phonebook`);
  };

  function handlePersonSearch(event) {
    let search = event.target.value;
    search = search.toLowerCase();
    console.log(search.toLowerCase());

    let matches = {};
    for (let i = 0; i < search.length; i++) {
      matches = persons.filter((person) => {
        return person.name[i].toLowerCase() === search[i];
      });
    }
    return newMatch(matches);
  }

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promise fulfilled");
      const data = response.data;
      setPersons(data);
      console.log(data);
    });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handlePersonSearch={handlePersonSearch} />
      <form onSubmit={submitPerson}>
        <h2>Add new contact:</h2>
        <div>
          <Person
            name={newName}
            number={newNumber}
            handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange}
          />
        </div>
        <button type="submit">Add Contact</button>
      </form>
      <h2>List: </h2>
      <ReturnList persons={persons} match={match} />
    </div>
  );
};

export default App;
