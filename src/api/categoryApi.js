import axiosInstance from "./axiosInstance";

/* ===================== GET ALL ===================== */
export const getCategories = async () => {
  const response = await axiosInstance.get("/categories");
  return response.data;
};

/* ===================== CREATE ===================== */
export const createCategory = async (data) => {
  const response = await axiosInstance.post("/categories", data);
  return response.data;
};

/* ===================== GET BY ID (EDIT PREFILL) ===================== */
export const getCategoryById = async (id) => {
  const response = await axiosInstance.get(`/categories/${id}`);
  return response.data;
};

/* ===================== UPDATE ===================== */
export const updateCategory = async (id, data) => {
  const response = await axiosInstance.put(`/categories/${id}`, data);
  return response.data;
};
