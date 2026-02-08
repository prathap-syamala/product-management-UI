import axiosInstance from "./axiosInstance";


export const login = async (loginData) => {
  const response = await axiosInstance.post("/api/auth/login", loginData);
  return response.data;
};
