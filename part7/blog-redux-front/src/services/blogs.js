/* eslint-disable no-unused-vars */
import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = (objectToUpdate) => {
  const id = objectToUpdate.id;

  const blogURl = baseUrl.concat("/").concat(id);

  const request = axios.put(blogURl, objectToUpdate);

  return request.then((response) => response.data);
};

const deletion = async (objectToDelete) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.delete(`${baseUrl}/${objectToDelete.id}`, config);
  return request.then((response) => response.data);
};

const comment = async (id, comment) => {
  const config = {
    headers: { Authorization: token },
  };

  // const request = await axios.post(
  //   `${baseUrl}/${id}/comments`,
  //   comment,
  //   config
  // );
  const request = await axios.post(
    `${baseUrl}/${id}/comments`,
    { comment },
    config
  );

  return request.data;
};

export default { getAll, create, update, deletion, setToken, comment };
