import React, { JSX } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import Login from "./Login";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const renderWithRouter = (component: JSX.Element) => render(<BrowserRouter>{component}</BrowserRouter>);

describe("Login Component", () => {
  test("renders login form correctly", () => {
    renderWithRouter(<Login />);
    expect(screen.getByText(/Login to your user account/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByText(/Submit/i)).toBeInTheDocument();
  });

  test("updates email and password fields on change", () => {
    renderWithRouter(<Login />);

    const emailInput = screen.getByPlaceholderText("Email Address") as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText("Password") as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  test("handles successful login and redirects", async () => {
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    mockedAxios.post.mockResolvedValueOnce({
      status: 200,
      data: { accessToken: "fake-token" },
    });

    renderWithRouter(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Email Address"), { target: { value: "user@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith("http://localhost:8080/login/user", {
        email: "user@example.com",
        password: "password123",
      });
      expect(localStorage.getItem("token")).toBe("fake-token")
      expect(window.location.href).toContain('/userDashBoard')
    });
  });

  test("displays error message on failed login", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: {
        data: { message: "Invalid credentials" },
      },
    });

    renderWithRouter(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Email Address"), { target: { value: "wrong@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "wrongpassword" } });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(screen.getByText("error occurred invalid credentials")).toBeInTheDocument();
    });
  });

  test("displays generic error message when no response from server", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Network error"));

    renderWithRouter(<Login />);

    fireEvent.change(screen.getByPlaceholderText("Email Address"), { target: { value: "test@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(screen.getByText("error occurred invalid credentials")).toBeInTheDocument();
    });
  });
});

