import axiosInstance from "./axiosInstance";

export const getFranchises = async () => {
  const res = await axiosInstance.get("/api/franchises");
  return res.data;
};

export const getFranchiseById = async (id) => {
  const res = await axiosInstance.get(`/api/franchises/${id}`);
  return res.data;
};

export const createFranchise = async (data) => {
  const res = await axiosInstance.post("/api/franchises", data);
  return res.data;
};

export const updateFranchise = async (id, data) => {
  const res = await axiosInstance.put(`/api/franchises/${id}`, data);
  return res.data;
};

export const deleteFranchise=async(id)=>{
  const res=await axiosInstance.delete(`/api/franchises/${id}`);
  return res.data;
}
