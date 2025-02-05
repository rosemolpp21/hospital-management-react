import React from "react";
import { createMemoryHistory } from "history";
import { render, screen, fireEvent } from "@testing-library/react";
import {Router} from "react-router-dom"
import HomePage from "./Homepage";

describe("HomePage Component", () => {
 

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
