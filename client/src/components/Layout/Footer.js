import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="pt-5 pb-4 mt-5"
      style={{
        backgroundColor: "#F8FAFC",
        color: "#334155",
        borderTop: "2px solid #E2E8F0",
      }}
    >
      <div className="container">
        <div className="row">

          {/* Brand Section */}
          <div className="col-md-4 mb-4">
            <h4 className="fw-bold text-primary">E-Shop</h4>
            <p className="text-secondary">
              Experience seamless shopping with top-quality products, fast delivery, and customer-first service.
            </p>
            <div className="d-flex gap-3 mt-3">
              <a href="#" className="text-secondary fs-5" style={{ transition: "color 0.3s" }}>
                <FaFacebookF />
              </a>
              <a href="#" className="text-secondary fs-5" style={{ transition: "color 0.3s" }}>
                <FaInstagram />
              </a>
              <a href="#" className="text-secondary fs-5" style={{ transition: "color 0.3s" }}>
                <FaTwitter />
              </a>
              <a href="#" className="text-secondary fs-5" style={{ transition: "color 0.3s" }}>
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-semibold text-primary mb-3">Useful Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/about" className="text-decoration-none text-secondary">About Us</Link></li>
              <li><Link to="/contact" className="text-decoration-none text-secondary">Contact</Link></li>
              <li><Link to="/policy" className="text-decoration-none text-secondary">Privacy Policy</Link></li>
              <li><Link to="/categories" className="text-decoration-none text-secondary">Browse Categories</Link></li>
              <li><Link to="/cart" className="text-decoration-none text-secondary">Your Cart</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 mb-4">
            <h5 className="fw-semibold text-primary mb-3">Get in Touch</h5>
            <p className="text-secondary mb-1">📧 support@eshop.com</p>
            <p className="text-secondary mb-1">📞 +91 98765 43210</p>
            <p className="text-secondary mb-1">🕒 Mon – Sat: 9AM – 8PM</p>
            <p className="text-secondary">📍 22B, Silicon Avenue, Bangalore, IN</p>
          </div>
        </div>

        <hr className="text-muted" />

        {/* Bottom Note */}
        <div className="text-center">
          <p className="mb-0 text-muted">
            &copy; {new Date().getFullYear()} <span className="fw-semibold text-primary">E-Shop</span>. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
