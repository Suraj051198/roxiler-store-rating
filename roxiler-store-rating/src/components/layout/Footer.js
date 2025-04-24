import React from 'react';
import { FaGithub, FaGlobe, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Store Rating System</h5>
            <p>
              Developed by Suraj Sonawane as part of Roxiler Systems Internship Coding Challenge.
            </p>
          </div>
          <div className="col-md-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white">Home</Link></li>
              <li><Link to="/login" className="text-white">Login</Link></li>
              <li><Link to="/register" className="text-white">Register</Link></li>
            </ul>
          </div>
          <div className="col-md-3">
            <h5>Connect With Me</h5>
            <div className="d-flex gap-3 mt-3">
              <a href="https://suraj05-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
                <FaGlobe />
              </a>
              <a href="https://github.com/Suraj051198" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/sonawane-suraj/" target="_blank" rel="noopener noreferrer" className="text-white fs-4">
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
        <hr className="my-3" />
        <div className="row">
          <div className="col-12 text-center">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} Store Rating System | Created by Suraj Sonawane | All Rights Reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 