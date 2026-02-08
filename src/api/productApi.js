import axiosInstance from "./axiosInstance";

export const getProducts = async () => {
  const response = await axiosInstance.get("/api/products");
  return response.data;
};

export const addProduct = async (data) => {
  const response = await axiosInstance.post("/api/products", data);
  return response.data;
};

export const updateProduct = async (id, data) => {
  const response = await axiosInstance.put(`/api/products/${id}`, data);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axiosInstance.delete(`/api/products/${id}`);
  return response.data;
};

export const getProductById = async(id)=>{
  const response = await axiosInstance.get(`/api/products/${id}`);
  return response.data;
}
