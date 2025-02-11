import React, { useState } from 'react'
import axios from 'axios'
import '../styles/Login.css'
import { useNavigate } from 'react-router-dom'



const Loginadmin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    axios.post('http://localhost:8080/login/admin', { email, password })
      .then(
        res => {
          if (res.status === 200) {
            const token=res.data.accessToken;
            localStorage.setItem("token", token);
            setSuccessMessage("you are logined successfully")
            localStorage.setItem("role","admin");
            setTimeout(()=>{navigate("/adminDashboard")},1000)
          }
          else {
            setErrorMessage("invalids credentials")
          }
        }
      )
      .catch((err) => {
        const errorResponse = err.response;
        if (err.response?.data?.message) {
          setErrorMessage(errorResponse.data.message);
        } else {
          setErrorMessage('error occurred invalid credentials');
        }
      });
  }
  return (
    <div className='form_container'>
      <div className="form-header">
        <h2 className="login">Login as admin</h2>
      </div>

      <div className="form">
        <form className='login-form' onSubmit={handleSubmit}>
          <label htmlFor="username ">
            <strong>Username</strong>
            <input
              type="email"
              name="username"
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
          <div>
            <button className="button" type="submit" name="admin-dash-redirect">Submit</button>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {successMessage && <p className="success-message">{successMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default Loginadmin;

