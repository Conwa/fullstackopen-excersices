import React from "react";

const List = (props) => {
  if (Object.entries(props.matches).length > 10) {
    return <p>Too many results, be more specific</p>;
  } else if (Object.entries(props.matches).length === 1) {
    const name = props.matches[0].name.common;
    const capital = props.matches[0].capital.toString();
    const languages = props.matches[0].languages;
    const flag = props.matches[0].flags.svg;
    console.log(flag, props.matches[0]);

    return (
      <>
        <h1>{name}</h1>
        <p>The capital is: {capital}</p>
        <h2>Languages:</h2>
        <ul>
          {Object.entries(languages).map((language) => {
            return <li>{language[1]}</li>;
          })}
        </ul>
        <img
          style={{ width: "200px", border: " 2px solid black" }}
          src={flag}
          alt="flag"
        />
      </>
    );
  }

  return Object.entries(props.matches).map((country) => {
    return <p key={country[0]}>{country[1].name.common}</p>;
  });
};

export default List;
