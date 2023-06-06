/* eslint-disable no-unused-vars */
import axios from "axios";

//NEED TO CHANGE URL FOR WORKING ON VERCEL OR FOR WORKING ON PRIVATE COMPUTER

const baseUrl = "/api/blogs";

const urlForVercel = "https://blog-redux-back-two.vercel.app/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(urlForVercel);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(urlForVercel, newObject, config);
  return response.data;
};

const update = (objectToUpdate) => {
  const id = objectToUpdate.id;

  const blogURl = urlForVercel.concat("/").concat(id);

  const request = axios.put(blogURl, objectToUpdate);

  return request.then((response) => response.data);
};

const deletion = async (objectToDelete) => {
  const config = {
    headers: { Authorization: token },
  };

  const request = axios.delete(`${urlForVercel}/${objectToDelete.id}`, config);
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
    `${urlForVercel}/${id}/comments`,
    { comment },
    config
  );

  return request.data;
};

export default { getAll, create, update, deletion, setToken, comment };
