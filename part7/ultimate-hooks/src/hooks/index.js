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
  const [value, setResourceValue] = useState([]);

  useEffect(() => {
    const queryResource = async (url) => {
      try {
        const response = await axios.get(`${url}`);
        console.log(response);
        return response.data;
      } catch (error) {
        return { error };
      }
    };

    queryResource(baseUrl).then((response) => {
      setResourceValue(response);
    });
  }, [baseUrl]);

  const create = async (newResourse) => {
    try {
      const newInput = await axios.post(baseUrl, newResourse);
      const updatedValue = (await axios.get(baseUrl)).data; // fetching the updated list of resources
      setResourceValue(updatedValue);
      return newInput.data;
    } catch (error) {
      return { error };
    }
  };
  const service = {
    create,
  };

  return [value, service];
};
