import React from "react";
import {useNavigate} from "react-router-dom"
import { useSelector,useDispatch } from "react-redux";
import { AppDispatch,RootState } from "../Redux/store";
import { deleteAppointment } from "../Redux/appointmentslice";
import "../styles/appointmentdetails.css";


const AppointmentDetails: React.FC = () => {
  const appointments = useSelector((state: RootState) => state.appointment.appointments);
  const dispatch=useDispatch<AppDispatch>();
  const navigate=useNavigate();
  const handleDelete = (scheduledTime: string) => {
    dispatch(deleteAppointment({ scheduled_time: scheduledTime }));
  };
  const handlesubmit = () => {
    navigate("/payment");
  }
  return (
    <div id="appointment-detail-container">
      <h2 id="appointment-details-heading">Appointment Details</h2>
      <div id="appointment-details-cont">
      {appointments.length === 0 ? (
        <p>No appointments booked.</p>
      ) : (
        <ul>
          {appointments.map((appointment) => (
            <div key={appointment.doctor_id}>
              <p><strong>Doctor ID:</strong> {appointment.doctor_id}</p>
              <p><strong>Patient ID:</strong> {appointment.patient_id}</p>
              <p><strong>Status:</strong> {appointment.status}</p>
              <p><strong>Date:</strong> {appointment.appointment_date}</p>
              <p><strong>Time:</strong> {appointment.scheduled_time}</p>
              <button type="button" id="appointment-cancel-button" onClick={()=>{handleDelete(appointment.scheduled_time)}}>Cancel Appointment</button>
              <button type="button" id="proceed to payment" onClick={handlesubmit}>Proceed to pay</button>
            </div>
          ))}
        </ul>
      )}
      </div>
    </div>
  );
};

export default AppointmentDetails;
