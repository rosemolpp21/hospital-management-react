import React, { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import '../styles/Login.css'



const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios.post('http://localhost:8080/login/user', { email, password })
      .then(
        res => {
          if (res.status === 200) {
            setSuccessMessage("you are logined successfully")
          }
          else {
            setErrorMessage("invalids credentials")
          }
        }
      )
      .catch((err) => {
        const errorResponse = err.response;
        if (errorResponse && errorResponse.data && errorResponse.data.message) {
          setErrorMessage(errorResponse.data.message);
        } else {
          setErrorMessage('error occurred invalid credentials');
        }
      });
  }
  return (
    <div className='form_container'>
      <div className="form-header">
        <h2 className="login">Login to your account</h2>
      </div>

      <div className="form">
        <form className='login-form' onSubmit={handleSubmit}>
          <label htmlFor="email">
            <strong>Email</strong>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="login-credentials"
              onChange={e => setEmail(e.target.value)}
            /></label>
          <label htmlFor="password">
            <strong> Password </strong>
            <input
              type="password"
              name="password"
              placeholder="Password"
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