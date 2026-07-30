import api from "./api";

export const getTasks = () => {
  return api.get("/api/tasks");
};

export const createTask = (data) => {
  return api.post("/api/tasks", data);
};

export const updateTask = (id, data) => {
  return api.patch(`/api/tasks/${id}`, data);
};

export const deleteTask = (id) => {
  return api.delete(`/api/tasks/${id}`);
};

export const filterTasks = (params) => {
  return api.get("/api/tasks/filter", { params });
};