import React, { useState, useMemo } from "react";
import "./Projects.css";
import "../styles/sectionAnimation.css";

// Components
import ProjectModal from "./ProjectModal";
import ProjectFilter from "./ProjectFilter";
import HolographicProjectCard from "./Cards/HolographicProjectCard";

// Types
import { Project } from "../types/project";

// Constants
import { PROJECTS_DATA } from "../constants/projectsData";

// Utils
import { getUniqueCategories } from "../utils/projectUtils";

interface ProjectsProps {
  projects?: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects = PROJECTS_DATA }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filtered & sorted projects
  const filteredProjects = useMemo(() => {
    const filtered =
      selectedCategory === "all"
        ? projects
        : projects.filter((p) => p.category === selectedCategory);
    return [...filtered].sort((a, b) => (b.year || 0) - (a.year || 0));
  }, [projects, selectedCategory]);

  // Categories for filter bar
  const categories = useMemo(() => getUniqueCategories(projects), [projects]);

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        {/* Section header */}
        <header className="projects-header">
          <h2 className="projects-title">My Projects</h2>
          <p className="projects-subtitle">
            A collection of my recent work and personal projects
          </p>
        </header>

        {/* Category filter */}
        <ProjectFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
        />

        {/* Projects grid */}
        {filteredProjects.length === 0 ? (
          <div className="projects-empty" role="alert">
            No projects in this category yet.
          </div>
        ) : (
          <ul className="projects-grid">
            {filteredProjects.map((project, idx) => (
              <li key={project.id} style={{ listStyle: "none" }}>
                <HolographicProjectCard
                  project={project}
                  index={idx}
                  onViewProject={handleViewProject}
                />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Project detail modal */}
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
export type { ProjectsProps };
