import axiosClient from "../../utils/axiosClient";
import { END_POINT } from "../endpoint";

export const getTransactions = () => {
  return axiosClient.get(END_POINT.ORDERS);
};

export const getLatestTransactions = () => {
  return axiosClient.get(END_POINT.LATESTORDERS);
};
