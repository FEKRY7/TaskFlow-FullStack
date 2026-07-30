import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  addMember,
  removeMember,
} from "../../services/project";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [memberId, setMemberId] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      if (editingProject) {
        await updateProject(editingProject.id, data);
        toast.success("Project updated successfully");
      } else {
        await createProject(data);
        toast.success("Project created successfully");
      }

      reset({
        name: "",
        description: "",
      });

      setEditingProject(null);
      fetchProjects();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Operation failed"
      );
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);

    reset({
      name: project.name,
      description: project.description || "",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteProject(id);

      toast.success(response.data.message);

      if (editingProject?.id === id) {
        setEditingProject(null);
        reset();
      }

      fetchProjects();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to delete project"
      );
    }
  };

  const handleRemoveMember = async (
    projectId,
    memberId
  ) => {
    const confirmRemove = window.confirm(
      "Are you sure you want to remove this member?"
    );

    if (!confirmRemove) return;

    try {
      const response = await removeMember(
        projectId,
        memberId
      );

      toast.success(
        response.data.message ||
          "Member removed successfully"
      );

      fetchProjects();
    } catch (error) {
  console.log("FULL ERROR:", error);
  console.log("RESPONSE:", error.response);
  console.log("DATA:", error.response?.data);

  toast.error(
    error.response?.data?.message ||
    "Failed to remove member"
  );
}
  };

  const handleAddMember = async (projectId) => {
  if (!memberId) {
    toast.error("Enter Member ID");
    return;
  }

  try {
    const response = await addMember(projectId, memberId);

    toast.success(
      response.data.message || "Member added successfully"
    );

    setMemberId("");
    fetchProjects();
  } catch (error) {
    toast.error(
      error.response?.data?.message ||
        "Failed to add member"
    );
  }
};

  if (loading) {
    return (
      <h3 className="text-center mt-5">
        Loading...
      </h3>
    );
  }
    return (
    <div className="container mt-4">
      <h2 className="mb-4">Projects</h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card shadow p-4 mb-4"
      >
        <div className="mb-3">
          <label className="form-label">
            Project Name
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter project name"
            {...register("name", {
              required: "Project name is required",
            })}
          />

          {errors.name && (
            <small className="text-danger">
              {errors.name.message}
            </small>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">
            Description
          </label>

          <textarea
            className="form-control"
            rows="4"
            placeholder="Enter project description"
            {...register("description")}
          />
        </div>

        <div>
          <button className="btn btn-primary">
            {editingProject
              ? "Update Project"
              : "Create Project"}
          </button>

          {editingProject && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setEditingProject(null);
                reset();
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="alert alert-info">
          No Projects Found
        </div>
      ) : (
        projects.map((project) => (
          <div
            key={project.id}
            className="card mb-3 shadow-sm"
          >
            <div className="card-body">
              <h4>{project.name}</h4>

              <p>
                {project.description ||
                  "No Description"}
              </p>

              <hr />

              <p>
  <strong>Owner:</strong>{" "}
  {project.owner?.userName} ({project.owner?.id})
</p>

<hr />

<h6>Add Member</h6>

<div className="d-flex mb-3">
  <input
    type="number"
    className="form-control me-2"
    placeholder="Member ID"
    value={memberId}
    onChange={(e) =>
      setMemberId(e.target.value)
    }
  />

  <button
    type="button"
    className="btn btn-success"
    onClick={() =>
      handleAddMember(project.id)
    }
  >
    Add
  </button>
</div>
              <hr />

              <h6>Members</h6>

              {project.members?.length ? (
  project.members.map((member) => (
    <div
      key={member.id}
      className="d-flex justify-content-between align-items-center border rounded p-2 mb-2"
    >
      <span>
        {member.userName}
        {member.id === project.owner?.id && " (Owner)"}
      </span>

      {member.id !== project.owner?.id && (
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() =>
            handleRemoveMember(
              project.id,
              member.id
            )
          }
        >
          Remove
        </button>
      )}
    </div>
  ))
) : (
                <p className="text-muted">
                  No Members
                </p>
              )}

              <div className="mt-3">
                <button
                  type="button"
                  className="btn btn-warning me-2"
                  onClick={() =>
                    handleEdit(project)
                  }
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() =>
                    handleDelete(project.id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Projects;