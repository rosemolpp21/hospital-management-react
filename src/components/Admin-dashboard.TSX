import React from "react";
import "../styles/UserDashboard.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  }

  return (
    <div className="admin-dashboard">
      <h2 id="admin-dashboard">Hello, welcome Admin</h2>
      <button type="button" onClick={logout} name="Logout">
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;
