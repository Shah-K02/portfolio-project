import { motion } from "framer-motion";
import { EmailIcon, LinkedInIcon } from "./Icons";
import "./WorkWithMe.css";

const WorkWithMe = () => {
  return (
    <section id="work-with-me" className="contact-section">
      <motion.div className="contact-container">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/10 backdrop-blur-lg rounded-xl p-8"
        >
          <h3 className="text-2xl font-semibold mb-6">Let's Work Together</h3>
          <p className="text-gray-300 mb-6 leading-relaxed">
            I'm always interested in new opportunities and exciting projects.
            Whether you're looking for a full-stack developer or want to discuss
            a potential collaboration, I'd love to hear from you.
          </p>
          <div className="flex space-x-4">
            <a
              href="mailto:shahkar0215@gmail.com"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 font-medium"
            >
              <EmailIcon className="w-4 h-4 mr-2" />
              Send Email
            </a>
            <a
              href="https://www.linkedin.com/in/shah-kar/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200 font-medium"
            >
              <LinkedInIcon className="w-4 h-4 mr-2" />
              Connect on LinkedIn
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WorkWithMe;
