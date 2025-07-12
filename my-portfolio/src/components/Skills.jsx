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

const SkillCard = ({
  title,
  items,
  icon,
  color,
  delay = 0,
  isList = false,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ scale: 1.05 }}
    className={`skills-card skills-card-${color}`}
  >
    <div className="skills-card-header">
      {icon && (
        <motion.span
          className={`skills-card-icon skills-card-icon-${color}`}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          {icon}
        </motion.span>
      )}
      <h3 className="skills-card-title">{title}</h3>
    </div>
    {isList ? (
      <ul className="skills-ul">
        {items.map((item, index) => (
          <motion.li
            key={item}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            {item}
          </motion.li>
        ))}
      </ul>
    ) : (
      <div className="skills-list">
        {items.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="skills-list-item"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.1 }}
          >
            <span className="skills-list-icon">{skill.icon}</span>
            <span className="skills-list-text">{skill.name}</span>
          </motion.div>
        ))}
      </div>
    )}
  </motion.div>
);

const Skills = () => {
  const skillCards = [
    {
      title: "Programming Languages",
      items: skills.languages,
      icon: <FaCode />,
      color: "blue",
      delay: 0,
    },
    {
      title: "Frameworks & Libraries",
      items: skills.frameworks,
      icon: <FaGlobe />,
      color: "purple",
      delay: 0.1,
    },
    {
      title: "Tools & Technologies",
      items: skills.tools,
      icon: <FaDatabase />,
      color: "green",
      delay: 0.2,
    },
    {
      title: "Soft Skills",
      items: [
        "Leadership & Teamwork",
        "Project Management",
        "Problem Solving",
        "Communication",
        "Time Management",
        "Multilingual Communication",
      ],
      icon: <FaBriefcase />,
      color: "orange",
      delay: 0.3,
      isList: true,
    },
    {
      title: "Software Engineering",
      items: [
        "Agile & Scrum",
        "SDLC",
        "Data Structures & Algorithms",
        "Object-Oriented Programming",
        "Test-Driven Development",
      ],
      icon: <FaAward />,
      color: "pink",
      delay: 0.4,
      isList: true,
    },
    {
      title: "Additional",
      items: [
        "UI/UX Design Principles",
        "API Development",
        "Database Design",
        "Version Control (Git)",
        "Project Documentation",
      ],
      icon: <FaUser />,
      color: "indigo",
      delay: 0.5,
      isList: true,
    },
  ];

  return (
    <motion.section
      className="skills-section"
      id="skills"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
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

        <motion.div
          className="skills-grid"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {skillCards.map((card) => (
            <SkillCard key={card.title} {...card} />
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Skills;
