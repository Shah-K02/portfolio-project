import React from "react";
import { GitHubIcon, LinkedInIcon } from "./Icons";
import "./Introduction.css";
import { motion } from "framer-motion";
import { Code } from "react-feather";
import { useScrollAnimation } from "../hooks/useScrollAnimation"; // Adjust path as needed
import "../styles/sectionAnimation.css";
const Introduction: React.FC = () => {
  const { isVisible, elementRef } = useScrollAnimation(0.2); // 20% threshold for early trigger

  return (
    <section
      ref={elementRef}
      className={`introduction section-animated fade-up ${
        isVisible ? "section-visible" : "section-hidden"
      }`}
    >
      <div className="container">
        <div
          className={`introduction-content stagger-children ${
            isVisible ? "section-visible" : ""
          }`}
        >
          {/* Animated Profile Circle with my Picture */}
          <div className="profile-image stagger-item">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="profile-circle-container"
            >
              <div className="profile-circle-outer">
                <div className="profile-circle-gradient">
                  <div className="profile-circle-white">
                    <div className="profile-circle-inner">
                      <img
                        src="./profilepic.jpeg"
                        alt="Shah Kar"
                        className="profile-picture"
                      />
                    </div>
                  </div>
                </div>
                <motion.div
                  className="profile-circle-decoration"
                  animate={{ rotate: isVisible ? 360 : 0 }}
                  transition={{
                    duration: 20,
                    repeat: isVisible ? Infinity : 0,
                    ease: "linear",
                  }}
                >
                  <Code className="profile-icon" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          <h1 className="main-title stagger-item">
            Hi, I'm <span className="highlight">Shah Kar</span>
          </h1>

          <p className="subtitle stagger-item">
            I am a highly motivated and passionate Computer Science graduate
            from Aston University, specializing in full-stack development,
            object-oriented programming, and database management. My goal is to
            apply my knowledge and skills in fast-paced environments while
            continuously learning and growing in the field of software
            development.
          </p>

          <div className="social-links stagger-item">
            <motion.a
              href="https://github.com/Shah-K02"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link github"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 20,
              }}
              transition={{ duration: 0.6, delay: 0.8 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <GitHubIcon />
            </motion.a>

            <motion.a
              href="https://www.linkedin.com/in/shah-kar"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link linkedin"
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isVisible ? 1 : 0,
                y: isVisible ? 0 : 20,
              }}
              transition={{ duration: 0.6, delay: 1.0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <LinkedInIcon />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
