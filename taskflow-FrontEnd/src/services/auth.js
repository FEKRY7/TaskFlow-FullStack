import api from "./api";

export const login = (data) => {
  return api.post("/api/users/auth/login", data);
};

export const register = (data) => {
  return api.post("/api/users/auth/signup", data);
};

export const getCurrentUser = () => {
  return api.get("/api/users/current-user");
};