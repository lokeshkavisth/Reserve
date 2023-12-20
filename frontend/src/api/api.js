import axios from "axios";

const reserveAPI = async ({ method, route, params, data }) => {
  const url = `http://localhost:5001${route}`;
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
