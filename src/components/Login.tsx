import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/Login.css'



const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage("");
    setErrorMessage("");
    axios.post('http://localhost:8080/login/user', { email, password })
      .then(
        res => {
          if (res.status === 200) {
            setSuccessMessage("you are logined successfully");
            setErrorMessage(" ");
            const token=res.data.accessToken;
            localStorage.setItem("token", token);
            localStorage.setItem("role","user");
            navigate("/userDashBoard"); 
          }
          else {
            setErrorMessage("invalids credentials");
          }
        }
      )
      .catch((err) => {
        if (err.response?.data?.messsage) {
          setErrorMessage(err.response.data.message);
        } else {
          setErrorMessage('error occurred invalid credentials');
        }
      });
  }
  return (
    <div className='form_container'>
      <div className="form-header">
        <h2 className="login">Login to your user account</h2>
      </div>

      <div className="form">
        <form className='login-form' onSubmit={handleSubmit}>
          <label htmlFor="email">
            <strong>Email</strong>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="login-credentials"
              onChange={e => setEmail(e.target.value)}
            /></label>
          <label htmlFor="password">
            <strong> Password </strong>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              className="login-credentials"
              onChange={e => setPassword(e.target.value)}
            /></label>
          <div><button className="button" type="submit">Submit</button>
            <Link to='/Signup' type="submit" className="register-details-submit">
              <button type="submit">Create an account</button>
            </Link>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;