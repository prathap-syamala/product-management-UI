import axiosInstance from "./axiosInstance";

export const getRoles = async () => {
  const res = await axiosInstance.get("/api/roles");
  return res.data; // List<RoleResponseDto>
};
