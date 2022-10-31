import React from "react";

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map((language) => {
          return <li>{language[1]}</li>;
        })}
      </ul>
      <img
        src={country.flags.svg}
        alt="Flag"
        style={{ width: "200px", border: "2px solid black" }}
      ></img>
    </div>
  );
};

export default Country;
