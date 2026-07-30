import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4">

        <h2>Welcome 👋</h2>

        <hr />

        <h5>Name</h5>
        <p>{user?.userName}</p>

        <h5>Email</h5>
        <p>{user?.email}</p>

        <h5>Role</h5>
        <p>{user?.role}</p>

        <button
          className="btn btn-danger mt-3"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Dashboard;