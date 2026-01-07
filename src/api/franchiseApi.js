import axiosInstance from "./axiosInstance";

export const getFranchises = async () => {
  const res = await axiosInstance.get("/franchises");
  return res.data;
};

export const createFranchise = async (data) => {
  const res = await axiosInstance.post("/franchises", data);
  return res.data;
};
