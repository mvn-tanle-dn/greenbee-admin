import axiosClient from "../../utils/axiosClient";
import { END_POINT } from "../endpoint";

export const getBlogs = () => {
  return axiosClient.get(END_POINT.BLOGS);
};

export const deleteBlog = (payload) => {
  return axiosClient.delete(`${END_POINT.BLOGS}/${payload}`);
};

export const updateBlog = (payload) => {
  return axiosClient.put();
};
