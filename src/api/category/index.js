import axiosClient from "../../utils/axiosClient";
import { END_POINT } from "../endpoint";

export const getCategories = () => {
  return axiosClient.get(END_POINT.CATEGORIES);
};
