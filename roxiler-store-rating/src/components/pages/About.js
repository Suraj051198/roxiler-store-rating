import React from 'react';
import { FaGithub, FaGlobe, FaLinkedin } from 'react-icons/fa';

const About = () => {
  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card border-0 shadow">
            <div className="card-body p-5">
              <h2 className="text-center mb-4">About Store Rating System</h2>
              
              <div className="mb-4">
                <h4>Project Overview</h4>
                <p>
                  The Store Rating System is a full-featured web application that allows users to submit ratings for stores
                  registered on the platform. This project was built as part of the Roxiler Systems Internship Coding Challenge.
                </p>
                <p>
                  The application features a role-based access control system with three user types: System Administrator,
                  Normal User, and Store Owner, each with their own set of functionalities.
                </p>
              </div>
              
              <div className="mb-4">
                <h4>Technologies Used</h4>
                <ul>
                  <li><strong>Frontend:</strong> React.js, Bootstrap</li>
                  <li><strong>State Management:</strong> React Hooks</li>
                  <li><strong>Routing:</strong> React Router</li>
                  <li><strong>Data Storage:</strong> localStorage</li>
                  <li><strong>Icons:</strong> React Icons</li>
                </ul>
              </div>
              
              <div className="mb-4">
                <h4>About the Developer</h4>
                <div className="d-flex align-items-center mb-3">
                  <div className="me-3">
                    <img 
                      src="https://avatars.githubusercontent.com/u/Suraj051198" 
                      alt="Suraj Sonawane" 
                      className="rounded-circle" 
                      style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/80';
                      }}
                    />
                  </div>
                  <div>
                    <h5 className="mb-1">Suraj Sonawane</h5>
                    <p className="mb-0 text-muted">Full Stack Developer</p>
                    <div className="social-links d-flex gap-2 mt-2">
                      <a href="https://suraj05-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-primary fs-5">
                        <FaGlobe />
                      </a>
                      <a href="https://github.com/Suraj051198" target="_blank" rel="noopener noreferrer" className="text-dark fs-5">
                        <FaGithub />
                      </a>
                      <a href="https://www.linkedin.com/in/sonawane-suraj/" target="_blank" rel="noopener noreferrer" className="text-primary fs-5">
                        <FaLinkedin />
                      </a>
                    </div>
                  </div>
                </div>
                <p>
                  I'm a passionate Full Stack Developer with experience in building web applications using modern
                  technologies. This Store Rating System is one of my projects that demonstrates my skills in
                  developing user-friendly interfaces with robust functionality.
                </p>
              </div>
              
              <div className="text-center mt-5">
                <a href="https://github.com/Suraj051198" target="_blank" rel="noopener noreferrer" className="btn btn-outline-primary me-2">
                  View My GitHub
                </a>
                <a href="https://suraj05-portfolio.netlify.app/" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  Visit My Portfolio
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 