import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Signup";
import HomePage from "./components/Homepage";
import Loginadmin from "./components/loginadmin";
import UserDashboard from "./components/User-dashboard";
import AdminDahboard from "./components/Admin-dashboard";
import Doctors from "./components/Doctor_list";
import DoctorDetails from "./components/DoctorDetailsPage";

const App: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Loginadmin/>}/>
      <Route path="/userDashBoard" element={<UserDashboard />}/>
      <Route path="/adminDashboard" element={<AdminDahboard />} />
      <Route path="/Signup" element={<Register />} />
      <Route path="/doctors" element={<Doctors/>}/>
      <Route path="/doctors/:id" element={<DoctorDetails/>}/>
    </Routes>
  </ BrowserRouter>
);

export default App;

