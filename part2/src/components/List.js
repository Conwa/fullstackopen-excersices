import React from "react";

const List = (props) => {
  //console.log(console.log(props.countries[0]));

  return Object.entries(props.matches).map((country) => {
    return <p key={country[0]}>{country[1].name.common}</p>;
  });
};

export default List;
