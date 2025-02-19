import React from "react";
import "../styles/UserDashboard.css";
import Logout from "./Logout";

const AdminDashboard: React.FC = () => (
  <div className="admin-dashboard">
    <h2 id="admin-dashboard">Hello, welcome Admin</h2>
    <Logout/>
  </div>
);

export default AdminDashboard;
