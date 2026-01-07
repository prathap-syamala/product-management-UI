import axiosInstance from "./axiosInstance";

export const getDashboardStats = async () => {
  const res = await axiosInstance.get("/dashboard/stats");
  return res.data;
};

export const getDashboardProducts = async () => {
  const res = await axiosInstance.get("/dashboard/products");
  return res.data;
};
