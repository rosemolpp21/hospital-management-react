import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import Signup from "./Signup";

jest.mock("axios");
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: () => mockNavigate
  }))


describe("Signup Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders signup form fields", () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    expect(screen.getByText(/Register/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Age/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/^Address$/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Email-Address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  test("validates form inputs", async () => {
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText(/Submit details/i));

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/First Name/i)).toBeRequired();
      expect(screen.getByPlaceholderText(/Last Name/i)).toBeRequired();
      expect(screen.getByPlaceholderText(/Age/i)).toBeRequired();
      expect(screen.getByPlaceholderText(/Phone Number/i)).toBeRequired();
      expect(screen.getByPlaceholderText(/^Address$/i)).toBeRequired();
      expect(screen.getByPlaceholderText(/Email-Address/i)).toBeRequired();
      expect(screen.getByPlaceholderText(/Password/i)).toBeRequired();
    });
  });
  test("submits form successfully", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({ status: 201 });

    render(
        <MemoryRouter>
            <Signup />
        </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "John" } });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Peter" } });
    fireEvent.change(screen.getByPlaceholderText("Phone Number"), { target: { value: "9294577890" } });
    fireEvent.change(screen.getByPlaceholderText("Age"), { target: { value: "22" } });
    fireEvent.change(screen.getByPlaceholderText("Email-Address"), { target: { value: "john.peter@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password" } });
    fireEvent.change(screen.getByPlaceholderText("Address"), { target: { value: "thrissur" } });
    fireEvent.change(screen.getByRole("combobox"), { target: { value: "Male" } });

    fireEvent.click(screen.getByText("Submit details"));
    await waitFor(() => expect(screen.getByText("Your details have been successfully added. Redirecting to the login page...")));
});
  test("handles successful signup", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({ status: 201 });
    render(
      <MemoryRouter>
        <Signup />
      </MemoryRouter>
    );
    fireEvent.change(screen.getByPlaceholderText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Last Name/i), {
      target: { value: "Peter" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Age/i), {
      target: { value: "22" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Phone Number/i), {
      target: { value: "9234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText(/^Address$/i), {
      target: { value: "kkpp" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Email-Address/i), {
      target: { value: "johm.test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByText(/Submit details/i));
    await waitFor(() => expect(window.location.href).toContain('http://localhost/'));
  });
});

