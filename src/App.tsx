import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Signup";
import HomePage from "./components/Homepage";
import Loginadmin from "./components/loginadmin";
import UserDashboard from "./components/User-dashboard";
import AdminDahboard from "./components/Admin-dashboard";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Loginadmin/>}/>
      <Route path="/userDashBoard" element={<UserDashboard />}/>
      <Route path="/adminDashboard" element={<AdminDahboard />} />
      <Route path="/Signup" element={<Register />} />
    </Routes>
  </BrowserRouter>
);

export default App;

