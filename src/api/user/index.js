import axiosClient from "../../utils/axiosClient";
import { END_POINT } from "../endpoint";

export const getUsers = () => {
  return axiosClient.get(END_POINT.USERS);
};

export const getLastUsers = () => {
  return axiosClient.get(END_POINT.LASTUSERS);
};
