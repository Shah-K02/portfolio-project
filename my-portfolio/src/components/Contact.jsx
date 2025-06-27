import { motion } from "framer-motion";
import { GitHubIcon, LinkedInIcon, EmailIcon, LocationIcon } from "./Icons";
import "./Contact.css";
import "./WorkWithMe.css";
const ContactSection = () => {
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

        <div className="contact-grid">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
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
                  href="https://github.com/yourusername"
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

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="contact-form-container"
          >
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="form-input"
                  placeholder="Your name"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Your email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="form-textarea"
                  placeholder="Your message"
                ></textarea>
              </div>
              <button type="submit" className="submit-button">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
