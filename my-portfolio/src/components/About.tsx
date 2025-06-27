import React from 'react';
import './About.css';

const About: React.FC = () => {
  return (
    <section className="about">
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <div className="about-content">
          <div className="about-image">
            <img
              src='./aboutpic.jpeg'
              alt="About me"
              className="about-pic"
            />
          </div>
          <div className="about-info">
            <div className="info-card strengths-card">
              <img className="strength-icon" src="./strengthicon.png" alt="Strengths" />
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
            <div className="info-card education-card">
              <img className="edu-icon" src="./eduicon.png" alt="Education" />
              <h3 className="card-title">Education</h3>
              <div className="education-content">
                <p className="degree">Bachelor of Computer Science</p>
                <p className="university">Aston University, Birmingham, UK 2021-2024</p>
                <p className="modules">
                  Relevant modules: Object-Oriented Programming, Data Structures & Algorithms, Software Engineering, Database Design, Team Projects, Individual Project
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