import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import Signup from "./Signup";

jest.mock("axios");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(() => mockNavigate),
}));

describe("Signup Component", () => {
    test("renders signup form correctly", () => {
        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );

        expect(screen.getByText("Register")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Phone Number")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Age")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
        expect(screen.getByText("Submit details")).toBeInTheDocument();
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
        fireEvent.change(screen.getByPlaceholderText("Email Address"), { target: { value: "john.peter@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password" } });
        fireEvent.change(screen.getByPlaceholderText("Address"), { target: { value: "thrissur" } });
        fireEvent.change(screen.getByRole("combobox"), { target: { value: "Male" } });

        fireEvent.click(screen.getByText("Submit details"));

        await waitFor(() => expect(screen.getByText("Your details have been successfully added. Redirecting to the login page...")));

        await waitFor(() => {
            console.log("mockNavigate calls:", mockNavigate.mock.calls);
            expect(mockNavigate).toHaveBeenCalledWith("/");
        }, { timeout: 3000 });
    });

    test("shows error message when API request fails", async () => {
        (axios.post as jest.Mock).mockRejectedValueOnce(new Error("Error in inserting"));

        render(
            <MemoryRouter>
                <Signup />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByPlaceholderText("First Name"), { target: { value: "John" } });
        fireEvent.change(screen.getByPlaceholderText("Last Name"), { target: { value: "Peter" } });
        fireEvent.change(screen.getByPlaceholderText("Phone Number"), { target: { value: "9294577890" } });
        fireEvent.change(screen.getByPlaceholderText("Age"), { target: { value: "22" } });
        fireEvent.change(screen.getByPlaceholderText("Email Address"), { target: { value: "john.peter@example.com" } });
        fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password" } });
        fireEvent.change(screen.getByPlaceholderText("Address"), { target: { value: "thrissur" } });
        fireEvent.change(screen.getByRole("combobox"), { target: { value: "Male" } });

        fireEvent.click(screen.getByText("Submit details"));

        await waitFor(() => expect(screen.getByText(/Error in inserting/i)).toBeInTheDocument());
    });
});

