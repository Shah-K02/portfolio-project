import React, { useState, useMemo, useRef, useEffect, TouchEvent } from "react";
import { motion, useScroll, useTransform, Variants, useMotionValue, useSpring } from "framer-motion";
import { AnimationVariants } from "../types/animation";
import "./Projects.css";
import "../styles/sectionAnimation.css";

// Components
import ProjectModal from "./ProjectModal";
import CarouselNavigation from "./CarouselNavigation";
import PageIndicators from "./PageIndicators";
import ProjectFilter from "./ProjectFilter";
import Enhanced3DProjectCard from "./Enhanced3DProjectCard";

// Hooks - using built-in React hooks for simpler implementation

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
  const [currentPage, setCurrentPage] = useState<number>(0);
  
  // Responsive card count based on screen size
  const [visibleCards, setVisibleCards] = useState<number>(3);
  
  useEffect(() => {
    const updateCardCount = () => {
      if (window.innerWidth < 768) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };
    
    updateCardCount();
    window.addEventListener('resize', updateCardCount);
    return () => window.removeEventListener('resize', updateCardCount);
  }, []);

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

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / visibleCards);
  const visibleProjects = filteredProjects.slice(
    currentPage * visibleCards,
    (currentPage + 1) * visibleCards
  );
  
  const canGoNext = currentPage < totalPages - 1;
  const canGoPrevious = currentPage > 0;
  
  const goToNext = () => {
    if (canGoNext) setCurrentPage(prev => prev + 1);
  };
  
  const goToPrevious = () => {
    if (canGoPrevious) setCurrentPage(prev => prev - 1);
  };
  
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(0, Math.min(page, totalPages - 1)));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [canGoNext, canGoPrevious]);

  const gridRef = useRef<HTMLUListElement>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(0); // Reset to first page when category changes
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
  
  // Scroll progress animation
  const scrollProgress = useSpring(0, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { scrollYProgress } = useScroll({
    target: projectsRef,
    offset: ["start start", "end end"]
  });

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      scrollProgress.set(latest);
    });
  }, [scrollYProgress, scrollProgress]);

  const { scrollYProgress: sectionProgress } = useScroll({
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
      <motion.div 
        className="scroll-progress" 
        style={{ scaleX: scrollProgress }}
      />
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
