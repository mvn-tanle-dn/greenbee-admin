import axiosClient from "../../utils/axiosClient";
import { END_POINT } from "../endpoint";

export const login = (payload) => {
  return axiosClient.post(END_POINT.LOGIN, payload);
};

export const logout = () => {
  return axiosClient.get(END_POINT.LOGOUT);
};

export const signup = (payload) => {
  return axiosClient.post(END_POINT.SIGN_UP, payload);
};
