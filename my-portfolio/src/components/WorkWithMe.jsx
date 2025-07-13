import { motion } from "framer-motion";
import { EmailIcon, LinkedInIcon } from "./Icons";
import "./WorkWithMe.css";

const WorkWithMe = () => {
  return (
    <section id="work-with-me" className="work-with-me">
      <motion.div className="work-with-me-container">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="work-with-me-card"
        >
          <h3 className="work-with-me-title">Let's Work Together</h3>
          <p className="work-with-me-description">
            I'm always interested in new opportunities and exciting projects.
            Whether you're looking for a full-stack developer or want to discuss
            a potential collaboration, I'd love to hear from you.
          </p>
          <div className="work-with-me-buttons">
            <a
              href="mailto:shahkar0215@gmail.com"
              className="primary-button"
            >
              <EmailIcon className="button-icon" />
              Send Email
            </a>
            <a
              href="https://www.linkedin.com/in/shah-kar/"
              target="_blank"
              rel="noopener noreferrer"
              className="primary-button"
            >
              <LinkedInIcon className="button-icon" />
              Connect on LinkedIn
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WorkWithMe;
