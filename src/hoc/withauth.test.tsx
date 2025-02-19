import { render } from "@testing-library/react";
import { MemoryRouter,useNavigate } from "react-router-dom";
import WithAuth from "./withauth";


jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

const MockComponent = () => <div>Protected Content</div>;
const ProtectedComponent = WithAuth(MockComponent);

describe("WithAuth HOC", () => {
  let mockNavigate: jest.Mock;

  beforeEach(() => {
    mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("redirects to '/' when no token is present", () => {
    render(
      <MemoryRouter>
        <ProtectedComponent />
      </MemoryRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("renders wrapped component when token is present", () => {
    localStorage.setItem("token", "validToken123");

    const { getByText } = render(
      <MemoryRouter>
        <ProtectedComponent />
      </MemoryRouter>
    );

    expect(getByText("Protected Content")).toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});

