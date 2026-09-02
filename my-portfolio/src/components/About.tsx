import React from "react";
import "./About.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { FaBolt, FaGraduationCap } from "react-icons/fa";

const STRENGTHS = [
  "Full-stack development",
  "Problem-solving",
  "Team collaboration",
  "Continuous learning",
  "Project management",
  "Object-oriented design",
];

const EDUCATION = [
  { label: "Degree", value: "BSc Computer Science" },
  { label: "University", value: "Aston University, Birmingham" },
  { label: "Years", value: "2021 – 2024" },
  {
    label: "Modules",
    value:
      "OOP, Data Structures & Algorithms, Software Engineering, Database Design, Team Projects",
  },
];

const About: React.FC = () => {
  const { ref, inView } = useScrollAnimation({ amount: 0.2, once: false });

  return (
    <section
      id="about"
      ref={ref}
      className={`about section-animated fade-up ${
        inView ? "section-visible" : "section-hidden"
      }`}
    >
      <div className="container">
        <span className="eyebrow stagger-item">01 · ABOUT</span>
        <h2
          className={`section-title stagger-item ${
            inView ? "section-visible" : ""
          }`}
        >
          About Me
        </h2>

        <p className={`about-bio stagger-item ${inView ? "section-visible" : ""}`}>
          I'm a Computer Science graduate from Aston University with a passion for building elegant,
          high-performance web applications. I love turning complex problems into simple, intuitive
          experiences, whether that's architecting a RESTful API, crafting pixel-perfect UIs, or
          optimising a database query. I'm multilingual, detail-oriented, and always eager to
          learn whatever the project demands.
        </p>

        <div
          className={`about-content stagger-children ${
            inView ? "section-visible" : ""
          }`}
        >
          <div className="about-image stagger-item">
            <div className="about-frame">
              <span className="about-corner about-corner--tl" aria-hidden="true" />
              <span className="about-corner about-corner--br" aria-hidden="true" />
              <img src="./aboutpic.jpeg" alt="Shah Kar" className="about-pic" />
            </div>
          </div>

          <div className="about-panel stagger-item">
            <div className="about-panel-row">
              <div className="about-panel-label">
                <span className="icon-badge"><FaBolt /></span>
                Strengths
              </div>
              <ul className="about-tags">
                {STRENGTHS.map((s) => (
                  <li key={s} className="about-tag">{s}</li>
                ))}
              </ul>
            </div>

            <div className="about-panel-row">
              <div className="about-panel-label">
                <span className="icon-badge icon-badge--wire"><FaGraduationCap /></span>
                Education
              </div>
              <dl className="about-edu">
                {EDUCATION.map((row) => (
                  <div className="about-edu-row" key={row.label}>
                    <dt>{row.label}</dt>
                    <dd>{row.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
