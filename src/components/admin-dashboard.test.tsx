import React, { JSX } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AdminDashboard from "./Admin-dashboard";

const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

const renderWithRouter = (component: JSX.Element) =>
  render(<BrowserRouter>{component}</BrowserRouter>);

describe("AdminDashboard Component", () => {
  test("renders Admin Dashboard correctly", () => {
    renderWithRouter(<AdminDashboard />);
    expect(screen.getByText(/Hello, welcome Admin/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Logout/i })).toBeInTheDocument();
  });

  test("handles logout and navigates to login page", () => {

    renderWithRouter(<AdminDashboard />);

    const logoutButton = screen.getByRole("button", { name: /Logout/i });
    fireEvent.click(logoutButton);

    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("role")).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
