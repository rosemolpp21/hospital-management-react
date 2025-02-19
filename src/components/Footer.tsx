import React from "react";
import "../styles/footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer: React.FC = () => (
  <footer id="home-footer">
    <div className="footer-container">
      <div className="footer-section">
        <h3>About Us</h3>
        <p>Providing quality healthcare services with efficiency and care.</p>
      </div>
      
      <div className="footer-section">
        <h3>Quick Links</h3>
        <ul>
          <li><a href="/about">About</a></li>
          <li><a href="/services">Services</a></li>
          <li><a href="/contact">Contact</a></li>
        </ul>
      </div>

      <div className="footer-section">
        <h3>Contact Us</h3>
        <p>Email: hospitalmanagement@gmail.com</p>
        <p>Phone: 9123529871</p>
        <p>Address: Thrissur</p>
      </div>

      <div className="footer-section">
        <h3>Follow Us</h3>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
          <FontAwesomeIcon icon={faFacebook} />
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <FontAwesomeIcon icon={faInstagram} />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FontAwesomeIcon icon={faLinkedin} />
        </a>
      </div>
    </div>

    <div className="footer-bottom">
      <p>&copy; 2025 Hospital Management System | All Rights Reserved</p>
    </div>
  </footer>
);

export default Footer;
