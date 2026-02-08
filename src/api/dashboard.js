import axiosInstance from "./axiosInstance";

export const getDashboardStats = async () => {
  const res = await axiosInstance.get("/api/dashboard/stats");
  return res.data;
};

export const getDashboardProducts = async () => {
  const res = await axiosInstance.get("/api/dashboard/products");
  return res.data;
};
