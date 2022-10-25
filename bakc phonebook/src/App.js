import { useState } from "react";

const Filter = (props) => {
  return (
    <>
      Filter by name: <input onKeyUp={props.handlePersonSearch} />
    </>
  );
};

const Person = (props) => {
  return (
    <>
      name: <input name={props.newName} onChange={props.handleNameChange} />
      number:{" "}
      <input name={props.newNumber} onChange={props.handleNumberChange} />
    </>
  );
};

const SubmitPerson = () => {
  return (
    <>
      <button type="submit">Add Contact</button>
    </>
  );
};

const ReturnList = (props) => {
  if (
    Object.keys(props.match).length === 0 &&
    props.match.constructor === Object
  ) {
    console.log(props.match);
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
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
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
        <SubmitPerson />
      </form>
      <h2>List: </h2>
      <ReturnList persons={persons} match={match} />
    </div>
  );
};

export default App;
