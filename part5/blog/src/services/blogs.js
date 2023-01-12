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
  // console.log(config, newObject);

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (objectToUpdate) => {
  const id = objectToUpdate.id;

  const blogURl = baseUrl.concat("/").concat(id);

  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.get(blogURl);
  console.log(response);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, setToken };
