import React, { useEffect, useRef, useState } from "react";
import { GitHubIcon, LinkedInIcon } from "./Icons";
import "./Introduction.css";
import { motion } from "framer-motion";
import { Code } from "react-feather";
import { usePerformanceDetection } from "../utils/performanceDetection";
import TypingAnimation from "./TypingAnimation";
import MagneticCursor from "./MagneticCursor";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const FADE_RIGHT = (delay = 0) => ({
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

const FADE_LEFT = (delay = 0) => ({
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

const Introduction: React.FC = () => {
  const { config } = usePerformanceDetection();
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollOverlayRef = useRef<HTMLDivElement>(null);

  // Entry: trigger Framer Motion animations AND reveal the background
  // The ::before pseudo starts as a full black curtain; adding 'intro--entered'
  // CSS-transitions it to a semi-transparent dark tint, revealing the image.
  useEffect(() => {
    const t = requestAnimationFrame(() => {
      setMounted(true);
      sectionRef.current?.classList.add("intro--entered");
    });
    return () => cancelAnimationFrame(t);
  }, []);

  // Scroll: on scroll-down a black overlay div gets more opaque, hiding the bg.
  // On scroll-up the overlay becomes transparent again, revealing the bg.
  // We only ever increase overlay opacity (0 → opaque), never fight with CSS.
  useEffect(() => {
    const section = sectionRef.current;
    const overlay = scrollOverlayRef.current;
    if (!section || !overlay) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const sectionH = section.offsetHeight || window.innerHeight;
      const progress = Math.min(Math.max(scrollY / sectionH, 0), 1);
      overlay.style.opacity = String(Math.min(progress * 1.6, 1));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleViewWork = () => {
    const section =
      document.querySelector('[data-section="projects"]') ||
      document.querySelector("#projects") ||
      document.querySelector(".projects-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="intro"
      id="introduction"
      style={{ backgroundImage: "url('/intro-bg.png')" }}
    >
      {/* Scroll-fade overlay: transparent at rest, JS drives it opaque on scroll */}
      <div ref={scrollOverlayRef} className="intro-scroll-overlay" aria-hidden="true" />

      {/* Radial glow blobs */}
      <div className="intro-glow intro-glow--1" aria-hidden="true" />
      <div className="intro-glow intro-glow--2" aria-hidden="true" />

      <div className="intro-container">

        {/* ── LEFT: text content ── */}
        <div className="intro-text">

          {/* Availability chip */}
          <motion.div className="intro-chip" {...FADE_RIGHT(0.1)} animate={mounted ? FADE_RIGHT(0.1).animate : FADE_RIGHT(0.1).initial}>
            <span className="intro-chip-dot" aria-hidden="true" />
            Available for opportunities
          </motion.div>

          {/* Greeting */}
          <motion.p className="intro-greeting" {...FADE_RIGHT(0.25)} animate={mounted ? FADE_RIGHT(0.25).animate : FADE_RIGHT(0.25).initial}>
            Hi there, I'm
          </motion.p>

          {/* Name — large display type */}
          <div className="intro-name-wrap" aria-label="Shah Kar">
            {["Shah", "Kar"].map((word, wi) => (
              <div className="intro-name-line" key={word}>
                {word.split("").map((ch, ci) => (
                  <motion.span
                    key={ci}
                    className="intro-name-char"
                    initial={{ opacity: 0, y: 60, rotateX: -40 }}
                    animate={mounted ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{
                      duration: 0.65,
                      delay: 0.35 + wi * 0.15 + ci * 0.045,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {ch}
                  </motion.span>
                ))}
              </div>
            ))}
          </div>

          {/* Role / typing */}
          <motion.div
            className="intro-role-wrap"
            initial={{ opacity: 0, y: 24 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="intro-role-prefix">Specialising in </span>
            <TypingAnimation
              texts={["Full-Stack Development","React & TypeScript","Node.js & Express","Database Design","API Development","Modern Web"]}
              className="intro-typing"
              speed={75}
              deleteSpeed={40}
              delayBetweenTexts={1800}
            />
          </motion.div>

          {/* Short bio */}
          <motion.p
            className="intro-bio"
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            Computer Science graduate passionate about building beautiful,
            performant web products from concept to deployment.
          </motion.p>

          {/* CTA row */}
          <motion.div
            className="intro-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
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
              href="/ShahKar-CV.pdf"
              download="ShahKar-CV.pdf"
              className="intro-btn intro-btn--outline"
              aria-label="Download Shah Kar's CV"
            >
              Download CV
            </a>
          </motion.div>

          {/* Social icons */}
          <motion.div
            className="intro-socials"
            initial={{ opacity: 0, y: 16 }}
            animate={mounted ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <a href="https://github.com/Shah-K02" target="_blank" rel="noopener noreferrer" className="intro-social-link" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href="https://www.linkedin.com/in/shah-kar" target="_blank" rel="noopener noreferrer" className="intro-social-link" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
          </motion.div>
        </div>

        {/* ── RIGHT: profile image with orbiting icon ── */}
        <motion.div
          className="intro-image-side"
          {...FADE_LEFT(0.4)}
          animate={mounted ? FADE_LEFT(0.4).animate : FADE_LEFT(0.4).initial}
        >
          {/* Orbit system */}
          <div className="orbit-system">

            {/* Orbiting ring + icon */}
            <div className="orbit-ring" aria-hidden="true">
              <div className="orbit-traveller">
                <div className="orbit-icon">
                  <Code size={18} />
                </div>
              </div>
            </div>

            {/* Secondary slower ring — decorative dashes */}
            <div className="orbit-ring orbit-ring--slow" aria-hidden="true">
              <div className="orbit-traveller orbit-traveller--dot">
                <span className="orbit-dot" />
              </div>
            </div>

            {/* Profile picture */}
            <div className="profile-wrap">
              <div className="profile-gradient-border">
                <div className="profile-inner">
                  <img
                    src="./profilepic.jpeg"
                    alt="Shah Kar"
                    className="profile-img"
                    loading="eager"
                  />
                </div>
              </div>
            </div>

            {/* Floating stat chips */}
            <motion.div
              className="intro-stat intro-stat--tl"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={mounted ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.1, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              aria-label="5+ projects"
            >
              <strong>5+</strong>
              <span>Projects</span>
            </motion.div>

            <motion.div
              className="intro-stat intro-stat--br"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={mounted ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 1.25, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              aria-label="Full-stack focused"
            >
              <strong>Full</strong>
              <span>Stack</span>
            </motion.div>
          </div>
        </motion.div>

      </div>

      {/* Scroll hint */}
      <motion.div
        className="intro-scroll-hint"
        initial={{ opacity: 0 }}
        animate={mounted ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className="intro-scroll-line" />
        <span className="intro-scroll-label">Scroll</span>
      </motion.div>
    </section>
  );
};

export default Introduction;
