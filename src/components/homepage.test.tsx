import React from "react";
import { createMemoryHistory } from "history";
import { render, screen, fireEvent } from "@testing-library/react";
// import { MemoryRouter, Router } from "react-router-dom";
import {Router} from "react-router-dom"
import HomePage from "./Homepage";

describe("HomePage Component", () => {
  // test("renders homepage elements", () => {
  //   render(
  //     <MemoryRouter>
  //       <HomePage />
  //     </MemoryRouter>
  //   );
  //   expect(screen.getByText(/Hospital Management/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Welcome to Hospital Management/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Hospital Services/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Home/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Doctors/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Appointments/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Signup/i)).toBeInTheDocument();
  //   expect(screen.getByText(/Login/i)).toBeInTheDocument();
  // });

  test("navigates to user login page when 'Login as User' is selected", () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <HomePage />
      </Router>
    );

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "user" } });

    expect(history.location.pathname).toBe("/login");
  });

  test("navigates to admin login page when 'Login as Admin' is selected", () => {
    const history = createMemoryHistory();
    render(
      <Router location={history.location} navigator={history}>
        <HomePage />
      </Router>
    );

    const selectElement = screen.getByRole("combobox");
    fireEvent.change(selectElement, { target: { value: "admin" } });

    expect(history.location.pathname).toBe("/admin");
  });
});
