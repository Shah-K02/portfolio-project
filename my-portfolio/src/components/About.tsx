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
              src="https://via.placeholder.com/500x600/f093fb/ffffff?text=About+Photo"
              alt="About me"
              className="about-pic"
            />
          </div>
          <div className="about-info">
            <div className="info-card strengths-card">
              <h3 className="card-title">Strengths</h3>
              <ul className="strengths-list">
                <li>Full-stack development expertise</li>
                <li>Strong problem-solving abilities</li>
                <li>Excellent team collaboration</li>
                <li>Continuous learning mindset</li>
                <li>User-focused design approach</li>
              </ul>
            </div>
            <div className="info-card education-card">
              <h3 className="card-title">Education</h3>
              <div className="education-content">
                <p className="degree">Bachelor of Computer Science</p>
                <p className="university">University Name, 2020-2024</p>
                <p className="coursework">
                  Relevant coursework: Data Structures, Algorithms, Software Engineering, Database Systems
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