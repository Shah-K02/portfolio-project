import React, { useState } from "react";
import { motion } from "framer-motion";
import { GitHubIcon, LinkedInIcon, EmailIcon, LocationIcon } from "./Icons";
import "./Contact.css";

const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    try {
      const res = await fetch("https://formspree.io/f/xkopnbro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormState("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

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

        <div className="contact-layout">
          {/* Contact Info */}
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
                <a href="mailto:shahkar0215@gmail.com" className="contact-link">
                  shahkar0215@gmail.com
                </a>
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

          {/* Contact Form */}
          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            <h3 className="form-heading">Send a Message</h3>

            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
                className="form-input"
                disabled={formState === "sending" || formState === "success"}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email" className="form-label">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                required
                className="form-input"
                disabled={formState === "sending" || formState === "success"}
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message" className="form-label">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                required
                rows={5}
                className="form-input form-textarea"
                disabled={formState === "sending" || formState === "success"}
              />
            </div>

            {formState === "success" && (
              <p className="form-status form-success">
                ✅ Message sent! I'll get back to you soon.
              </p>
            )}
            {formState === "error" && (
              <p className="form-status form-error">
                ❌ Something went wrong. Please try emailing me directly.
              </p>
            )}

            <motion.button
              type="submit"
              className="form-submit"
              disabled={formState === "sending" || formState === "success"}
              whileHover={{ scale: formState === "idle" ? 1.03 : 1 }}
              whileTap={{ scale: 0.97 }}
            >
              {formState === "sending"
                ? "Sending…"
                : formState === "success"
                  ? "Sent!"
                  : "Send Message"}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
