import api from "./api";

export const getProjects = () => {
  return api.get("/api/projects");
};

export const createProject = (data) => {
  return api.post("/api/projects", data);
};

export const updateProject = (id, data) => {
  return api.patch(`/api/projects/${id}`, data);
};

export const deleteProject = (id) => {
  return api.delete(`/api/projects/${id}`);
};

export const removeMember = (projectId, memberId) => {
  return api.delete(
    `/api/projects/${projectId}/members/${memberId}`
  );
};

export const addMember = (projectId, memberId) => {
  return api.post(`/api/projects/${projectId}/members/${memberId}`);
};