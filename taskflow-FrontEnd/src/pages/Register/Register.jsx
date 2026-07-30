import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { register as registerUser } from "../../services/auth";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await registerUser(data);

      toast.success(response.data.message);

      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ width: "430px" }}>
        <h2 className="text-center mb-4">Create Account</h2>

        <form onSubmit={handleSubmit(onSubmit)}>

          <div className="mb-3">
            <label className="form-label">User Name</label>

            <input
              className="form-control"
              {...register("userName", {
                required: "User name is required",
                maxLength: {
                  value: 100,
                  message: "Maximum length is 100 characters",
                },
              })}
            />

            {errors.userName && (
              <small className="text-danger">
                {errors.userName.message}
              </small>
            )}
          </div>

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
            className="btn btn-success w-100"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Register"}
          </button>

          <p className="text-center mt-3 mb-0">
            Already have an account?{" "}
            <Link to="/">Login</Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Register;