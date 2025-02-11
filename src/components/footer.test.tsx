import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Footer  from "./Footer";

describe("footer component", () => {
    test("renders footer text", () => {
        render(<Footer />);
        expect(screen.getByText("© 2021 Hospital Management System")).toBeInTheDocument();
    })
  });
  