import React from "react";

const List = ({ country }) => {
  return <p key={country.key}>{country.name.common}</p>;
};

export default List;
