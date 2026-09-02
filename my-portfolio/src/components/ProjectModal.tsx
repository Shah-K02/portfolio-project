import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "react-feather";
import { Project } from "../types/project";
import { ExternalLinkIcon, GitHubIcon } from "./Icons";
import "./ProjectModal.css";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const formatStatus = (s: string) =>
  s.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  // Reset fullscreen when modal closes
  useEffect(() => {
    if (!isOpen) setFullscreenImage(null);
  }, [isOpen]);

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Focus management + Escape key
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFullscreenImage((prev) => {
          if (prev) return null;
          onClose();
          return prev;
        });
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!project) return null;

  const liveUrl = project.liveUrl || project.demoUrl || project.link;
  const githubUrl = project.githubUrl || project.repositoryUrl;

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.96,
      y: 24,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 28,
        stiffness: 320,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.96,
      y: 24,
      transition: {
        duration: 0.15,
      },
    },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleBackdropClick}
        >
          <motion.div
            ref={modalRef}
            className="modal-container"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="modal-close"
              onClick={onClose}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            {/* Modal Content */}
            <div className="modal-content">
              {/* Header */}
              <div className="modal-header">
                {project.status && (
                  <span className={`modal-status status-${project.status}`}>
                    <span className="modal-status-dot" aria-hidden="true" />
                    {formatStatus(project.status)}
                  </span>
                )}
                <h2 id="modal-title" className="modal-title">
                  {project.title}
                </h2>
                {(project.year || project.category) && (
                  <p className="modal-meta">
                    {project.year}
                    {project.year && project.category && ' · '}
                    {project.category}
                  </p>
                )}
              </div>

              {/* Screenshots */}
              {project.screenshots && project.screenshots.length > 0 && (
                <div className="modal-screenshots">
                  <div className="screenshots-grid">
                    {project.screenshots.map((screenshot, index) => (
                      <div key={`${project.id}-screenshot-${index}`} className="screenshot-container">
                        <img
                          src={screenshot}
                          alt={`${project.title} screenshot ${index + 1}`}
                          className="screenshot-image"
                          loading="lazy"
                          onClick={() => setFullscreenImage(screenshot)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="modal-description">
                <p>{project.longDescription || project.description}</p>
              </div>

              {/* Technologies */}
              {project.technologies && project.technologies.length > 0 && (
                <div className="modal-technologies">
                  <span className="eyebrow">Stack</span>
                  <div className="tech-tags">
                    {project.technologies.map((tech, index) => (
                      <span key={`${project.id}-tech-${index}`} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="modal-actions">
                {liveUrl && (
                  <a
                    href={liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-cta"
                  >
                    View live
                    <ExternalLinkIcon size={15} />
                  </a>
                )}
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="modal-link"
                  >
                    <GitHubIcon size={15} />
                    View code
                  </a>
                )}
              </div>
            </div>
          </motion.div>

          {/* Fullscreen Image Overlay */}
          <AnimatePresence>
            {fullscreenImage && (
              <motion.div
                className="fullscreen-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFullscreenImage(null)}
              >
                <button
                  className="fullscreen-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFullscreenImage(null);
                  }}
                  aria-label="Close fullscreen"
                >
                  <X size={24} />
                </button>
                <motion.img
                  src={fullscreenImage}
                  alt="Fullscreen screenshot"
                  className="fullscreen-image"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  onClick={(e) => e.stopPropagation()} // Click on image does not close
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;
