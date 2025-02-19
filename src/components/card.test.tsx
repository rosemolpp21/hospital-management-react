import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Card from "./Card";

describe("Card Component", () => {
  const mockProps = {
    name: "Dr. John peter",
    email: "john@example.com",
    phone: "1234567890",
    image: "/assets/doctor_image/doctor-1.png",
    onclick: jest.fn(),
  };

  test("renders doctor details correctly", () => {
    render(
      <Card
        name={mockProps.name}
        email={mockProps.email}
        phone={mockProps.phone}
        image={mockProps.image}
        onclick={mockProps.onclick}
      />
    );
    expect(screen.getByText("Dr. John peter")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();
    const image = screen.getByAltText("doctor");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", mockProps.image);
  });

  test("calls onclick function when Discover button is clicked", () => {
    render(
      <Card
        name={mockProps.name}
        email={mockProps.email}
        phone={mockProps.phone}
        image={mockProps.image}
        onclick={mockProps.onclick}
      />
    );
    const button = screen.getByText("Discover");
    fireEvent.click(button);
    expect(mockProps.onclick).toHaveBeenCalledTimes(1);
  });
});
