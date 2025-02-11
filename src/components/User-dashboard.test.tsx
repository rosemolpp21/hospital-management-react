import React from "react";
import { render, screen, waitFor,fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "axios";
import { BrowserRouter,MemoryRouter} from "react-router-dom";
import UserDashboard from "./User-dashboard";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));
jest.mock("axios");
describe("UserDashboard Component", () => {
  const mockUserData = {
    first_name: "John",
    last_name: "Peter",
    email: "johm.peter@example.com",
    phone_no: 9234567890,
    gender: "Male",
    age: 22,
    address: "Thrissur",
  };
  beforeEach(() => {
    localStorage.setItem("token", "mocked-token");
  });

  afterEach(() => {
    localStorage.clear();
  });
  test("displays user details", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: mockUserData })
    render(
      <BrowserRouter>
        <UserDashboard />
      </BrowserRouter>
    );
    expect(screen.getByText(/User Dashboard/i)).toBeInTheDocument();
    await waitFor(() => expect(mockedAxios.get).toHaveBeenCalledTimes(1));
    expect(screen.getByText("Welcome, John Peter!")).toBeInTheDocument();
    expect(screen.getByText("Email: johm.peter@example.com")).toBeInTheDocument();
    expect(screen.getByText("Phone: 9234567890")).toBeInTheDocument();
    expect(screen.getByText("Gender: Male")).toBeInTheDocument();
    expect(screen.getByText("Age: 22")).toBeInTheDocument();
    expect(screen.getByText("Address: Thrissur")).toBeInTheDocument();
    expect(screen.getByText("Appointment Details")).toBeInTheDocument();
    expect(screen.getByText("You don't have any appointments")).toBeInTheDocument();

  });
  test("navigates to /login after logout", async () => {
    render(
      <MemoryRouter>
        <UserDashboard />
      </MemoryRouter>
    );

    const logoutButton = screen.getByText(/Logout/);
    fireEvent.click(logoutButton);


    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/login");
    });
  });
  test(" book appointment page", async () => {
    render(
      <MemoryRouter>
        <UserDashboard />
      </MemoryRouter>
    );
    expect(screen.getByText(/Book Appointment/)).toBeInTheDocument();
  });
});











