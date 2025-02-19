import React from "react";
import "../styles/home.css";
import Footer from "./Footer";
import Navbar from "./navbar";
import Main from "./Home_main";


const HomePage: React.FC = () => (
  <div style={{ textAlign: "center", padding: "20px" }}>
    <Navbar/>
    <Main />
    <Footer />
  </div>
);

export default HomePage