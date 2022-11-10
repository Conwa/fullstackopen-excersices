import axios from "axios";
const baseUrl = "/api/phonebook";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getMatch = (name) => {
  const request = axios.get(baseUrl);
  return request.then((response) => {
    const match = response.data.some((el) => {
      return el.name.toLowerCase() === name.toLowerCase();
    });
    return match;
  });
};

const createContact = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

const updateContact = (name, updatedContact) => {
  const getMatch = axios.get(baseUrl).then((response) => {
    const match = response.data.filter((el) => {
      return el.name.toLowerCase() === name.toLowerCase();
    });
    const id = match[0].id;
    const request = axios.put(`${baseUrl}/${id}`, updatedContact);
    return request.then((response) => response.data);
  });
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
  updateContact: updateContact,
  deleteContact: deleteContact,
};
