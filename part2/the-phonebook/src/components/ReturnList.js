import Person from "./Person";

/*OPTIONAL RETURN LIST GIVEN BY KEY-UP
COULDN´T MAKE IT WORK WHEN NEEDING TO ELIMINATE CONTACTS */

const ReturnList = ({ match, persons, setPersons }) => {
  if (
    Object.keys(match).length === 0 &&
    (match.constructor === Array || match.constructor === Object)
  ) {
    //console.log(props);
    return persons.map((person) => {
      return (
        <>
          <Person
            id={person.id}
            name={person.name}
            number={person.number}
            setPersons={setPersons}
          />
        </>
      );
    });
  } else if (match.length >= 1) {
    return match.map((match) => {
      return (
        <>
          <Person
            id={match.id}
            name={match.name}
            number={match.number}
            setPersons={setPersons}
          />
        </>
      );
    });
  }
};

export default ReturnList;
