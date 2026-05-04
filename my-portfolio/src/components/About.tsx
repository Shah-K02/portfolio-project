import React from "react";
import "./About.css";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
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
        <h2
          className={`section-title stagger-item ${
            inView ? "section-visible" : ""
          }`}
        >
          About Me
        </h2>

        {/* Personal Bio */}
        <p className={`about-bio stagger-item ${inView ? "section-visible" : ""}` }>
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
            <img src="./aboutpic.jpeg" alt="About me" className="about-pic" />
          </div>

          <div className="about-info stagger-item">
            <div className="info-card strengths-card stagger-item">
              <img
                className="strength-icon"
                src="./strengthicon.png"
                alt="Strengths"
              />
              <h3 className="card-title">Strengths</h3>
              <ul className="strengths-list">
                <li>Full-stack development expertise</li>
                <li>Strong problem-solving abilities</li>
                <li>Excellent team collaboration</li>
                <li>Continuous learning mindset</li>
                <li>Software project management</li>
                <li>Object-oriented programming</li>
              </ul>
            </div>

            <div className="info-card education-card stagger-item">
              <img className="edu-icon" src="./eduicon.png" alt="Education" />
              <h3 className="card-title">Education</h3>
              <div className="education-content">
                <p className="degree">Bachelor of Computer Science</p>
                <p className="university">
                  Aston University, Birmingham, UK 2021–2024
                </p>
                <p className="modules">
                  Relevant modules: Object-Oriented Programming, Data Structures
                  &amp; Algorithms, Software Engineering, Database Design, Team
                  Projects, Individual Project
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
