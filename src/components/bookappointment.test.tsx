/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { jest } from "@jest/globals";
import axiosfetch from "../axios/axios_interceptor";
import BookAppointment from "./BookAppointment";
import { addAppointment } from "../Redux/appointmentslice";

jest.mock("../axios/axios_interceptor");

const mockStore = configureStore([]);
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => {
  const actualReactRouter = jest.requireActual("react-router-dom") as object;
  return {
    ...actualReactRouter,
    useNavigate: () => mockNavigate,
  };
});


describe("BookAppointment Component", () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      appointments: [],
    });
    store.dispatch = jest.fn();
  });

  test("renders BookAppointment component correctly", async () => {
    (axiosfetch.get as jest.MockedFunction<typeof axiosfetch.get>).mockResolvedValueOnce({
      status: 200,
      data: [
        { doctor_id: 1, name: "Dr. Smith" },
        { doctor_id: 2, name: "Dr. John" },
      ],
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookAppointment />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Book an Appointment")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText("Dr. Smith")).toBeInTheDocument();
      expect(screen.getByText("Dr. John")).toBeInTheDocument();
    });
  });

  test("fills and submits the form successfully", async () => {
    (axiosfetch.get as jest.MockedFunction<typeof axiosfetch.get>).mockResolvedValueOnce({
      status: 200,
      data: [{ doctor_id: 1, name: "Dr. Smith" }],
    });

    (axiosfetch.post as jest.MockedFunction<typeof axiosfetch.post>).mockResolvedValueOnce({
      status: 200,
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookAppointment />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText("Dr. Smith")).toBeInTheDocument();
    });

    fireEvent.change(screen.getByRole("combobox"), { target: { value: "1" } });
    fireEvent.change(screen.getByPlaceholderText("Status"), { target: { value: "Confirmed" } });
    fireEvent.change(screen.getByTestId("appointment-date"), { target: { value: "2025-02-20" } });
    fireEvent.change(screen.getByTestId("scheduled-time"), { target: { value: "14:30" } });


    fireEvent.click(screen.getByText("Book Appointment"));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(
        addAppointment({
          patient_id: localStorage.getItem("patient_id") || "",
          doctor_id: "1",
          status: "Confirmed",
          appointment_date: "2025-02-20",
          scheduled_time: "14:30",
        })
      );
      expect(mockNavigate).toHaveBeenCalledWith("/Appointmentdetails");
    });
  });

  test("handles API error and redirects to home page", async () => {
    (axiosfetch.get as jest.MockedFunction<typeof axiosfetch.get>).mockRejectedValueOnce(new Error("Failed to fetch doctors"));
    (axiosfetch.post as jest.MockedFunction<typeof axiosfetch.post>).mockRejectedValueOnce(new Error("Failed to book appointment"));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <BookAppointment />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.queryByText("Book an Appointment")).not.toBeInTheDocument();
    });

    fireEvent.click(screen.getByText("Book Appointment"));
  });
});
