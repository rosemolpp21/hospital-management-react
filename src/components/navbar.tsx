import React from "react";
import { useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const token=localStorage.getItem("token");
  const handleLogin = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    if (value === "user") {
      navigate("/login");
    } else if (value === "admin") {
      navigate("/admin");
    }
  };
  return (
    
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="nav-head"> Hospital Management</h1>
        <ul className="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/Specialities">Specialities</a></li>
          <li><a href="/doctors">Doctors</a></li>
          <li><a href="/Appointmentdetails">Appointments</a></li>
          <li><a href="/">Contact</a></li>
          {!token?<li><a href="/Signup">Signup</a></li>:(null)}
          {localStorage.getItem("role")==="user"?<li><a href="/userdashboard">My Account</a></li>:(null)}
          {localStorage.getItem("role")==="admin"?<li><a href="/adminDashboard">Admin</a></li>:(null)}
        </ul>
        {!token ?<div className="login-dropdown">
          <select className="login-select" onChange={handleLogin}>
            <option>Login</option>
            <option value="user">Login as User</option>
            <option value="admin">Login as Admin</option>
          </select>
        </div>:(null) }
      </div>
    </nav>
)}
 export default Navbar;