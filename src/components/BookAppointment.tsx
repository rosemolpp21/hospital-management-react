import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addAppointment } from "../Redux/appointmentslice";
import { AppDispatch } from "../Redux/store";
import axiosfetch from "../axios/axios_interceptor";
import "../styles/bookappointment.css"

const BookAppointment: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patient_id: localStorage.getItem("patient_id") ?? "",
    doctor_id: "",
    status: "",
    appointment_date: "",
    scheduled_time: "",
  });

  const [doctors, setDoctors] = useState<{ doctor_id: number; name: string }[]>([]);
  const [errormsg,setError]=useState("");

  useEffect(() => {
    axiosfetch.get("/doctors")
      .then((res) => res.status === 200 && setDoctors(res.data))
      .catch((err) => setError(err.message || "An error occurred"));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosfetch.post("/bookappointment", formData);
      dispatch(addAppointment(formData));
      navigate("/Appointmentdetails");
    } catch (error: unknown) {
      navigate("/")
    }
  };

  return (
    <div id="bookappointment-cont">
      {errormsg?null:<h2>Book an Appointment</h2>}
      <form onSubmit={handleSubmit}>
        <select name="doctor_id" onChange={handleChange} required>
          <option value="">Select Doctor</option>
          {doctors.map((doc) => (
            <option key={doc.doctor_id} value={doc.doctor_id}>{doc.name}</option>
          ))}
        </select>
        <input type="text" name="status" placeholder="Status" onChange={handleChange} required />
        <input type="date" data-testid="appointment-date" name="appointment_date" onChange={handleChange} required />
        <input type="time" data-testid="scheduled-time" name="scheduled_time" onChange={handleChange} required />
        <button type="submit">Book Appointment</button>
        
      </form>
      {errormsg && <p>Error: {errormsg.toString()}</p>}
    </div>
  );
};

export default BookAppointment;


