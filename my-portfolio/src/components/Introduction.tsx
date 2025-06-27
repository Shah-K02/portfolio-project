import React from 'react';
import { GitHubIcon, LinkedInIcon } from './Icons';
import './Introduction.css';
import { motion } from "framer-motion";
import { Code } from "react-feather";

const Introduction: React.FC = () => {
  return (
    <section className="introduction">
      <div className="container">
        <div className="introduction-content">
          {/* Animated Profile Circle with Your Picture */}
          <div className="profile-image">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="profile-circle-container"
            >
              <div className="profile-circle-outer">
                <div className="profile-circle-gradient">
                  <div className="profile-circle-white">
                    <div className="profile-circle-inner">
                      <img 
                        src="./profilepic.jpeg" 
                        alt="Your Name"
                        className="profile-picture"
                      />
                    </div>
                  </div>
                </div>
                <motion.div
                  className="profile-circle-decoration"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Code className="profile-icon" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          <h1 className="main-title">
            Hi, I'm <span className="highlight">Shah Kar</span>
          </h1>
          <p className="subtitle">
          I am a highly motivated and passionate Computer Science graduate from Aston University, specializing in full-stack development, object-oriented programming, and database management. My goal is to apply my knowledge and skills in fast-paced environments while continuously learning and growing in the field of software development.

</p>
          <div className="social-links">
            <a
              href="https://github.com/Shah-K02"
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