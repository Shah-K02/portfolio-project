import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { AnimationVariants } from "../types/animation";
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
  useFLIPAnimation
} from "../hooks";

// Types
import { Project } from "../types/project";

// Constants
import { PROJECTS_DATA } from "../constants/projectsData";

// Utils
import { getUniqueCategories } from "../utils/projectUtils";

// Animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const carouselVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
};

const projectCardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  })
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

  // Memoized filtered and sorted projects
  const filteredProjects = useMemo(() => {
    const filtered = selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);
    
    // Sort by year in descending order (newest first)
    return filtered.sort((a, b) => (b.year || 0) - (a.year || 0));
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

  const gridRef = useRef<HTMLUListElement>(null);
  const { recordPosition, playAnimation } = useFLIPAnimation({
    duration: 0.6,
    ease: "anticipate"
  });

  // Record positions before category change
  useEffect(() => {
    if (!gridRef.current) return;
    
    const cards = Array.from(gridRef.current.children);
    cards.forEach((card, index) => {
      if (card instanceof HTMLElement) {
        recordPosition(`card-${index}`, card);
      }
    });
  }, [selectedCategory, recordPosition]);

  const handleCategoryChange = (category: string) => {
    // Record current positions
    if (gridRef.current) {
      const cards = Array.from(gridRef.current.children);
      cards.forEach((card, index) => {
        if (card instanceof HTMLElement) {
          recordPosition(`card-${index}`, card);
        }
      });
    }

    setSelectedCategory(category);

    // Play FLIP animation after state update
    requestAnimationFrame(() => {
      playAnimation();
    });
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
            ref={gridRef}
            className="projects-grid"
            role="list"
            key={selectedCategory}
            variants={carouselVariants}
            initial="hidden"
            animate="visible"
            layoutId="projects-grid"
          >
            {visibleProjects.map((project, idx) => (
                 <motion.li
                   key={project.id}
                   variants={projectCardVariants}
                   custom={idx}
                   initial="hidden"
                   animate="visible"
                   layout
                   style={{ listStyle: 'none' }}
                 >
                   <Enhanced3DProjectCard
                     project={project}
                     index={idx}
                     onViewProject={onViewProject}
                   />
                 </motion.li>
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
