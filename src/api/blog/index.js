import axiosClient from "../../utils/axiosClient";
import { END_POINT } from "../endpoint";

export const getBlogs = () => {
  return axiosClient.get(END_POINT.BLOG);
};

export const deleteBlog = (payload) => {
  return axiosClient.delete(`${END_POINT.BLOG}/${payload}`);
};

export const updateBlog = (payload) => {
  return axiosClient.put();
};
