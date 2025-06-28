// Projects.tsx
import React from "react";
import "./Projects.css";
import { motion } from "framer-motion";
import { LeftArrowIcon, RightArrowIcon } from "./Icons";
import {
  useResponsiveCardCount,
  useCarousel,
  useKeyboardNavigation,
} from "../hooks";

interface Project {
  id: string;
  title: string;
  description: string;
  link?: string;
}

const CARD_COLORS = [
  "#f8b195", // light pink
  "#f67280", // pink
  "#c06c84", // mauve
  "#6c5b7b", // purple
  "#355c7d", // blue
  "#99b898", // green
] as const;

// Sample projects data
const projects: Project[] = [
  {
    id: "project-1",
    title: "Project One",
    description: "Description for project one.",
    link: "https://example.com/project-one",
  },
  {
    id: "project-2",
    title: "Project Two",
    description: "Description for project two.",
    link: "https://example.com/project-two",
  },
  {
    id: "project-3",
    title: "Project Three",
    description: "Description for project three.",
    link: "https://example.com/project-three",
  },
  {
    id: "project-4",
    title: "Project Four",
    description: "Description for project four.",
    link: "https://example.com/project-four",
  },
  {
    id: "project-5",
    title: "Project Five",
    description: "Description for project five.",
    link: "https://example.com/project-five",
  },
  {
    id: "project-6",
    title: "Project Six",
    description: "Description for project six.",
    link: "https://example.com/project-six",
  },
];

// Project Card Component
const ProjectCard: React.FC<{
  project: Project;
  colorIndex: number;
  index: number;
}> = React.memo(({ project, colorIndex, index }) => (
  <motion.li
    className="projects-card"
    style={{
      backgroundColor: CARD_COLORS[colorIndex % CARD_COLORS.length],
    }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    whileHover={{ scale: 1.02 }}
  >
    <h3 className="projects-card-title">{project.title}</h3>
    <p className="projects-card-description">{project.description}</p>
    {project.link && (
      <a
        className="projects-card-link"
        href={project.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${project.title} project`}
      >
        View Project
      </a>
    )}
  </motion.li>
));

ProjectCard.displayName = "ProjectCard";

// Carousel Navigation Component
const CarouselNavigation: React.FC<{
  onPrevious: () => void;
  onNext: () => void;
  canNavigate: boolean;
}> = ({ onPrevious, onNext, canNavigate }) => (
  <>
    <button
      className="carousel-arrow left"
      onClick={onPrevious}
      disabled={!canNavigate}
      aria-label="Previous projects"
    >
      <LeftArrowIcon />
    </button>
    <button
      className="carousel-arrow right"
      onClick={onNext}
      disabled={!canNavigate}
      aria-label="Next projects"
    >
      <RightArrowIcon />
    </button>
  </>
);

// Page Indicators Component
const PageIndicators: React.FC<{
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}> = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="carousel-indicators" role="tablist">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`indicator ${index === currentPage ? "active" : ""}`}
          onClick={() => onPageChange(index)}
          aria-label={`Go to page ${index + 1}`}
          role="tab"
          aria-selected={index === currentPage}
        />
      ))}
    </div>
  );
};

// Main Carousel Component
const ProjectsCarousel: React.FC<{ projects: Project[] }> = ({ projects }) => {
  const visibleCards = useResponsiveCardCount();

  const {
    currentPage,
    totalPages,
    visibleItems: visibleProjects,
    goToNext,
    goToPrevious,
    goToPage,
    canGoNext,
    canGoPrevious,
  } = useCarousel({
    items: projects,
    itemsPerPage: visibleCards,
  });

  const { handleKeyPress } = useKeyboardNavigation({
    onPrevious: goToPrevious,
    onNext: goToNext,
  });

  if (projects.length === 0) {
    return <div className="projects-empty">No projects to display</div>;
  }

  return (
    <div
      className="projects-carousel"
      onKeyDown={handleKeyPress}
      tabIndex={0}
      role="region"
      aria-label="Projects carousel"
    >
      <CarouselNavigation
        onPrevious={goToPrevious}
        onNext={goToNext}
        canNavigate={canGoPrevious && canGoNext}
      />

      <div className="carousel-viewport">
        <ul className="projects-grid" role="list">
          {visibleProjects.map((project, idx) => (
            <ProjectCard
              key={project.id}
              project={project}
              colorIndex={currentPage * visibleCards + idx}
              index={idx}
            />
          ))}
        </ul>
      </div>

      <PageIndicators
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={goToPage}
      />
    </div>
  );
};

// Main Projects Component
const Projects: React.FC<{ projects?: Project[] }> = ({
  projects: projectsProp = projects,
}) => (
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
      <ProjectsCarousel projects={projectsProp} />
    </div>
  </section>
);

export default Projects;
export { ProjectsCarousel, type Project };
