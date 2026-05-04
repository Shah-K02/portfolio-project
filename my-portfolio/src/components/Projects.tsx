import React, { useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
import "./Projects.css";
import "../styles/sectionAnimation.css";

// Components
import ProjectModal from "./ProjectModal";
import ProjectFilter from "./ProjectFilter";
import HolographicProjectCard from "./Cards/HolographicProjectCard";
import AdminPanel from "./Admin/AdminPanel";
import ProjectFormModal from "./Admin/ProjectFormModal";

// Types
import { Project } from "../types/project";

// Context
import { useAdmin } from "../context/AdminContext";

// Utils
import { getUniqueCategories } from "../utils/projectUtils";

// Animation Variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 }
  },
};

const Projects: React.FC = () => {
  const { isAdmin, projects, deleteProject, loading } = useAdmin();

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isDetailModalOpen, setIsDetailModalOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Form modal state
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

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

  // Detail modal
  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedProject(null);
  };

  // Admin: open form to add new
  const handleAddProject = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  // Admin: open form to edit existing
  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  // Admin: delete project
  const handleDeleteProject = async (id: string) => {
    await deleteProject(id);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProject(null);
  };

  return (
    <section className="projects-section" id="projects">
      {/* Floating admin toolbar — only visible when logged in */}
      {isAdmin && <AdminPanel onAddProject={handleAddProject} />}

      <div className="projects-container">
        {/* Section header */}
        <motion.header 
          className="projects-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="projects-title">My Projects</h2>
          <p className="projects-subtitle">
            A collection of my recent work and personal projects
          </p>
        </motion.header>

        {/* Category filter */}
        <ProjectFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {/* Projects grid */}
        {loading ? (
          <div className="projects-loading" role="status" aria-label="Loading projects">
            <span className="projects-loading__spinner" aria-hidden="true" />
            <span>Loading projects…</span>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="projects-empty" role="alert">
            No projects in this category yet.
          </div>
        ) : (
          <motion.ul 
            className="projects-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          >
            {filteredProjects.map((project, idx) => (
              <motion.li key={project.id} style={{ listStyle: "none" }} variants={itemVariants}>
                <HolographicProjectCard
                  project={project}
                  index={idx}
                  onViewProject={handleViewProject}
                  onEdit={isAdmin ? handleEditProject : undefined}
                  onDelete={isAdmin ? handleDeleteProject : undefined}
                />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>

      {/* Project detail modal */}
      {isDetailModalOpen && selectedProject && (
        <ProjectModal
          project={selectedProject}
          isOpen={isDetailModalOpen}
          onClose={handleCloseDetailModal}
        />
      )}

      {/* Admin: project form modal */}
      {isAdmin && (
        <ProjectFormModal
          isOpen={isFormOpen}
          onClose={handleCloseForm}
          editingProject={editingProject}
        />
      )}
    </section>
  );
};

export default Projects;
