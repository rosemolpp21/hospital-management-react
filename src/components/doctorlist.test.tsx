import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import DoctorsList from "./Doctor_list"; 

jest.mock("axios"); 

describe("DoctorsList Component", () => {
  it("fetches and displays doctors", async () => {
    (axios.get as jest.Mock).mockResolvedValue({
      status: 200,
      data: [
        { doctor_id: 1, name: "Dr. john", email: "john.peter@gmail.com", phone: "1234567890" },
        { doctor_id: 2, name: "Dr. Jaisy", email: "Jaisy.peter@gmail.com", phone: "0987654321" },
      ],
    });

    render(
      <BrowserRouter>
        <DoctorsList />
      </BrowserRouter>
    );

  
    await waitFor(() => {
      expect(screen.getByText(/Dr. john/i)).toBeInTheDocument();
      expect(screen.getByText(/Dr. Jaisy/i)).toBeInTheDocument();
    });
  });

  it("navigates when clicking 'Discover' button", async () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    (axios.get as jest.Mock).mockResolvedValue({
      status: 200,
      data: [{ doctor_id: 1, name: "Dr. john", email: "john.peter@gmail.com", phone: "1234567890" }],
    });

    render(
      <BrowserRouter>
        <DoctorsList />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Dr. john/i)).toBeInTheDocument();
    });

    const button = screen.getByText(/Discover/i);
    userEvent.click(button);
  });
});
