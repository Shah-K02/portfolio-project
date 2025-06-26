import React from 'react';
import { GitHubIcon, LinkedInIcon } from './Icons';
import './Introduction.css';

const Introduction: React.FC = () => {
  return (
    <section className="introduction">
      <div className="container">
        <div className="introduction-content">
          <div className="profile-image">
            <img
              src="https://via.placeholder.com/200x200/667eea/ffffff?text=Your+Photo"
              alt="Profile"
              className="profile-pic"
            />
          </div>
          <h1 className="main-title">
            Hi, I'm <span className="highlight">Your Name</span>
          </h1>
          <p className="subtitle">
            Full Stack Developer passionate about creating beautiful, functional web applications
          </p>
          <div className="social-links">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link github"
            >
              <GitHubIcon />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link linkedin"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;