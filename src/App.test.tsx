import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

jest.mock("./components/Login", () => () => <div>Login Page</div>);
jest.mock("./components/Signup", () => () => <div>Signup Page</div>);

describe("App Routing", () => {
  test("renders the Login page by default", () => {
    render(<App />);
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });

  test("navigates to the Signup page when the URL is '/signup'", async () => {
    window.history.pushState({}, "Signup Page", "/signup");
    render(<App />);
    expect(screen.getByText("Signup Page")).toBeInTheDocument();
  });

  test("navigates back to Login page from Signup page", async () => {
    const user = userEvent.setup();
    render(<App />);

    window.history.pushState({}, "Signup Page", "/signup");
    expect(screen.getByText("Signup Page")).toBeInTheDocument();

    window.history.pushState({}, "Login Page", "/");
    await user.click(screen.getByText("Login Page"));
    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
});


