import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "./Card";
import "../styles/doctor_list.css";

interface Doctor {
  doctor_id: number;
  name: string;
  email: string;
  phone: string;
}
const DoctorsList: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [error,setError]=useState("");
  const navigate = useNavigate();
  function handlesubmit(doctor: Doctor){
    navigate(`/doctors/${doctor.doctor_id}`)
  }
  useEffect(() => {
    axios
      .get("http://localhost:8080/doctors")
      .then((res) => {
        if (res.status === 200) {
          setDoctors(res.data);
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  return (
    <div className="doctor-list-container">
      <h1 id="doctor-team-mainheading">Our Dedicated Doctors Team</h1>
      <div className="doctor-list">
        {doctors?doctors.map((doctor) => (
          <div key={doctor.doctor_id} className="doctor-card">
            <Card name={doctor.name} email={doctor.email} phone={doctor.phone} image={`/assets/doctor_image/doctor-${doctor.doctor_id}.png`}/>
            <button className="doctor-details-button" type="button" onClick={() => handlesubmit(doctor)}> Discover </button>
          </div>)):<p>{error}</p>}
      </div>
    </div>
  );
};

export default DoctorsList;
