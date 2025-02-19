/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import AppointmentDetails from "./AppointmentDetails";
import { deleteAppointment } from "../Redux/appointmentslice";

const mockStore = configureStore();
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("AppointmentDetails Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      appointment: {
        appointments: [
          {
            doctor_id: 1,
            patient_id: 123,
            status: "Confirmed",
            appointment_date: "2025-02-20",
            scheduled_time: "10:00 AM",
          },
        ],
      },
    });
    store.dispatch = jest.fn();
  });

  it("renders the component correctly", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AppointmentDetails />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Appointment Details")).toBeInTheDocument();
  });

  it("shows 'No appointments booked' when the list is empty", () => {
    store = mockStore({
      appointment: { appointments: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AppointmentDetails />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("No appointments booked.")).toBeInTheDocument();
  });

  it("displays appointment details when appointments exist", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AppointmentDetails />
        </MemoryRouter>
      </Provider>
    );
   
    expect(screen.getByText("Doctor ID:")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Patient ID:")).toBeInTheDocument();
    expect(screen.getByText("123")).toBeInTheDocument();
    expect(screen.getByText("Status:")).toBeInTheDocument();
    expect(screen.getByText("Confirmed")).toBeInTheDocument();
    expect(screen.getByText("Date:")).toBeInTheDocument();
    expect(screen.getByText("2025-02-20")).toBeInTheDocument();
    expect(screen.getByText("Time:")).toBeInTheDocument();
    expect(screen.getByText("10:00 AM")).toBeInTheDocument();
  });

  it("dispatches deleteAppointment action when 'Cancel Appointment' is clicked", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AppointmentDetails />
        </MemoryRouter>
      </Provider>
    );

    const cancelButton = screen.getByText("Cancel Appointment");
    fireEvent.click(cancelButton);

    expect(store.dispatch).toHaveBeenCalledWith(
      deleteAppointment({ scheduled_time: "10:00 AM" })
    );
  });

  it("navigates to /payment when 'Proceed to pay' is clicked", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <AppointmentDetails />
        </MemoryRouter>
      </Provider>
    );

    const proceedButton = screen.getByText("Proceed to pay");
    fireEvent.click(proceedButton);

    expect(mockNavigate).toHaveBeenCalledWith("/payment");
  });
});



