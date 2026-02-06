import axiosInstance from "./axiosInstance";

export const getSubCategories = async () => {
  const res = await axiosInstance.get("/SubCategories");
  return res.data;
};

export const getSubCategoriesByCategory = async (categoryId) => {
  const res = await axiosInstance.get(
    `/SubCategories/by-category/${categoryId}`
  );
  return res.data;
};

export const createSubCategory = async (data) => {
  const res = await axiosInstance.post("/SubCategories", data);
  return res.data;
};

export const updateSubCategory = async (id, data) => {
  const res = await axiosInstance.put(`/SubCategories/${id}`, data);
  return res.data;
};

export const deleteSubCategory = async (id) => {
  const res = await axiosInstance.delete(`/SubCategories/${id}`);
  return res.data;
};
