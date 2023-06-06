import axios from "axios";

//NEED TO CHANGE URL FOR WORKING ON VERCEL OR FOR WORKING ON PRIVATE COMPUTER
// eslint-disable-next-line no-unused-vars
const baseUrl = "/api/login";

const urlForVercel = "https://blog-redux-back-two.vercel.app/api/login";

const login = async (credentials) => {
  const response = await axios.post(urlForVercel, credentials);
  console.log(response);
  return response.data;
};

export default { login };
