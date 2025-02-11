import React from "react";
import { render, screen } from "@testing-library/react";
import Card from "./Card";
import "@testing-library/jest-dom";

describe("Card Component", () => {
  const doctorData = {
    name: "Dr. John peter",
    email: "johnpeter@example.com",
    phone: 9274597890,
    image: "/assets/doctor_image/doctor-1.png",
  };

  test("renders doctor's name, email, and phone", () => {
    render(<Card name={doctorData.name} email={doctorData.email} phone={doctorData.phone.toString()} image={doctorData.image} />);
    
    expect(screen.getByText(doctorData.name)).toBeInTheDocument();
    expect(screen.getByText(doctorData.email)).toBeInTheDocument();
    expect(screen.getByText(doctorData.phone.toString())).toBeInTheDocument();
  });

  test("renders doctor's image with correct src", () => {
    render(<Card name={doctorData.name} email={doctorData.email} phone={doctorData.phone.toString()} image={doctorData.image} />);
    
    const image = screen.getByAltText("doctor");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", doctorData.image);
  });
});
