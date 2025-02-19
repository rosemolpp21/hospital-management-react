import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Appointment {
  patient_id: string;
  doctor_id: string;
  status: string;
  appointment_date: string;
  scheduled_time: string;
}

interface AppointmentState {
  appointments: Appointment[];
}

const initialState: AppointmentState = {
  appointments: [],
};

const appointmentSlice = createSlice({
  name: "appointment",
  initialState,
  reducers: {
    addAppointment: (state, action: PayloadAction<Appointment>) => {
      state.appointments.push(action.payload);
    },
    deleteAppointment: (state, action: PayloadAction<{ scheduled_time: string }>) => {
      const updatedAppointments = state.appointments.filter(
        (appointment) => appointment.scheduled_time !== action.payload.scheduled_time
      );
      return {
        ...state,
        appointments: updatedAppointments,
      };
    },
  },
});

export const { addAppointment, deleteAppointment } = appointmentSlice.actions;
export default appointmentSlice.reducer;

