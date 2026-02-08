import axiosInstance from "./axiosInstance";

export const getSubCategories = async () => {
  const res = await axiosInstance.get("/api/SubCategories");
  return res.data;
};

export const getSubCategoriesByCategory = async (categoryId) => {
  const res = await axiosInstance.get(
    `/api/SubCategories/by-category/${categoryId}`
  );
  return res.data;
};

export const createSubCategory = async (data) => {
  const res = await axiosInstance.post("/api/SubCategories", data);
  return res.data;
};

export const updateSubCategory = async (id, data) => {
  const res = await axiosInstance.put(`/api/SubCategories/${id}`, data);
  return res.data;
};

export const deleteSubCategory = async (id) => {
  const res = await axiosInstance.delete(`/api/SubCategories/${id}`);
  return res.data;
};
