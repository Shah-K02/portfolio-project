// Projects.tsx
import React, { useState } from "react";
import "./Projects.css";
import { motion } from "framer-motion";
import { LeftArrowIcon, RightArrowIcon } from "./Icons";
import {
  useResponsiveCardCount,
  useCarousel,
  useKeyboardNavigation,
  useModal,
} from "../hooks";
import { Project } from "../types/project";
import ProjectModal from "./ProjectModal";

const CARD_COLORS = [
  "#f8b195", // light pink
  "#f67280", // pink
  "#c06c84", // mauve
  "#6c5b7b", // purple
  "#355c7d", // blue
  "#99b898", // green
] as const;

// Enhanced sample projects data with modal information
const projects: Project[] = [
  {
    id: "project-1",
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform with advanced features.",
    longDescription:
      "A full-stack e-commerce platform built with React and Node.js, featuring user authentication, payment processing, inventory management, and real-time analytics. The platform supports multiple payment gateways and includes an admin dashboard for managing products and orders.",
    link: "https://example.com/project-one",
    repositoryUrl: "https://github.com/user/ecommerce-platform",
    demoUrl: "https://demo.ecommerce-platform.com",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "Express"],
    screenshots: [
      "https://via.placeholder.com/800x500/667eea/ffffff?text=Homepage",
      "https://via.placeholder.com/800x500/764ba2/ffffff?text=Product+Page",
      "https://via.placeholder.com/800x500/f67280/ffffff?text=Dashboard",
    ],
    status: "completed",
    category: "Web Development",
    year: 2024,
  },
  {
    id: "project-2",
    title: "Task Management App",
    description: "Collaborative task management with real-time updates.",
    longDescription:
      "A comprehensive task management application that enables teams to collaborate effectively. Features include drag-and-drop task boards, real-time notifications, file attachments, time tracking, and detailed reporting. Built with modern web technologies for optimal performance.",
    link: "https://example.com/project-two",
    repositoryUrl: "https://github.com/user/task-manager",
    demoUrl: "https://demo.taskmanager.com",
    technologies: [
      "React",
      "TypeScript",
      "Socket.io",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    screenshots: [
      "https://via.placeholder.com/800x500/48bb78/ffffff?text=Task+Board",
      "https://via.placeholder.com/800x500/ed8936/ffffff?text=Calendar+View",
    ],
    status: "in-progress",
    category: "Productivity",
    year: 2024,
  },
  {
    id: "project-3",
    title: "Weather Analytics Dashboard",
    description: "Real-time weather data visualization and analytics.",
    longDescription:
      "An advanced weather analytics dashboard that aggregates data from multiple weather APIs to provide comprehensive weather insights. Features interactive charts, historical data analysis, weather alerts, and customizable widgets for different locations.",
    repositoryUrl: "https://github.com/user/weather-dashboard",
    technologies: ["React", "D3.js", "Python", "FastAPI", "Redis"],
    screenshots: [
      "https://via.placeholder.com/800x500/4ecdc4/ffffff?text=Weather+Dashboard",
    ],
    status: "completed",
    category: "Data Visualization",
    year: 2023,
  },
  {
    id: "project-4",
    title: "Mobile Fitness Tracker",
    description: "Cross-platform mobile app for fitness tracking.",
    longDescription:
      "A comprehensive fitness tracking application built with React Native. Includes workout planning, progress tracking, social features, and integration with popular fitness devices. The app uses machine learning to provide personalized workout recommendations.",
    demoUrl: "https://fitness-tracker-demo.com",
    repositoryUrl: "https://github.com/user/fitness-tracker",
    technologies: ["React Native", "Firebase", "TensorFlow", "Redux"],
    screenshots: [
      "https://via.placeholder.com/400x800/ff6b6b/ffffff?text=Home+Screen",
      "https://via.placeholder.com/400x800/4ecdc4/ffffff?text=Workout+Screen",
    ],
    status: "completed",
    category: "Mobile Development",
    year: 2023,
  },
  {
    id: "project-5",
    title: "AI Content Generator",
    description: "AI-powered content creation and optimization tool.",
    longDescription:
      "An intelligent content generation platform that uses advanced AI models to create, optimize, and analyze content. Features include SEO optimization, multiple content formats, plagiarism detection, and performance analytics.",
    repositoryUrl: "https://github.com/user/ai-content-generator",
    technologies: ["Python", "OpenAI API", "Flask", "React", "PostgreSQL"],
    status: "in-progress",
    category: "Artificial Intelligence",
    year: 2024,
  },
  {
    id: "project-6",
    title: "Blockchain Voting System",
    description: "Secure and transparent voting system using blockchain.",
    longDescription:
      "A decentralized voting platform built on blockchain technology to ensure transparency and security in electoral processes. Features voter authentication, immutable vote recording, real-time results, and comprehensive audit trails.",
    repositoryUrl: "https://github.com/user/blockchain-voting",
    technologies: ["Solidity", "Web3.js", "Ethereum", "React", "IPFS"],
    status: "archived",
    category: "Blockchain",
    year: 2022,
  },
];

// Project Card Component
const ProjectCard: React.FC<{
  project: Project;
  colorIndex: number;
  index: number;
  onViewProject: (project: Project) => void;
}> = React.memo(({ project, colorIndex, index, onViewProject }) => (
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

      <div className="projects-card-tech">
        {project.technologies?.slice(0, 3).map((tech, idx) => (
          <span key={idx} className="tech-tag">
            {tech}
          </span>
        ))}
        {project.technologies && project.technologies.length > 3 && (
          <span className="tech-tag more">
            +{project.technologies.length - 3}
          </span>
        )}
      </div>

      <div className="projects-card-footer">
        <span className="projects-card-year">{project.year}</span>
        <button
          className="projects-card-link"
          onClick={() => onViewProject(project)}
          aria-label={`View details for ${project.title}`}
        >
          View Project
        </button>
      </div>
    </div>
  </motion.li>
));

ProjectCard.displayName = "ProjectCard";

// Carousel Navigation Component
const CarouselNavigation: React.FC<{
  onPrevious: () => void;
  onNext: () => void;
  canNavigatePrevious: boolean;
  canNavigateNext: boolean;
}> = ({ onPrevious, onNext, canNavigatePrevious, canNavigateNext }) => (
  <>
    <button
      className="carousel-arrow left"
      onClick={onPrevious}
      disabled={!canNavigatePrevious}
      aria-label="Previous projects"
    >
      <LeftArrowIcon />
    </button>
    <button
      className="carousel-arrow right"
      onClick={onNext}
      disabled={!canNavigateNext}
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

// Filter Component
const ProjectFilter: React.FC<{
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}> = ({ categories, selectedCategory, onCategoryChange }) => (
  <div className="project-filter">
    <button
      className={`filter-btn ${selectedCategory === "all" ? "active" : ""}`}
      onClick={() => onCategoryChange("all")}
    >
      All Projects
    </button>
    {categories.map((category) => (
      <button
        key={category}
        className={`filter-btn ${
          selectedCategory === category ? "active" : ""
        }`}
        onClick={() => onCategoryChange(category)}
      >
        {category}
      </button>
    ))}
  </div>
);

// Main Carousel Component
const ProjectsCarousel: React.FC<{
  projects: Project[];
  onViewProject: (project: Project) => void;
}> = ({ projects, onViewProject }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const visibleCards = useResponsiveCardCount();

  // Filter projects based on selected category
  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  // Get unique categories
  const categories = Array.from(
    new Set(
      projects
        .map((project) => project.category)
        .filter((cat): cat is string => typeof cat === "string")
    )
  );

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

  if (projects.length === 0) {
    return <div className="projects-empty">No projects to display</div>;
  }

  return (
    <div className="projects-carousel-container">
      <ProjectFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
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
            key={selectedCategory} // Re-animate when category changes
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {visibleProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                colorIndex={currentPage * visibleCards + idx}
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
const Projects: React.FC<{ projects?: Project[] }> = ({
  projects: projectsProp = projects,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleViewProject = (project: Project) => {
    openModal(project);
  };

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        <motion.header
          className="projects-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="projects-title">
            <span>My Projects</span>
          </h2>
          <p className="projects-subtitle">
            A collection of my recent work and personal projects
          </p>
        </motion.header>

        <ProjectsCarousel
          projects={projectsProp}
          onViewProject={handleViewProject}
        />
      </div>

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </section>
  );
};

export default Projects;
export { ProjectsCarousel, type Project };
