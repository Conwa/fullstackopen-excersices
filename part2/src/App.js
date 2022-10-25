import { useState, useEffect } from "react";
import axios from "axios";
import List from "./components/List";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [matches, setMatches] = useState([]);
  const [search, setSearch] = useState();

  function handleSearch(event) {
    const countrySearch = event.target.value;
    setSearch(new RegExp(countrySearch.toLowerCase(), "ig"));
    const filtered = countries.filter((country) => {
      const name = country.name.common;
      return name.toLowerCase().match(search);
    });
    setMatches(filtered);
  }

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      console.log("promise fulfilled");
      const data = response.data;
      setCountries(data);
    });
  }, []);
  return (
    <>
      <form>
        Search Countries:<input onChange={handleSearch}></input>
      </form>
      <List countries={countries} matches={matches} />
    </>
  );
};

export default App;
