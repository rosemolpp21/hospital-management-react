import React from "react";
import "../styles/home.css";
import Footer from "./Footer";
import Navbar from "./navbar";


const HomePage: React.FC = () => (
  <div style={{ textAlign: "center", padding: "20px" }}>
    <Navbar/>
    <h1>Welcome to Hospital Management</h1>
    <Footer />
  </div>
);

export default HomePage