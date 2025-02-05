import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import UserDashboard from "./User-dashboard";

jest.mock("axios"); 
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("UserDashboard Component", () => {
  test("renders User Dashboard heading", async () => {
    render(
      <MemoryRouter>
        <UserDashboard />
      </MemoryRouter>
    );

    expect(screen.getByText(/User Dashboard/i)).toBeInTheDocument();
  });

  test("displays login message when no user data is found", async () => {
    mockedAxios.get.mockRejectedValueOnce({
      response: { data: { message: "No token found. Please login." } },
    });

    render(
      <MemoryRouter>
        <UserDashboard />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(
        screen.getByText(/No token found. Please login./i)
      ).toBeInTheDocument()
    );
  });

  // test("displays user details when API call succeeds", async () => {
  //   mockedAxios.get.mockResolvedValueOnce({
  //     data: {
  //       first_name: "John",
  //       last_name: "Peter",
  //     },
  //   });

  //   render(
  //     <MemoryRouter>
  //       <UserDashboard />
  //     </MemoryRouter>
  //   );

  //   await waitFor(() =>
  //     expect(screen.getByText(/John Peter/i)).toBeInTheDocument()
  //   );
  // });

  // test("displays appointment details if available", async () => {
  //   mockedAxios.get
  //     .mockResolvedValueOnce({
  //       data: {
  //         first_name: "Jane",
  //         last_name: "Doe",
  //         email: "jane.doe@example.com",
  //         phone_no: 9876543210,
  //         gender: "Female",
  //         age: 25,
  //         address: "456 Another St",
  //       },
  //     })
  //     .mockResolvedValueOnce({
  //       data: "Your appointment is on Monday.",
  //     });

  //   render(
  //     <MemoryRouter>
  //       <UserDashboard />
  //     </MemoryRouter>
  //   );

  //   await waitFor(() => {
  //     expect(
  //       screen.getByText(/Your appointment is on Monday./i)
  //     ).toBeInTheDocument();
  //   });
  // });

  // test("displays no appointments message when none exist", async () => {
  //   mockedAxios.get
  //     .mockResolvedValueOnce({
  //       data: {
  //         first_name: "Alice",
  //         last_name: "Smith",
  //         email: "alice.smith@example.com",
  //         phone_no: 1122334455,
  //         gender: "Female",
  //         age: 28,
  //         address: "789 Street Lane",
  //       },
  //     })
  //     .mockResolvedValueOnce({ data: null });

  //   render(
  //     <MemoryRouter>
  //       <UserDashboard />
  //     </MemoryRouter>
  //   );

  //   await waitFor(() => {
  //     expect(
  //       screen.getByText(/You dont have any appointments/i)
  //     ).toBeInTheDocument();
  //   });
  // });
});










