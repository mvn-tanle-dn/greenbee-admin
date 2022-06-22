import axiosClient from "../../utils/axiosClient";
import { END_POINT } from "../endpoint";

export const getProducts = () => {
  return axiosClient.get(END_POINT.PRODUCTS);
};

export const deleteProduct = (payload) => {
  return axiosClient.delete(`${END_POINT.PRODUCTS}/${payload}`);
};

export const updateProduct = (payload) => {
  return axiosClient.put();
};
