/* eslint-disable import/no-extraneous-dependencies */
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import * as reactRouterDom from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { jest } from "@jest/globals";
import UserDashboard from "./User-dashboard";
import axiosfetch from "../axios/axios_interceptor";



jest.mock("react-router-dom", () => {
  const actual = jest.requireActual<typeof reactRouterDom>("react-router-dom");

  return {
    ...actual,
    useNavigate: jest.fn(),
  };
});

describe("UserDashboard Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    localStorage.setItem("token", "test-token");
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  test("renders user data correctly on successful API call", async () => {
    const mockUserData = {
      ID: 1,
      first_name: "John",
      last_name: "peter",
      email: "john.peter@example.com",
      phone_no: 1234567890,
      gender: "Male",
      age: 22,
      address: "thrissur",
    };
  
    (axiosfetch.get as jest.MockedFunction<typeof axiosfetch.get>).mockResolvedValueOnce({
      data: mockUserData,
    });
  
    render(
      <MemoryRouter>
        <UserDashboard />
      </MemoryRouter>
    );
  
    await waitFor(() => {
      expect(screen.getByText("Welcome, John peter!")).toBeInTheDocument();
    });
  });
  

  test("shows error message when API call fails", async () => {
    const error = {
      response: { data: { message: "An error occurred" } },
    };
    (axiosfetch.get as jest.MockedFunction<typeof axiosfetch.get>).mockRejectedValueOnce(error);
    
    render(
      <MemoryRouter>
        <UserDashboard />
      </MemoryRouter>
    );
  
    await waitFor(() => {
      expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(/error/i);
    });      
  });
  
  

  test("handles network error when API call fails without response", async () => {
    (axiosfetch.get as jest.MockedFunction<typeof axiosfetch.get>).mockRejectedValueOnce(
      new Error("Network Error")
    );
  
    render(
      <MemoryRouter>
        <UserDashboard />
      </MemoryRouter>
    );
  
    await waitFor(() => {
      expect(screen.getByText("Error in getting details")).toBeInTheDocument();
    });
  });
  

  test("navigates to book appointment page on button click", async () => {
    render(
      <MemoryRouter>
        <UserDashboard />
      </MemoryRouter>
    );

    const button = screen.getByText("Book Appointment");
    userEvent.click(button);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/Bookappointment");
    });
  });
});









