import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-left">
            <h1>QA Cinema</h1>
            <p>
              QA Cinema is a cinema complex located in the heart of London. We
              have 5 screens and a variety of different films to watch. We also
              have a bar and restaurant on site.
            </p>
          </div>
          <div className="footer-center">
            <h1>Follow Us</h1>
            <ul>
              <li>
                <Link to="/">Facebook</Link>
              </li>
              <li>
                <Link to="/">Twitter</Link>
              </li>
              <li>
                <Link to="/">Instagram</Link>
              </li>
            </ul>
          </div>
          <div className="footer-right">
            <h1>Quick Links</h1>
            <ul className="footer-quick-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/booking">Book Now</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>QA Cinema &copy; 2021</p>
          <small>
            For more information please email us at:
            customer.services@qacinema.com or call us on 020 1234 1234
          </small>
        </div>
      </div>
    </div>
  );
}
