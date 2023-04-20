import axios from "axios";
import { useEffect, useState } from "react";

export const useCountry = (input) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const queryCountry = async (name) => {
      try {
        const countryDetails = await axios.get(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );
        return { data: countryDetails.data[0], found: true };
      } catch (error) {
        return { found: false };
      }
    };

    if (input) {
      queryCountry(input).then((response) => {
        setCountry(response);
      });
    }
  }, [input]);

  return country;
};
