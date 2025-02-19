import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import axiosfetch from "../axios/axios_interceptor";
import "../styles/UserDashboard.css";
import Logout from "./Logout";


const UserDashboard: React.FC = () => {
  const [userData, setUserData] = useState<{
    ID:number;
    first_name: string;
    last_name: string;
    email: string;
    phone_no: number;
    gender: string;
    age: number;
    address: string;
  } | null>(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate=useNavigate();
  function handleclick(){
    navigate("/Bookappointment")
  }
  useEffect(() => {
    const fetchData = async () => {
      if (!token) {
        setErrorMessage("No token found. Please login.");
        return;
      }
      try {
        const userResponse = await axiosfetch.get("/users/viewdetails")
        setUserData(userResponse.data);
        localStorage.setItem("patient_id", userResponse.data.ID);
        setSuccessMessage("You are logged in successfully");
        setErrorMessage("");
      } catch (err) {
        if ((axios.isAxiosError && axios.isAxiosError(err)) && err.response) {
          setErrorMessage(err.response.data?.message || "An error occurred");
          setSuccessMessage("");
        } else {
          setErrorMessage("Error in getting details");
        }
      }      
    };
    fetchData();
  }, [token]);
  return (
    <div id="user-dashboard">
      <h1 id="dashboard-head">User Dashboard</h1>
      {successMessage && <h2 className="success-message">You are logged in</h2>}
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
        <p id="loading-message">Login to view your details</p>
      )}

      <h3 id="appointment-head">Appointment Details</h3>
      <div>You don&apos;t have any appointments</div>
      <div>
        <button type="submit" id="book-appointment" onClick={handleclick}>
          Book Appointment
        </button>
        <Logout/>
      </div>
    </div>
  );
};

export default UserDashboard;


