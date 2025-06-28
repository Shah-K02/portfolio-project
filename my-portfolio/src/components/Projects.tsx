import React, { useState } from "react";
import "./Projects.css";
import { motion } from "framer-motion";
import { LeftArrowIcon, RightArrowIcon } from "./Icons";

interface Project {
  title: string;
  description: string;
  link?: string;
}
const cardColors = [
  "#f8b195", // light pink
  "#f67280", // pink
  "#c06c84", // mauve
  "#6c5b7b", // purple
  "#355c7d", // blue
  "#99b898", // green
];
const projects: Project[] = [
  {
    title: "Project One",
    description: "Description for project one.",
    link: "https://example.com/project-one",
  },
  {
    title: "Project Two",
    description: "Description for project two.",
    link: "https://example.com/project-two",
  },
  {
    title: "Project Three",
    description: "Description for project three.",
    link: "https://example.com/project-three",
  },
  {
    title: "Project Four",
    description: "Description for project four.",
    link: "https://example.com/project-four",
  },
  {
    title: "Project Five",
    description: "Description for project five.",
    link: "https://example.com/project-five",
  },
  {
    title: "Project Six",
    description: "Description for project six.",
    link: "https://example.com/project-six",
  },
  // Add more projects as needed
];

const Projects: React.FC = () => (
  <section className="projects-section" id="projects">
    <div className="projects-container">
      <motion.h2
        className="projects-title"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <span>Projects</span>
      </motion.h2>
      <ProjectsCarousel />
    </div>
  </section>
);

export default Projects;
/**
 * Carousel logic for Projects component
 */

const CARDS_PER_PAGE = 3;

const ProjectsCarousel: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(projects.length / CARDS_PER_PAGE);

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const startIdx = currentPage * CARDS_PER_PAGE;
  const visibleProjects = projects.slice(startIdx, startIdx + CARDS_PER_PAGE);

  return (
    <div className="projects-carousel">
      <button
        className="carousel-arrow left"
        onClick={handlePrev}
        aria-label="Previous"
      >
        <LeftArrowIcon />
      </button>
      <ul className="projects-grid">
        {visibleProjects.map((project, idx) => (
          <li
            key={startIdx + idx}
            className="projects-card"
            style={{
              backgroundColor: cardColors[(startIdx + idx) % cardColors.length],
            }}
          >
            <h3 className="projects-card-title">{project.title}</h3>
            <p className="projects-card-description">{project.description}</p>
            {project.link && (
              <a
                className="projects-card-link"
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Project
              </a>
            )}
          </li>
        ))}
      </ul>
      <button
        className="carousel-arrow right"
        onClick={handleNext}
        aria-label="Next"
      >
        <RightArrowIcon />
      </button>
    </div>
  );
};

export { ProjectsCarousel };
