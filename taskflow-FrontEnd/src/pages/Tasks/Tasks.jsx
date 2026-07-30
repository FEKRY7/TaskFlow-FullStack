import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { getProjects } from "../../services/project";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  filterTasks,
} from "../../services/task";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    status: "",
    priority: "",
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load projects");
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = async () => {
    try {
      const response = await filterTasks(filters);
      setTasks(response.data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to filter tasks");
    }
  };

  const resetFilters = () => {
    setFilters({
      status: "",
      priority: "",
    });

    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
    fetchProjects();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (editingTask) {
        await updateTask(editingTask.id, data);
        toast.success("Task updated successfully");
      } else {
        await createTask(data);
        toast.success("Task created successfully");
      }

      reset();
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Operation failed"
      );
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);

    reset({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      dueDate: task.dueDate?.slice(0, 10),
      projectId: task.project.id,
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmDelete) return;

    try {
      const response = await deleteTask(id);

      toast.success(response.data.message);

      if (editingTask?.id === id) {
        setEditingTask(null);
        reset();
      }

      fetchTasks();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete task"
      );
    }
  };

  if (loading) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Tasks</h2>

      {/* Filter */}
      <div className="card shadow p-3 mb-4">
        <div className="row">

          <div className="col-md-4">
            <select
              className="form-select"
              value={filters.status}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  status: e.target.value,
                })
              }
            >
              <option value="">All Status</option>
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={filters.priority}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  priority: e.target.value,
                })
              }
            >
              <option value="">All Priority</option>
              <option value="LOW">LOW</option>
              <option value="MEDIUM">MEDIUM</option>
              <option value="HIGH">HIGH</option>
            </select>
          </div>

          <div className="col-md-4">
            <button
              className="btn btn-primary me-2"
              onClick={handleFilter}
            >
              Filter
            </button>

            <button
              className="btn btn-secondary"
              onClick={resetFilters}
            >
              Reset
            </button>
          </div>

        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="card shadow p-4 mb-4"
      >
        <div className="mb-3">
          <label className="form-label">Title</label>

          <input
            type="text"
            className="form-control"
            placeholder="Enter task title"
            {...register("title", {
              required: "Title is required",
            })}
          />

          {errors.title && (
            <small className="text-danger">
              {errors.title.message}
            </small>
          )}
        </div>

        <div className="mb-3">
          <label className="form-label">Description</label>

          <textarea
            rows="3"
            className="form-control"
            placeholder="Task description"
            {...register("description")}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Status</label>

          <select
            className="form-select"
            {...register("status", {
              required: true,
            })}
          >
            <option value="TODO">TODO</option>
            <option value="IN_PROGRESS">IN PROGRESS</option>
            <option value="DONE">DONE</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Priority</label>

          <select
            className="form-select"
            {...register("priority", {
              required: true,
            })}
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Due Date</label>

          <input
            type="date"
            className="form-control"
            {...register("dueDate", {
              required: true,
            })}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Project</label>

          <select
            className="form-select"
            {...register("projectId", {
              required: true,
            })}
          >
            <option value="">Select Project</option>

            {projects.map((project) => (
              <option
                key={project.id}
                value={project.id}
              >
                {project.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <button className="btn btn-primary">
            {editingTask
              ? "Update Task"
              : "Create Task"}
          </button>

          {editingTask && (
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setEditingTask(null);
                reset();
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
            {/* Tasks List */}
      {tasks.length === 0 ? (
        <div className="alert alert-info">
          No Tasks Found
        </div>
      ) : (
tasks.map((task) => (
  <div
    key={task.id}
    className="card shadow-sm mb-3"
  >
    <div className="card-body">
      <h4 className="card-title">{task.title}</h4>

      <p className="text-muted">
        {task.description || "No Description"}
      </p>

      <hr />

      <p>
        <strong>Status:</strong>{" "}
        <span
          className={`badge ${
            task.status === "DONE"
              ? "bg-success"
              : task.status === "IN_PROGRESS"
              ? "bg-primary"
              : "bg-warning text-dark"
          }`}
        >
          {task.status}
        </span>
      </p>

      <p>
        <strong>Priority:</strong>{" "}
        <span
          className={`badge ${
            task.priority === "HIGH"
              ? "bg-danger"
              : task.priority === "MEDIUM"
              ? "bg-warning text-dark"
              : "bg-secondary"
          }`}
        >
          {task.priority}
        </span>
      </p>

      <p>
        <strong>Due Date:</strong>{" "}
        {new Date(task.dueDate).toLocaleDateString()}
      </p>

      <p>
        <strong>Project:</strong>{" "}
        {task.project?.name}
      </p>

      <p>
        <strong>Creator:</strong>{" "}
        {task.creator?.userName}
      </p>

      <p>
        <strong>Assignee:</strong>{" "}
        {task.assignee?.userName || "Unassigned"}
      </p>

      <div className="d-flex gap-2 mt-3">
        <button
          type="button"
          className="btn btn-warning"
          onClick={() => handleEdit(task)}
        >
          Edit
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={() => handleDelete(task.id)}
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

export default Tasks;