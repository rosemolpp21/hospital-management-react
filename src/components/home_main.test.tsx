import React from "react";
import { render, screen } from "@testing-library/react";
import Main from "./Home_main"; 

describe("Main Component", () => {
  test("renders hero section with heading, paragraph, and button", () => {
    render(<Main />);
    expect(screen.getByRole("heading", { name: /your health, our priority/i })).toBeInTheDocument();
    expect(screen.getByText(/expert care, advanced technology, and compassionate healing/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /explore/i })).toBeInTheDocument();
  });
});
