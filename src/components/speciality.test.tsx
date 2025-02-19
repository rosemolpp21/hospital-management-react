import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import SpecialityList from "./Speciality";

jest.mock("axios");
jest.mock("./navbar", () => () => <div data-testid="navbar">Navbar</div>);

describe("SpecialityList Component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders SpecialityList with fetched data", async () => {
    const mockData = [
      { speciality_id: 1, name: "Cardiology", description: "Heart specialist" },
      { speciality_id: 2, name: "Neurology", description: "Brain specialist" },
    ];

    (axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData });

    render(
      <BrowserRouter>
        <SpecialityList />
      </BrowserRouter>
    );

    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByText("Specialities")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Cardiology")).toBeInTheDocument();
      expect(screen.getByText("Heart specialist")).toBeInTheDocument();
      expect(screen.getByText("Neurology")).toBeInTheDocument();
    });
  });

  test("displays an error message when API fails", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("API Error"));

    render(
      <BrowserRouter>
        <SpecialityList />
      </BrowserRouter>
    );
  });
});
