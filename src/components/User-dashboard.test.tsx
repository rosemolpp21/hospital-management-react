import React from "react";
import { render, screen, waitFor} from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { BrowserRouter} from "react-router-dom";
import UserDashboard from "./User-dashboard";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("UserDashboard Component", () => {
  const mockUserData = {
    first_name: "John",
    last_name: "Peter",
    email: "johm.peter@example.com",
    phone_no: 9234567890,
    gender: "Male",
    age: 22,
    address: "Thrissur",
  };

  const mockAppointmentData = {
    patient_id: 101,
    docter_id: 202,
    status: "Confirmed",
    appointment_date: new Date("2024-06-15"),
  };

  beforeEach(() => {
    localStorage.setItem("token", "mocked-token");
  });

  afterEach(() => {
    localStorage.clear();
  });

  test("displays user details", async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: mockUserData })
      .mockResolvedValueOnce({ data: mockAppointmentData });
    render(
      <BrowserRouter>
        <UserDashboard />
      </BrowserRouter>
    );
    expect(screen.getByText(/User Dashboard/i)).toBeInTheDocument();
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(2));
    expect(screen.getByText("Welcome, John Peter!")).toBeInTheDocument();
    expect(screen.getByText("Email: johm.peter@example.com")).toBeInTheDocument();
    expect(screen.getByText("Phone: 9234567890")).toBeInTheDocument();
    expect(screen.getByText("Gender: Male")).toBeInTheDocument();
    expect(screen.getByText("Age: 22")).toBeInTheDocument();
    expect(screen.getByText("Address: Thrissur")).toBeInTheDocument();
    expect(screen.getByText("Patient ID: 101")).toBeInTheDocument();
    expect(screen.getByText("Doctor ID: 202")).toBeInTheDocument();
    expect(screen.getByText("Status: Confirmed")).toBeInTheDocument();
    expect(screen.getByText("Appointment Date: Sat Jun 15 2024 05:30:00 GMT+0530 (India Standard Time)")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Book appointment/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /logout/i })).toBeInTheDocument();
  
  });

  test("displays appointment details if available", async () => {
    mockedAxios.get
      .mockResolvedValueOnce({ data: mockUserData })
      .mockResolvedValueOnce({ data: mockAppointmentData });

    render(
      <BrowserRouter>
        <UserDashboard />
      </BrowserRouter>
    );

    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(4));

    expect(screen.getByText("Patient ID: 101")).toBeInTheDocument();
    expect(screen.getByText("Doctor ID: 202")).toBeInTheDocument();
    expect(screen.getByText("Status: Confirmed")).toBeInTheDocument();
    expect(screen.getByText("Appointment Date: Sat Jun 15 2024 05:30:00 GMT+0530 (India Standard Time)")).toBeInTheDocument();
  });
});











