import axios from "axios";
import queryString from "query-string";

import { getLocalStorage, KEY_LOCAL_STORAGE } from "./storage";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  // paramsSerializer: (params) => queryString.stringify(params),
  timeout: 30000,
});

axiosClient.interceptors.request.use((config) => {
  config.headers["Content-Type"] = "application/json";

  if (getLocalStorage(KEY_LOCAL_STORAGE.ACCESS_TOKEN)) {
    config.headers["Authorization"] = `Bearer ${getLocalStorage(
      KEY_LOCAL_STORAGE.ACCESS_TOKEN
    )}`;
  }

  return config;
});

axios.interceptors.response.use(
  async (response) => {
    if (response && response.data) {
      return response.data;
    }
  },
  (error) => {
    throw error;
  }
);

export default axiosClient;
