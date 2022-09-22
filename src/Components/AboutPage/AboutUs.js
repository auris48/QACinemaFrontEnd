import React from "react";
import "./Styles.css";
import Contact from "../Contact";

function AboutUs() {
  return (
    <div>
      <title>About Us Section</title>
      <div className="section">
        <div className="container">
          <div className="content-section">
            <div className="title">
              <h1>About Us</h1>
            </div>
            <div className="content">
              <h3>Contact Information</h3>
              <p>
                Have any questions, complaints, or other enquiries? Feel free to
                contact us through the methods below, and we'll get back to you
                shortly!
              </p>
              <h3>Email:</h3>
              example@example.com (feel free to use the form on the right!)
              <h3>Phone Number:</h3>
              0345 074 7829
              <h3>Mailing Address:</h3>
              Mailing Address: 3rd Floor, International House 1 St Katherine's
              Way, London E1W 1UN
              <p />
            </div>
            <div className="social">
              <a href>
                <i className="fab fa-facebook-f" />
              </a>
              <a href>
                <i className="fab fa-twitter" />
              </a>
              <a href>
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
        </div>

        <Contact />
      </div>
    </div>
  );
}

export default AboutUs;
