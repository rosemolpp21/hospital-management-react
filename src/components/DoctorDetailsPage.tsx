import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../styles/doctor_details.css";

interface Doctor {
  doctor_id: number;
  name: string;
  email: string;
  phone: number;
  image: string; 
  speciality: string;
  timing: string;
}

const DoctorDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor>();
  const token=localStorage.getItem("token");
  const k=token?"/Bookappointment":"/login";
  useEffect(() => {
    axios
      .get(`http://localhost:8080/doctors/${id}`)
      .then((res) => {
        if (res.status === 200) {
          setDoctor(res.data[0]);
        }
      })
      .catch((err) => {
        setDoctor(err);
      });
  }, [id]);

  if (!doctor) {
    return <p>error in loading data</p>; 
  }

  return (
    <div id="doctor_detail_container">
      <h1 id="doctor-details-heading">{doctor.name}</h1>
      <div id="img-pargraph-doctor-container">
      <img id="doctor-detail-image" src={`/assets/doctor_image/doctor-${doctor.doctor_id}.png`} alt={doctor.name} />
      <div>
      <p className="doctor-details-paragraph"><strong>Email:</strong> {doctor.email}</p>
      <p className="doctor-details-paragraph"><strong>Phone:</strong> {doctor.phone}</p>
      <p className="doctor-details-paragraph"><strong>Speciality:</strong> {doctor.speciality}</p>
      <p className="doctor-details-paragraph"><strong>Timing:</strong> {doctor.timing}</p>
      <button type="button" id="doctor-details-bookappointment"><a href={k}>Book Appointment</a></button>
      </div>
      </div>
    </div>
  );
};
export default DoctorDetails;


