import { motion } from "framer-motion";
import "./Skills.css";
import {
  FaCode,
  FaGlobe,
  FaDatabase,
  FaBriefcase,
  FaAward,
  FaUser,
  FaJava,
  FaPython,
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGithub,
  FaGitAlt,
  FaJsSquare,
  FaRegFileCode,
} from "react-icons/fa";
import {
  SiTailwindcss,
  SiMysql,
  SiSpringboot,
  SiPostman,
  SiVisualstudiocode,
  SiExpress,
} from "react-icons/si";

// Example icons for skills (replace with appropriate icons as needed)
const skillIcons = {
  Java: <FaJava />,
  JavaScript: <FaJsSquare />,
  Python: <FaPython />,
  HTML: <FaHtml5 />,
  CSS: <FaCss3Alt />,
  Tailwind: <SiTailwindcss />,
  MySQL: <SiMysql />,
  "C#": <FaRegFileCode />,
  React: <FaReact />,
  "Node.js": <FaNodeJs />,
  Express: <SiExpress />,
  "Spring Boot": <SiSpringboot />,
  GitHub: <FaGithub />,
  Postman: <SiPostman />,
  Git: <FaGitAlt />,
  "VS Code": <SiVisualstudiocode />,
};

const skills = {
  languages: [
    { name: "Java", icon: skillIcons.Java },
    { name: "JavaScript", icon: skillIcons.JavaScript },
    { name: "Python", icon: skillIcons.Python },
    { name: "HTML", icon: skillIcons.HTML },
    { name: "CSS", icon: skillIcons.CSS },
    { name: "Tailwind", icon: skillIcons.Tailwind },
    { name: "MySQL", icon: skillIcons.MySQL },
    { name: "C#", icon: skillIcons["C#"] },
  ],
  frameworks: [
    { name: "React", icon: skillIcons.React },
    { name: "Node.js", icon: skillIcons["Node.js"] },
    { name: "Express", icon: skillIcons.Express },
    { name: "Spring Boot", icon: skillIcons["Spring Boot"] },
  ],
  tools: [
    { name: "GitHub", icon: skillIcons.GitHub },
    { name: "Postman", icon: skillIcons.Postman },
    { name: "Git", icon: skillIcons.Git },
    { name: "VS Code", icon: skillIcons["VS Code"] },
  ],
};
const Skills = () => (
  <section className="skills-section" id="skills">
    <div className="skills-container">
      <motion.h2
        className="skills-title"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Skills & Expertise
      </motion.h2>

      <div className="skills-grid">
        {/* Programming Languages */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="skills-card skills-card-blue"
        >
          <div className="skills-card-header">
            <FaCode className="skills-card-icon skills-card-icon-blue" />
            <h3 className="skills-card-title">Programming Languages</h3>
          </div>
          <div className="skills-list">
            {skills.languages.map((skill) => (
              <div key={skill.name} className="skills-list-item">
                <span className="skills-list-icon">{skill.icon}</span>
                <span className="skills-list-text">{skill.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Frameworks & Libraries */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="skills-card skills-card-purple"
        >
          <div className="skills-card-header">
            <FaGlobe className="skills-card-icon skills-card-icon-purple" />
            <h3 className="skills-card-title">Frameworks & Libraries</h3>
          </div>
          <div className="skills-list">
            {skills.frameworks.map((skill) => (
              <div key={skill.name} className="skills-list-item">
                <span className="skills-list-icon">{skill.icon}</span>
                <span className="skills-list-text">{skill.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="skills-card skills-card-green"
        >
          <div className="skills-card-header">
            <FaDatabase className="skills-card-icon skills-card-icon-green" />
            <h3 className="skills-card-title">Tools & Technologies</h3>
          </div>
          <div className="skills-list">
            {skills.tools.map((skill) => (
              <div key={skill.name} className="skills-list-item">
                <span className="skills-list-icon">{skill.icon}</span>
                <span className="skills-list-text">{skill.name}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="skills-card skills-card-orange"
        >
          <div className="skills-card-header">
            <FaBriefcase className="skills-card-icon skills-card-icon-orange" />
            <h3 className="skills-card-title">Soft Skills</h3>
          </div>
          <ul className="skills-ul">
            <li> Leadership & Teamwork</li>
            <li> Project Management</li>
            <li> Problem Solving</li>
            <li> Communication</li>
            <li> Time Management</li>
            <li> Multilingual Communication</li>
          </ul>
        </motion.div>

        {/* Software Engineering */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="skills-card skills-card-pink"
        >
          <div className="skills-card-header">
            <FaAward className="skills-card-icon skills-card-icon-pink" />
            <h3 className="skills-card-title">Software Engineering</h3>
          </div>
          <ul className="skills-ul">
            <li> Agile & Scrum</li>
            <li> SDLC</li>
            <li> Data Structures & Algorithms</li>
            <li> Object-Oriented Programming</li>
            <li> Test-Driven Development</li>
          </ul>
        </motion.div>

        {/* Additional Skills */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="skills-card skills-card-indigo"
        >
          <div className="skills-card-header">
            <FaUser className="skills-card-icon skills-card-icon-indigo" />
            <h3 className="skills-card-title">Additional</h3>
          </div>
          <ul className="skills-ul">
            <li> UI/UX Design Principles</li>
            <li> API Development</li>
            <li> Database Design</li>
            <li> Version Control (Git)</li>
            <li> Project Documentation</li>
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Skills;
