import axios from "axios";
import axiosClient from "../../utils/axiosClient";
import { END_POINT } from "../endpoint";

export const getUsers = () => {
  return axiosClient.get(END_POINT.USERS);
};

export const getLatestUsers = () => {
  return axiosClient.get(END_POINT.LATESTTUSERS);
};

export const resetUserPassword = () => {
  return axios.post(END_POINT);
};
