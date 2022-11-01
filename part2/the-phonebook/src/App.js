import { useState, useEffect } from "react";
import AddContact from "./components/AddContact";
import Filter from "./components/Filter";
import ReturnList from "./components/ReturnList";
import fetch from "./services/fetch";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [match, newMatch] = useState([]);

  useEffect(() => {
    fetch.getAll().then((data) => setPersons(data));
  }, []);

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

    const message = `Add ${newName}?`;

    if (window.confirm(message)) {
      const match = fetch.getMatch(newPerson.name);
      match.then((response) => {
        console.log(response);
        if (response) {
          const message = `${newPerson.name} is already added to phonebook, replace the old number with a new one?`;
          if (window.confirm(message)) {
            fetch.updateContact(newPerson.name, newPerson);
            fetch.getAll().then((response) => setPersons(response));
          } else {
            return alert(`${newPerson.name} is already added to phonebook`);
          }
        } else {
          fetch.createContact(newPerson);
          console.log("new contact created");
        }
      });
    }
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
