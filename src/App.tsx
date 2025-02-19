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
import Specialities from "./components/Speciality";
import BookAppointment from "./components/BookAppointment";
import Wrapcomponent from "./hoc/withauth";
import AppointmentDetails from "./components/AppointmentDetails";


const App: React.FC = () => {
  const AuthDashboard = Wrapcomponent(UserDashboard);
  const AuthAppointmentdetails=Wrapcomponent(AppointmentDetails);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Loginadmin/>}/>
        <Route path="/userDashBoard" element={<AuthDashboard />}/>
        <Route path="/adminDashboard" element={<AdminDahboard />} />
        <Route path="/Signup" element={<Register />} />
        <Route path="/doctors" element={<Doctors/>}/>
        <Route path="/doctors/:id" element={<DoctorDetails/>}/>
        <Route path="/Specialities" element={<Specialities/>}/>
        <Route path="/Bookappointment" element={<BookAppointment/>}/>
        <Route path="/Appointmentdetails" element={<AuthAppointmentdetails />} />
        <Route path="*" element={<h1 style={{color: "blue"}}>content not found</h1>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

