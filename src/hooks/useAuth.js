import { useAuthContext } from "../context/AuthContext";

const useAuth = () => {
  const { token, role, username, login, logout } = useAuthContext();

  const isAuthenticated = !!token;
  const isAdmin = role === "Admin";

  return {
    token,
    role,
    username,
    isAuthenticated,
    isAdmin,
    login,
    logout
  };
};

export default useAuth;
