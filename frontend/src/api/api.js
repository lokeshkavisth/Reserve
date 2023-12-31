import axios from "axios";

const reserveAPI = async ({ method, route, params, data }) => {
  const BASE_URL = import.meta.env.BASE_URL;
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
