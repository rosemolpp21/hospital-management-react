import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/UserDashboard.css";
import { useNavigate } from "react-router-dom";


const UserDashboard: React.FC = () => {
  const [userData, setUserData] = useState<{ first_name: string; last_name: string; email: string; phone_no: number; gender: string; age: number; address: string } | null>(null);
  const [appointmentData, setAppointmentData] = useState<{patient_id:number;docter_id:number;status:string;appointment_date:Date}|null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      setErrorMessage("No token found. Please login.");
      return;
    }
    axios.get("http://localhost:8080/users/viewdetails", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    .then((res) => {
        setUserData(res.data);
        setSuccessMessage("You are logged in successfully");
        setErrorMessage(" ")
      })
      .catch((err) => {
        if (err.response) {
          if (err.response.data) {
            setErrorMessage(err.response.data.message);
            setSuccessMessage(" ")
          }
          else {
            setErrorMessage('an error happend');
            setSuccessMessage(" ")
          }

        } else {
          setErrorMessage("Error in getting details");
        }
      });
    axios.get("http://localhost:8080/viewuserappointmentDetails",{headers: {
      Authorization: `Bearer ${token}`,
    }})
    .then((res)=>{
      setAppointmentData(res.data);
    })
    .catch((err)=>{
      if(err.response){
        setErrorMessage('an error happend');
      }
    })
  }, [token]);
  const navigate = useNavigate();
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role")
    navigate("/login");
  }
  function bookappointment() {
    navigate("/bookappointment")
  };
  return (
    <div id="user-dashboard">
      <h1 id="dashboard-head">User Dashboard</h1>
      {successMessage && <h2 className="success-message">you are logged in</h2>}
      {errorMessage && <h2 className="error-message">{errorMessage}</h2>}

      {userData ? (
        <div id="user-info">
          <h3 className="user-name">
            Welcome, {userData.first_name} {userData.last_name}!
          </h3>
          <p className="user-details">Email: {userData.email}</p>
          <p className="user-details">Phone: {userData.phone_no}</p>
          <p className="user-details">Gender: {userData.gender}</p>
          <p className="user-details">Age: {userData.age} </p>
          <p className="user-details">Address: {userData.address}</p>
        </div>
      ) : (
        <p id="loading-message">login to view your details</p>
      )}
      <h3 id="appointment-head">Appointment details</h3>
      {appointmentData ? (
        <div id="appointment-info">
          <p className="appointment-details">Patient ID: {appointmentData.patient_id}</p>
          <p className="appointment-details">Doctor ID: {appointmentData.docter_id}</p>
          <p className="appointment-details">Status: {appointmentData.status}</p>
          <p className="appointment-details">Appointment Date: {appointmentData.appointment_date.toString()}</p>
        </div>
      ) : (
        <div>You don&apos;t have any appointments</div>
      )}
      <div><button type="submit" id="book-appointment" onClick={bookappointment}>Book appointment</button>
        <button type="submit" id="dash-logout" onClick={logout}>logout</button></div>
    </div>


  );
};

export default UserDashboard;



