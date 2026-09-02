import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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

interface Skill {
  name: string;
  icon?: React.ReactElement;
}

interface SkillRow {
  title: string;
  rowIcon: React.ReactElement;
  items: Skill[];
}

const skillIcons: Record<string, React.ReactElement> = {
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

const rows: SkillRow[] = [
  {
    title: "Languages",
    rowIcon: <FaCode />,
    items: ["Java", "JavaScript", "Python", "HTML", "CSS", "Tailwind", "MySQL", "C#"].map(
      (name) => ({ name, icon: skillIcons[name] })
    ),
  },
  {
    title: "Frameworks",
    rowIcon: <FaGlobe />,
    items: ["React", "Node.js", "Express", "Spring Boot"].map((name) => ({
      name,
      icon: skillIcons[name],
    })),
  },
  {
    title: "Tools",
    rowIcon: <FaDatabase />,
    items: ["GitHub", "Postman", "Git", "VS Code"].map((name) => ({
      name,
      icon: skillIcons[name],
    })),
  },
  {
    title: "Engineering",
    rowIcon: <FaAward />,
    items: [
      "Agile & Scrum",
      "SDLC",
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Test-Driven Development",
    ].map((name) => ({ name })),
  },
  {
    title: "Practice",
    rowIcon: <FaBriefcase />,
    items: [
      "Leadership & Teamwork",
      "Project Management",
      "Problem Solving",
      "Communication",
      "Time Management",
    ].map((name) => ({ name })),
  },
  {
    title: "Additional",
    rowIcon: <FaUser />,
    items: [
      "UI/UX Design Principles",
      "API Development",
      "Database Design",
      "Version Control (Git)",
      "Project Documentation",
    ].map((name) => ({ name })),
  },
];

const Skills: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);

  return (
    <section ref={sectionRef} className="skills-section" id="skills">
      <div className="skills-container">
        <span className="eyebrow">03 · STACK</span>
        <motion.h2
          className="skills-title"
          style={{ y: titleY }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Skills &amp; Technologies
        </motion.h2>

        <div className="skills-manifest">
          {rows.map((row, i) => (
            <motion.div
              key={row.title}
              className="skills-row"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <div className="skills-row-label">
                <span className="skills-row-icon">{row.rowIcon}</span>
                {row.title}
              </div>
              <ul className="skills-row-items">
                {row.items.map((item) => (
                  <li key={item.name} className="skills-tag">
                    {item.icon && <span className="skills-tag-icon">{item.icon}</span>}
                    {item.name}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
