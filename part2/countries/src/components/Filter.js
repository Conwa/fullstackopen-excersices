import React, { useState, s } from "react";
import Country from "./Country";
import List from "./List";

const Filter = (props) => {
  const [selected, setSelected] = useState({
    key: "",
    state: false,
  });
  const [toggle, setToggle] = useState({ index: "", state: false });

  if (Object.entries(props.matches).length > 10) {
    return <p>Too many results, be more specific</p>;
  } else if (Object.entries(props.matches).length === 1) {
    const currenCountry = props.matches[0];

    return <Country country={currenCountry} />;
  } else {
    return Object.entries(props.matches).map((el) => {
      const [key, currenCountry] = el;
      return (
        <>
          <List key={key} country={currenCountry} />
          <button
            key={key}
            onClick={() => {
              setToggle({ index: props.matches });
              console.log(toggle);
            }}
          >
            Show Info
          </button>
          {toggle && (
            <>
              <p>hola mundo</p>
            </>
          )}
        </>
      );
    });
  }
};

export default Filter;
