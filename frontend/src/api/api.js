import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const reserveAPI = async ({ method, route, params, data }) => {
  const url = `${BASE_URL}${route}`;
  const options = {
    method,
    url,
    headers: {
      "Content-Type": "application/json",
    },
    params,
    data,
  };

  const res = await axios(options);
  return res.data;
};
export default reserveAPI;
