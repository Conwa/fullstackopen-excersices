import { useState, useEffect } from "react";
import AddContact from "./components/AddContact";
import Filter from "./components/Filter";
import ReturnList from "./components/ReturnList";
import fetch from "./services/fetch";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [match, newMatch] = useState([]);
  const [stateMessage, setMessage] = useState(null);
  const [stateErrorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch.getAll().then((data) => setPersons(data));
  });

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
        if (response) {
          const message = `${newPerson.name} is already added to phonebook, replace the old number with a new one?`;
          if (window.confirm(message)) {
            fetch.updateContact(newPerson.name, newPerson);
            fetch
              .getAll()
              .then((response) => {
                setPersons(response);
                setMessage(`${newPerson.name} number updated`);
                setTimeout(() => {
                  setMessage(null);
                }, 4000);
              })
              .catch((error) => {
                setErrorMessage(error);
                setTimeout(() => {
                  setErrorMessage(null);
                }, 4000);
              });
          } else {
            setErrorMessage(`${newPerson.name} is already added to phonebook`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 3000);
          }
        } else {
          fetch.createContact(newPerson);
          fetch
            .getAll()
            .then((data) => {
              setPersons(data);
              setMessage(`${newPerson.name} added`);
              setTimeout(() => {
                setMessage(null);
              }, 4000);
            })
            .catch((error) => {
              setErrorMessage(error);
              setTimeout(() => {
                setErrorMessage(null);
              }, 4000);
            });
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
        <Notification message={stateMessage} error={stateErrorMessage} />
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
