import React, { JSX } from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import Loginadmin from "./loginadmin";

const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const renderWithRouter = (component: JSX.Element) => render(<BrowserRouter>{component}</BrowserRouter>);
describe("Loginadmin Component", () => {
  test("renders login form correctly", () => {
    renderWithRouter(<Loginadmin/>);
    expect(screen.getByText(/Login as admin/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });
  test("updates email and password fields on change", () => {
    renderWithRouter(<Loginadmin/>);
    const emailInput = screen.getByPlaceholderText("Email Address") as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText("Password") as HTMLInputElement;
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  test("handles successful login and redirects", async () => {
    mockedAxios.post.mockResolvedValueOnce({
      status: 200,
      data: { accessToken: "fake-token" },
    });
    renderWithRouter(<Loginadmin/>);
    fireEvent.change(screen.getByPlaceholderText("Email Address"), { target: { value: "user@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });
    fireEvent.click(screen.getByText(/Submit/i));
    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith("http://localhost:8080/login/admin", {
        email: "user@example.com",
        password: "password123",
      });
      expect(localStorage.getItem("token")).toBe("fake-token")
      expect(screen.getByText(/you are logined successfully/i)).toBeInTheDocument()
    });
    await waitFor(()=>{expect(mockNavigate).toHaveBeenCalledWith("/adminDashboard");},{timeout:2000});
  });

  test("shows error message on invalid credentials", async () => {
    mockedAxios.post.mockRejectedValueOnce({
      response: { data: { message: "Invalid credentials" } },
    });

    render(<Loginadmin />);

    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() =>
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument()
    );
  });

  test("shows generic error message on network failure", async () => {
    mockedAxios.post.mockRejectedValueOnce(new Error("Network error"));

    render(<Loginadmin />);

    fireEvent.change(screen.getByPlaceholderText(/Email Address/i), {
      target: { value: "admin@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() =>
      expect(
        screen.getByText(/error occurred invalid credentials/i)
      ).toBeInTheDocument()
    );
  });
});

