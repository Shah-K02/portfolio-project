import React, { useRef } from "react";
import { GitHubIcon, LinkedInIcon } from "./Icons";
import "./Introduction.css";
import { motion } from "framer-motion";
import { Upload, Download } from "react-feather";
import { usePerformanceDetection } from "../utils/performanceDetection";
import MagneticCursor from "./MagneticCursor";
import { useAdmin } from "../context/AdminContext";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const FADE_UP = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: false, amount: 0.2 },
  transition: { duration: 0.7, delay, ease: EASE },
});

const STACK = ["React", "TypeScript", "Node.js", "Express", "MySQL"];

const Introduction: React.FC = () => {
  const { config } = usePerformanceDetection();
  const { isAdmin, cvUrl, uploadCV, cvLoading } = useAdmin();
  const sectionRef = useRef<HTMLElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleViewWork = () => {
    const section =
      document.querySelector('[data-section="projects"]') ||
      document.querySelector("#projects") ||
      document.querySelector(".projects-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await uploadCV(file);
        alert("CV updated successfully!");
      } catch (err) {
        alert("Failed to upload CV. Please try again.");
      }
    }
  };

  return (
    <section ref={sectionRef} className="intro" id="introduction">
      {/* Dot-grid ground — a quiet nod to schematic paper, not decoration for its own sake */}
      <div className="intro-grid" aria-hidden="true" />

      <div className="intro-container">
        {/* ── LEFT: text content ── */}
        <div className="intro-text">
          <motion.div className="intro-status" {...FADE_UP(0.05)}>
            <span className="intro-status-dot" aria-hidden="true" />
            available for opportunities
          </motion.div>

          <motion.p className="intro-greeting" {...FADE_UP(0.15)}>
            Hi there, I'm
          </motion.p>

          {/* Name — large display type */}
          <div className="intro-name-wrap" aria-label="Shah Kar">
            {["Shah", "Kar"].map((word, wi) => (
              <div className={`intro-name-line intro-name-line--${wi}`} key={word}>
                {word.split("").map((ch, ci) => (
                  <motion.span
                    key={ci}
                    className="intro-name-char"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                      duration: 0.55,
                      delay: wi * 0.12 + ci * 0.04,
                      ease: EASE,
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </div>
            ))}
          </div>

          <motion.p className="intro-role" {...FADE_UP(0.35)}>
            Full-stack developer specialising in
          </motion.p>

          <motion.ul className="intro-stack" {...FADE_UP(0.42)}>
            {STACK.map((tech) => (
              <li key={tech} className="intro-stack-item">{tech}</li>
            ))}
          </motion.ul>

          <motion.p className="intro-bio" {...FADE_UP(0.5)}>
            Computer Science graduate passionate about building beautiful,
            performant web products from concept to deployment.
          </motion.p>

          <motion.div className="intro-actions" {...FADE_UP(0.58)}>
            {config.features.magneticCursor ? (
              <MagneticCursor strength={0.2}>
                <button className="intro-btn intro-btn--primary" onClick={handleViewWork}>
                  View My Work
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>
              </MagneticCursor>
            ) : (
              <button className="intro-btn intro-btn--primary" onClick={handleViewWork}>
                View My Work
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </button>
            )}

            <a
              href={cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="intro-btn intro-btn--outline"
              aria-label="Download Shah Kar's CV"
            >
              <Download size={16} />
              Download CV
            </a>

            {isAdmin && (
              <>
                <input
                  type="file"
                  accept="application/pdf"
                  style={{ display: 'none' }}
                  ref={fileInputRef}
                  onChange={handleCVUpload}
                />
                <button
                  className="intro-btn intro-btn--outline intro-btn--admin"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={cvLoading}
                >
                  <Upload size={16} style={{ marginRight: '6px' }} />
                  {cvLoading ? "Uploading..." : "Update CV"}
                </button>
              </>
            )}
          </motion.div>

          <motion.div className="intro-socials" {...FADE_UP(0.64)}>
            <a href="https://github.com/Shah-K02" target="_blank" rel="noopener noreferrer" className="intro-social-link" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href="https://www.linkedin.com/in/shah-kar" target="_blank" rel="noopener noreferrer" className="intro-social-link" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT: profile photo + spec panel ── */}
        <motion.div
          className="intro-image-side"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
        >
          <div className="profile-frame">
            <span className="profile-corner profile-corner--tl" aria-hidden="true" />
            <span className="profile-corner profile-corner--br" aria-hidden="true" />
            <img
              src="./profilepic.jpeg"
              alt="Shah Kar"
              className="profile-img"
              loading="eager"
            />
          </div>

          <dl className="profile-spec">
            <div className="profile-spec-row">
              <dt>Projects</dt>
              <dd>5+</dd>
            </div>
            <div className="profile-spec-row">
              <dt>Focus</dt>
              <dd>Full&#8209;stack</dd>
            </div>
            <div className="profile-spec-row">
              <dt>Based</dt>
              <dd>Birmingham, UK</dd>
            </div>
          </dl>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        className="intro-scroll-hint"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ delay: 0.9, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="intro-scroll-line" />
        <span className="intro-scroll-label">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Introduction;
