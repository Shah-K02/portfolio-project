import React from "react";
import { motion } from "framer-motion";
import { GitHubIcon, LinkedInIcon, EmailIcon, LocationIcon } from "./Icons";
import "./Contact.css";

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <motion.h2
          className="contact-heading"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="contact-info"
        >
          <div className="contact-item">
            <div className="contact-icon">
              <EmailIcon className="icon" />
            </div>
            <div>
              <h3 className="contact-title">Email</h3>
              <p className="contact-text">shahkar0215@gmail.com</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <LinkedInIcon className="icon" />
            </div>
            <div>
              <h3 className="contact-title">LinkedIn</h3>
              <a
                href="https://www.linkedin.com/in/shah-kar/"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                Connect with me
              </a>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <GitHubIcon className="icon" />
            </div>
            <div>
              <h3 className="contact-title">GitHub</h3>
              <a
                href="https://github.com/Shah-K02"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-link"
              >
                View my projects
              </a>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <LocationIcon className="icon" />
            </div>
            <div>
              <h3 className="contact-title">Location</h3>
              <p className="contact-text">Birmingham, UK</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;