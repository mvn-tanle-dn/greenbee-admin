import axiosClient from "../../utils/axiosClient";
import { END_POINT } from "../endpoint";

export const getProducts = () => {
  return axiosClient.get(END_POINT.PRODUCTS);
};
