import axios from "axios";

//NEED TO CHANGE URL FOR WORKING ON VERCEL OR FOR WORKING ON PRIVATE COMPUTER
// eslint-disable-next-line no-unused-vars
const baseUrl = "/api/users";

const urlForVercel = "https://blog-redux-back-two.vercel.app/api/users";

const getAll = async () => {
  const response = await axios.get(urlForVercel);
  return response.data;
};

export default { getAll };
