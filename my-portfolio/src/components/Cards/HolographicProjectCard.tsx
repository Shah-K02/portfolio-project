import React from 'react';
import './HolographicProjectCard.css';
import { Project } from '../../types/project';
import { useAdmin } from '../../context/AdminContext';
import { ExternalLinkIcon, GitHubIcon } from '../Icons';
import { ChevronRight } from 'react-feather';

// Capitalise each word, handle hyphenated values like 'in-progress'
const formatStatus = (s: string) =>
  s.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

interface HolographicProjectCardProps {
  project: Project;
  index: number;
  onViewProject?: (project: Project) => void;
  onEdit?: (project: Project) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

const HolographicProjectCard: React.FC<HolographicProjectCardProps> = ({
  project,
  index,
  onViewProject,
  onEdit,
  onDelete,
  className = ''
}) => {
  const { isAdmin } = useAdmin();
  const displayImage = project.image || project.screenshots?.[0];
  const githubUrl = project.githubUrl || project.repositoryUrl;
  const liveUrl = project.liveUrl || project.demoUrl;
  const status = project.status;

  // Cap visible tech tags to avoid overflow
  const maxTags = 4;
  const visibleTags = project.technologies?.slice(0, maxTags) ?? [];
  const extraCount = (project.technologies?.length ?? 0) - maxTags;

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(`Delete "${project.title}"? This cannot be undone.`)) {
      onDelete?.(project.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(project);
  };

  return (
    <article
      className={`project-card ${className}`}
      style={{ animationDelay: `${index * 80}ms` }}
    >
      {/* Admin overlay — edit / delete */}
      {isAdmin && (
        <div className="project-card-admin-overlay" aria-label="Admin controls">
          <button
            className="card-admin-btn card-admin-btn--edit"
            onClick={handleEdit}
            aria-label={`Edit ${project.title}`}
            title="Edit project"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit
          </button>
          <button
            className="card-admin-btn card-admin-btn--delete"
            onClick={handleDelete}
            aria-label={`Delete ${project.title}`}
            title="Delete project"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
            Delete
          </button>
        </div>
      )}

      {/* Image */}
      {displayImage && (
        <div className="project-card-image-wrap">
          <img
            src={displayImage}
            alt={`${project.title} preview`}
            className="project-card-image"
            loading="lazy"
          />
          <div className="project-card-image-overlay" aria-hidden="true" />
          {status && (
            <span className={`project-card-status status-${status}`}>
              <span className="project-card-status-dot" aria-hidden="true" />
              {formatStatus(status)}
            </span>
          )}
        </div>
      )}

      {/* Body */}
      <div className="project-card-body">
        <div className="project-card-header">
          <h3 className="project-card-title">{project.title}</h3>
          {(project.year || project.category) && (
            <p className="project-card-meta">
              {project.year}
              {project.year && project.category && ' · '}
              {project.category}
            </p>
          )}
        </div>

        {/* Description */}
        <p className="project-card-description">{project.description}</p>

        {/* Tech tags */}
        {visibleTags.length > 0 && (
          <div className="project-card-tags">
            {visibleTags.map((tech) => (
              <span key={tech} className="project-card-tag">{tech}</span>
            ))}
            {extraCount > 0 && (
              <span className="project-card-tag tag-more">+{extraCount}</span>
            )}
          </div>
        )}
      </div>

      {/* Footer actions */}
      <div className="project-card-footer">
        {liveUrl && (
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card-cta"
            aria-label={`View live demo of ${project.title}`}
          >
            View live
            <ExternalLinkIcon size={14} />
          </a>
        )}
        <div className="project-card-links">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-card-link"
              aria-label={`View source code of ${project.title}`}
            >
              <GitHubIcon size={14} />
              Code
            </a>
          )}
          {onViewProject && (
            <button
              onClick={() => onViewProject(project)}
              className="project-card-link"
              aria-label={`View details of ${project.title}`}
            >
              Details
              <ChevronRight size={14} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};

export default HolographicProjectCard;
