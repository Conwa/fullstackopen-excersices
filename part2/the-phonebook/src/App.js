import { useState, useEffect } from "react";
import axios from "axios";
import AddContact from "./components/AddContact";
import Filter from "./components/Filter";
import ReturnList from "./components/ReturnList";
import fetch from "./services/fetch";

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
    };

    fetch.createContact(newPerson);

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
    // console.log(search.toLowerCase());

    let matches = {};
    for (let i = 0; i < search.length; i++) {
      matches = persons.filter((person) => {
        return person.name[i].toLowerCase() === search[i];
      });
    }
    return newMatch(matches);
  }

  useEffect(() => {
    fetch.getAll().then((response) => setPersons(response));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handlePersonSearch={handlePersonSearch} />
      <form onSubmit={submitPerson}>
        <h2>Add new contact:</h2>
        <div>
          <AddContact
            name={newName}
            number={newNumber}
            handleNameChange={handleNameChange}
            handleNumberChange={handleNumberChange}
          />
        </div>
        <button type="submit">Add Contact</button>
      </form>
      <h2>List: </h2>
      <ReturnList
        persons={persons}
        match={match}
        setPersons={setPersons}
        newMatch={newMatch}
      />
    </div>
  );
};

export default App;
