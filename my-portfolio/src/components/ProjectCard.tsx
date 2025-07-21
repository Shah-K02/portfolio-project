// ProjectCard.tsx
import React from "react";
import { motion } from "framer-motion";
import { Project } from "../types/project";

// Card colors for project cards
const CARD_COLORS = [
  "var(--color-accent-1)", // accent 1
  "var(--color-detail)", // detail color
  "var(--color-accent-2)", // accent 2
  "var(--color-detail)", // detail color
  "var(--color-surface)", // surface color
] as const;

interface ProjectCardProps {
  project: Project;
  colorIndex: number;
  index: number;
  onViewProject: (project: Project) => void;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      delay: index * 0.1,
    },
  }),
};

const ProjectCard: React.FC<ProjectCardProps> = React.memo(
  ({ project, colorIndex, index, onViewProject }) => {
    const handleViewProject = () => {
      onViewProject(project);
    };

    const displayedTechnologies = project.technologies?.slice(0, 3) || [];
    const remainingTechCount = (project.technologies?.length || 0) - 3;

    return (
      <motion.li
        className="projects-card"
        style={{
          backgroundColor: CARD_COLORS[colorIndex % CARD_COLORS.length],
        }}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={index}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="projects-card-content">
          <div className="projects-card-header">
            <h3 className="projects-card-title">{project.title}</h3>
            <div className="projects-card-status">
              <span className={`status-badge status-${project.status}`}>
                {project.status}
              </span>
            </div>
          </div>

          <p className="projects-card-description">{project.description}</p>

          <div
            className="projects-card-tech"
            role="list"
            aria-label="Technologies used"
          >
            {displayedTechnologies.map((tech, idx) => (
              <span key={idx} className="tech-tag" role="listitem">
                {tech}
              </span>
            ))}
            {remainingTechCount > 0 && (
              <span className="tech-tag more" role="listitem">
                +{remainingTechCount}
              </span>
            )}
          </div>

          <div className="projects-card-footer">
            <span className="projects-card-year">{project.year}</span>
            <button
              className="projects-card-link"
              onClick={handleViewProject}
              aria-label={`View details for ${project.title}`}
            >
              View Project
            </button>
          </div>
        </div>
      </motion.li>
    );
  }
);

ProjectCard.displayName = "ProjectCard";

export default ProjectCard;
