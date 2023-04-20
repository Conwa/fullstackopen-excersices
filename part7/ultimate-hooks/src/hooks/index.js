import axios from "axios";
import { useEffect, useState } from "react";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return { type, value, onChange };
};

export const useResource = (baseUrl) => {
  const [value, setValue] = useState([]);

  useEffect(() => {
    const queryNotes = async (url) => {
      try {
        const response = await axios.get(`${url}`);
        console.log(response);
        return response.data;
      } catch (error) {
        return { error };
      }
    };

    queryNotes(baseUrl).then((response) => {
      setValue(response);
    });
  }, [baseUrl]);

  const create = async (input) => {
    try {
      const newInput = await axios.post(baseUrl, input);
      const updatedValue = (await axios.get(baseUrl)).data; // fetching the updated list of resources
      setValue(updatedValue);
      return newInput.data;
    } catch (error) {
      return error;
    }
  };
  const service = {
    create,
  };

  return [value, service];
};
