import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Signup";
import Loginadmin from "./components/loginadmin";
import UserDashboard from "./components/User-dashboard";
import AdminDashboard from "./components/Admin-dashboard";

describe("App Routing", () => {
  const renderWithRouter = (initialEntry: string) =>
    render(
      <MemoryRouter initialEntries={[initialEntry]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Loginadmin />} />
          <Route path="/userDashBoard" element={<UserDashboard />} />
          <Route path="/adminDashboard" element={<AdminDashboard />} />
          <Route path="/Signup" element={<Register />} />
        </Routes>
      </MemoryRouter>
    );

  test("renders HomePage at default route", () => {
    renderWithRouter("/");
    expect(screen.getByText(/welcome to hospital management/i)).toBeInTheDocument();
  });

  test("renders Login page at /login", () => {
    renderWithRouter("/login");
    expect(screen.getByText(/login/i)).toBeInTheDocument();
  });

  test("renders Admin Login page at /admin", () => {
    renderWithRouter("/admin");
    expect(screen.getByText(/login as admin/i)).toBeInTheDocument();

  });

  test("renders User Dashboard at /userDashBoard", () => {
    renderWithRouter("/userDashBoard");
    expect(screen.getByText(/user dashboard/i)).toBeInTheDocument();
  });

  test("renders Admin Dashboard at /adminDashboard", () => {
    renderWithRouter("/adminDashboard");
    expect(screen.getByText(/Hello, welcome Admin/i)).toBeInTheDocument();
  });

  test("renders Signup page at /Signup", () => {
    renderWithRouter("/Signup");
    expect(screen.getByText(/register/i)).toBeInTheDocument();
  });
});


