import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const  {value}  = event.target;
    if (value === "user") {
      navigate("/login");
    } else if (value === "admin") {
      navigate("/admin");
    }
  };
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <nav className="navbar">
      <div className="nav-container">
        <h1 className="nav-head"> Hospital Management</h1>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/">Services</a></li>
          <li><a href="/doctors">Doctors</a></li>
          <li><a href="/">Appointments</a></li>
          <li><a href="/">Contact</a></li>
          <li><a href="/Signup">Signup</a></li>
          {localStorage.getItem("role")==="user"?<li><a href="/userdashboard">My Account</a></li>:(null)}
          {localStorage.getItem("role")==="admin"?<li><a href="/adminDashboard">Admin</a></li>:(null)}
        </ul>
        <div className="login-dropdown">
          <select className="login-select" onChange={handleLogin}>
            <option value="">Login</option>
            <option value="user">Login as User</option>
            <option value="admin">Login as Admin</option>
          </select>
        </div>
      </div>
    </nav>
      <h1>Welcome to Hospital Management</h1>
    </div>
  );
};

export default HomePage