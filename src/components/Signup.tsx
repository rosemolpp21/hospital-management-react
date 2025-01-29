import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Signup.css";

const Signup: React.FC = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [phoneNo, setPhoneno] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios
      .post("http://localhost:8080/register", {
        firstName,
        lastName,
        phoneNo,
        gender,
        age,
        address,
        email,
        password,
      })
      .then((res) => {
        if (res.status === 201) {
          setSuccessMessage(
            "Your details have been successfully added. Redirecting to the login page..."
          );
          setTimeout(() => navigate("/"), 3000);
        } else {
          setErrorMessage(
            "the email you entered is already existing or error in inserting"
          );
        }
      })
      .catch((err) => setErrorMessage(err.message));
  }
  return (
    <div className="form_container">
      <div className="form-header">
        <h2 className="register">Register</h2>
      </div>

      <div className="signup-form">
        <form className="registration-form" onSubmit={handleSubmit}>
          <label htmlFor="first_name">
            First Name
            <input 
              type="text"
              name="first_name"
              placeholder="First Name"
              className="first-name-signup"
              required
              onChange={(e) => setFirstname(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="last_name">
            Last Name
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              className="lastname-signup"
              required
              onChange={(e) => setLastname(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="gender">
            Gender
            <select
              name="gender"
              className="gender-select"
              required
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </label>
          <br />
          <label htmlFor="age">
            Age
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="signup-age"
              required
              onChange={(e) => setAge(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="phone_no">
            Phone No
            <input
              type="text"
              name="phone_no"
              placeholder="Phone Number"
              className="phone-no-signup"
              required
              onChange={(e) => setPhoneno(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="address">
            Address
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="address-signup"
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="email">
            Email
            <input type="email"
              name="email"
              placeholder="Email Address"
              className="email-signup"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label htmlFor="password">
            Password
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="password-type"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Submit details</button>
          <Link to="/" type="submit" className="register-details-submit">
            <button type="button">Login</button>
          </Link>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && (
            <p className="success-message">{successMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Signup;
