import React, { useState, useMemo } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import "./Projects.css";
import "../styles/sectionAnimation.css";

// Components
import ProjectModal from "./ProjectModal";
import CarouselNavigation from "./CarouselNavigation";
import PageIndicators from "./PageIndicators";
import ProjectFilter from "./ProjectFilter";
import Enhanced3DProjectCard from "./Enhanced3DProjectCard";

// Hooks
import {
  useResponsiveCardCount,
  useCarousel,
  useKeyboardNavigation,
} from "../hooks";

// Types
import { Project } from "../types/project";

// Constants
import { PROJECTS_DATA } from "../constants/projectsData";

// Utils
import { getUniqueCategories } from "../utils/projectUtils";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const carouselVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

// Props interfaces
interface ProjectsCarouselProps {
  projects: Project[];
  onViewProject: (project: Project) => void;
}

interface ProjectsProps {
  projects?: Project[];
}

// Main Carousel Component
const ProjectsCarousel: React.FC<ProjectsCarouselProps> = ({
  projects,
  onViewProject,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const visibleCards = useResponsiveCardCount();

  // Memoized filtered projects
  const filteredProjects = useMemo(() => {
    return selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);
  }, [projects, selectedCategory]);

  // Memoized categories
  const categories = useMemo(() => {
    return getUniqueCategories(projects);
  }, [projects]);

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
    items: filteredProjects,
    itemsPerPage: visibleCards,
  });

  const { handleKeyPress } = useKeyboardNavigation({
    onPrevious: goToPrevious,
    onNext: goToNext,
  });

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  if (projects.length === 0) {
    return (
      <div className="projects-empty" role="alert">
        No projects to display
      </div>
    );
  }

  return (
    <div className="projects-carousel-container">
      <ProjectFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

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
          canNavigatePrevious={canGoPrevious}
          canNavigateNext={canGoNext}
        />

        <div className="carousel-viewport">
          <motion.ul
            className="projects-grid"
            role="list"
            key={selectedCategory}
            variants={carouselVariants}
            initial="hidden"
            animate="visible"
          >
            {visibleProjects.map((project, idx) => (
                 <Enhanced3DProjectCard
                   key={project.id}
                   project={project}
                   index={idx}
                   onViewProject={onViewProject}
                 />
            ))}
          </motion.ul>
        </div>

        <PageIndicators
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={goToPage}
        />
      </div>
    </div>
  );
};

// Main Projects Component
const Projects: React.FC<ProjectsProps> = ({ projects = PROJECTS_DATA }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const projectsRef = React.useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: projectsRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section className="projects-section" id="projects" ref={projectsRef}>
      <motion.div className="projects-container" style={{ opacity, scale }}>
        <motion.header
          className="projects-header"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="projects-title futuristic-title">
            <span>My Projects</span>
          </h2>
          <p className="projects-subtitle">
            A collection of my recent work and personal projects
          </p>
        </motion.header>

        <ProjectsCarousel
          projects={projects}
          onViewProject={handleViewProject}
        />
      </motion.div>

      {isModalOpen && selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </section>
  );
};

export default Projects;
export { ProjectsCarousel };
export type { ProjectsProps, ProjectsCarouselProps };
