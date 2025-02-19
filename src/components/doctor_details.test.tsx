import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import DoctorDetails from "./DoctorDetailsPage";

jest.mock("axios");

describe("DoctorDetails Component", () => {
  it("displays doctor details when API call is successful", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      status: 200,
      data: [
        {
          doctor_id: 1,
          name: "Dr. john",
          email: "john.peter@gmail.com",
          phone: 1234567890,
          image: "/assets/doctor_image/doctor-1.png",
          speciality: "Cardiologist",
          timing: "9 AM - 5 PM",
        },
      ],
    });
    render(
      <MemoryRouter initialEntries={["/doctors/1"]}>
        <Routes>
          <Route path="/doctors/:id" element={<DoctorDetails />} />
        </Routes>
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Dr. john/i)).toBeInTheDocument();
      expect(screen.getByText(/john.peter@gmail.com/i)).toBeInTheDocument();
      expect(screen.getByText(/1234567890/i)).toBeInTheDocument();
      expect(screen.getByText(/Cardiologist/i)).toBeInTheDocument();
      expect(screen.getByText(/9 AM - 5 PM/i)).toBeInTheDocument();
    });
    const doctorImage = screen.getByAltText("Dr. john");
    expect(doctorImage).toBeInTheDocument();
    expect(doctorImage).toHaveAttribute("src", "/assets/doctor_image/doctor-1.png");
  });

  it("shows an error message when API call fails", async () => {
    (axios.get as jest.Mock).mockRejectedValue(new Error("Failed to fetch"));

    render(
      <MemoryRouter initialEntries={["/doctors/1"]}>
        <Routes>
          <Route path="/doctors/:id" element={<DoctorDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/error in loading data/i)).toBeInTheDocument();
    });
  });

  it("handles missing doctor data gracefully", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      status: 200,
      data: [],
    });

    render(
      <MemoryRouter initialEntries={["/doctors/1"]}>
        <Routes>
          <Route path="/doctors/:id" element={<DoctorDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/error in loading data/i)).toBeInTheDocument();
    });
  });
});
