import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getMatch = (name) => {
  const request = axios.get(`${baseUrl}`);
  return request.then((response) => {
    const match = response.data.filter((el) => {
      return el.name.toLowerCase() === name.toLowerCase();
    });
    console.log(match);
    return match;
  });
};

const createContact = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const deleteContact = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  request
    .then((response) => console.log("deleted"))
    .catch((error) => {
      console.error("There was an error!", error);
    });
};

export default {
  getAll: getAll,
  getMatch: getMatch,
  createContact: createContact,
  deleteContact: deleteContact,
};
