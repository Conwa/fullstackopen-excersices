import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
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
  createContact: createContact,
  deleteContact: deleteContact,
};
