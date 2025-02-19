import appointmentReducer, { addAppointment, deleteAppointment } from "./appointmentslice";

describe("appointmentSlice", () => {
  const mockAppointment = {
    patient_id: "P001",
    doctor_id: "D001",
    status: "Scheduled",
    appointment_date: "2025-02-20",
    scheduled_time: "10:00 AM",
  };

  test("should return the initial state", () => {
    expect(appointmentReducer(undefined, { type: '' })).toEqual({
      appointments: [],
    });
  });

  test("should add an appointment", () => {
    const newState = appointmentReducer(
      { appointments: [] },
      addAppointment(mockAppointment)
    );
    expect(newState.appointments).toHaveLength(1);
    expect(newState.appointments[0]).toEqual(mockAppointment);
  });

  test("should delete an appointment by scheduled_time", () => {
    const initialState = { appointments: [mockAppointment] };
    const newState = appointmentReducer(
      initialState,
      deleteAppointment({ scheduled_time: "10:00 AM" })
    );
    expect(newState.appointments).toHaveLength(0);
  });

  test("should not delete if scheduled_time does not match", () => {
    const initialState = { appointments: [mockAppointment] };
    const newState = appointmentReducer(
      initialState,
      deleteAppointment({ scheduled_time: "11:00 AM" })
    );
    expect(newState.appointments).toHaveLength(1);
  });
});
