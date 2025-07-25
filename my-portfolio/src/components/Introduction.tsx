import React from "react";
import { GitHubIcon, LinkedInIcon } from "./Icons";
import "./Introduction.css";
import { motion } from "framer-motion";
import { Code } from "react-feather";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import "../styles/sectionAnimation.css";
import ParticleBackground from "./ParticleBackground";
import TypingAnimation from "./TypingAnimation";
import MagneticCursor from "./MagneticCursor";

import InteractiveParticles from "./Interactive/InteractiveParticles";
const Introduction: React.FC = () => {
  const { ref, inView } = useScrollAnimation({ amount: 0.2 }); // 20% threshold for early trigger

  return (
    <section
      ref={ref}
      className={`introduction section-animated fade-up ${
        inView ? "section-visible" : "section-hidden"
      }`}
      style={{ position: "relative", overflow: "hidden" }}
    >
      <div className="intro-background">
        <InteractiveParticles
          particleCount={50}
          color="var(--color-accent-1)"
          connectionDistance={100}
        />
      </div>
      <ParticleBackground count={2000} />
      <div className="container">
        <div
          className={`introduction-content stagger-children ${
            inView ? "section-visible" : ""
          }`}
        >
          {/* Animated Profile Circle with my Picture */}
          <div className="profile-image stagger-item">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 50 }}
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
                  animate={{ rotate: inView ? 360 : 0 }}
                  transition={{
                    duration: 20,
                    repeat: inView ? Infinity : 0,
                    ease: "linear",
                  }}
                >
                  <Code className="profile-icon" />
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.h1
            className="main-title stagger-item"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Hi, I'm <span className="highlight">Shah Kar</span>
          </motion.h1>

          <motion.div
            className="subtitle-container stagger-item"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <p className="subtitle-static">
              I am a passionate Computer Science graduate specialising in{" "}
            </p>
            <div className="typing-container">
              <TypingAnimation
                texts={[
                  "Full-Stack Development",
                  "React & TypeScript",
                  "Node.js & Express",
                  "Database Design",
                  "API Development",
                  "Modern Web Technologies",
                ]}
                className="typing-text"
                speed={80}
                deleteSpeed={40}
                delayBetweenTexts={1500}
              />
            </div>
            <p className="subtitle-static">
              Ready to create innovative solutions and contribute to
              cutting-edge projects.
            </p>
          </motion.div>

          <motion.div
            className="social-links stagger-item"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <MagneticCursor strength={0.2}>
              <motion.a
                href="https://github.com/Shah-K02"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link github enhanced"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 25px var(--color-accent-1)",
                  backgroundColor: "var(--color-accent-1-light)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <GitHubIcon />
              </motion.a>
            </MagneticCursor>

            <MagneticCursor strength={0.2}>
              <motion.a
                href="https://www.linkedin.com/in/shah-kar"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link linkedin enhanced"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 25px var(--color-accent-1)",
                  backgroundColor: "var(--color-accent-1-light)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <LinkedInIcon />
              </motion.a>
            </MagneticCursor>

            <MagneticCursor strength={0.2}>
              <motion.button
                className="cta-button"
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 30px var(--color-accent-2)",
                  backgroundColor: "var(--color-accent-2)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  // Enhanced scroll functionality with multiple fallbacks
                  const projectsSection = document.querySelector(
                    '[data-section="projects"]'
                  ) || document.querySelector('#projects') || document.querySelector('.projects-section');
                  
                  if (projectsSection) {
                    // Add visual feedback
                    const button = document.querySelector('.cta-button');
                    if (button) {
                      button.classList.add('clicked');
                      setTimeout(() => button.classList.remove('clicked'), 300);
                    }
                    
                    // Smooth scroll with offset for better positioning
                    const offsetTop = projectsSection.getBoundingClientRect().top + window.pageYOffset - 80;
                    window.scrollTo({
                      top: offsetTop,
                      behavior: 'smooth'
                    });
                    
                    // Fallback for older browsers
                    setTimeout(() => {
                      projectsSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                      });
                    }, 100);
                  }
                }}
              >
                View My Work
              </motion.button>
            </MagneticCursor>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;
