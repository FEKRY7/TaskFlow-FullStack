import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { login } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const { fetchCurrentUser } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

const navigate = useNavigate();

  const onSubmit = async (data) => {
  try {
    const response = await login(data);

    localStorage.setItem("token", response.data.token);

    await fetchCurrentUser();

    toast.success(response.data.message);

    navigate("/dashboard");
  } catch (error) {
    toast.error(error.response?.data?.message || "Login failed");
  }
};

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-3">
            <label className="form-label">Email</label>

            <input
              type="email"
              className="form-control"
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <small className="text-danger">
                {errors.email.message}
              </small>
            )}
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>

            <input
              type="password"
              className="form-control"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 5,
                  message: "Minimum length is 5 characters",
                },
              })}
            />

            {errors.password && (
              <small className="text-danger">
                {errors.password.message}
              </small>
            )}
          </div>

          <button
  type="submit"
  className="btn btn-primary w-100"
  disabled={isSubmitting}
>
  {isSubmitting ? "Logging in..." : "Login"}
</button>

        </form>
      </div>
    </div>
  );
}

export default Login;   