import axiosInstance from "./axiosInstance";

export const getFranchises = async () => {
  const res = await axiosInstance.get("/franchises");
  return res.data;
};

export const getFranchiseById = async (id) => {
  const res = await axiosInstance.get(`/franchises/${id}`);
  return res.data;
};

export const createFranchise = async (data) => {
  const res = await axiosInstance.post("/franchises", data);
  return res.data;
};

export const updateFranchise = async (id, data) => {
  const res = await axiosInstance.put(`/franchises/${id}`, data);
  return res.data;
};

export const deleteFranchise=async(id)=>{
  const res=await axiosInstance.delete(`/franchises/${id}`);
  return res.data;
}
