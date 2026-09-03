import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "react-feather";
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
  const [activeShot, setActiveShot] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  const screenshots = project?.screenshots ?? [];

  // Reset gallery state when the modal closes or a different project opens
  useEffect(() => {
    if (!isOpen) setFullscreenIndex(null);
  }, [isOpen]);

  useEffect(() => {
    setActiveShot(0);
    setFullscreenIndex(null);
  }, [project?.id]);

  const showNext = useCallback(() => {
    setFullscreenIndex((i) => (i === null ? null : (i + 1) % screenshots.length));
  }, [screenshots.length]);

  const showPrev = useCallback(() => {
    setFullscreenIndex((i) => (i === null ? null : (i - 1 + screenshots.length) % screenshots.length));
  }, [screenshots.length]);

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Focus management + keyboard controls
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFullscreenIndex((prev) => {
          if (prev !== null) return null;
          onClose();
          return prev;
        });
      } else if (e.key === 'ArrowRight') {
        showNext();
      } else if (e.key === 'ArrowLeft') {
        showPrev();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, showNext, showPrev]);

  if (!project) return null;

  const liveUrl = project.liveUrl || project.demoUrl || project.link;
  const githubUrl = project.githubUrl || project.repositoryUrl;
  const heroImage = screenshots[activeShot] || project.image;

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

              {/* Gallery — a large preview with a filmstrip beneath it */}
              {heroImage && (
                <div className="modal-gallery">
                  {screenshots.length > 0 ? (
                    <button
                      type="button"
                      className="modal-hero-shot"
                      onClick={() => setFullscreenIndex(activeShot)}
                      aria-label={`View full-size screenshot ${activeShot + 1} of ${project.title}`}
                    >
                      <img
                        src={heroImage}
                        alt={`${project.title} screenshot ${activeShot + 1}`}
                        className="modal-hero-shot-image"
                      />
                      <span className="modal-hero-shot-hint" aria-hidden="true">
                        <Maximize2 size={14} />
                        Enlarge
                      </span>
                    </button>
                  ) : (
                    <div className="modal-hero-shot modal-hero-shot--static">
                      <img
                        src={heroImage}
                        alt={project.title}
                        className="modal-hero-shot-image"
                      />
                    </div>
                  )}

                  {screenshots.length > 1 && (
                    <div className="modal-filmstrip" role="tablist" aria-label="Screenshots">
                      {screenshots.map((shot, index) => (
                        <button
                          key={`${project.id}-thumb-${index}`}
                          type="button"
                          role="tab"
                          aria-selected={index === activeShot}
                          className={`modal-filmstrip-item${index === activeShot ? ' is-active' : ''}`}
                          onClick={() => setActiveShot(index)}
                        >
                          <img
                            src={shot}
                            alt={`${project.title} thumbnail ${index + 1}`}
                            loading="lazy"
                          />
                        </button>
                      ))}
                    </div>
                  )}
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
            {fullscreenIndex !== null && (
              <motion.div
                className="fullscreen-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setFullscreenIndex(null)}
              >
                <button
                  className="fullscreen-close"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFullscreenIndex(null);
                  }}
                  aria-label="Close fullscreen"
                >
                  <X size={22} />
                </button>

                {screenshots.length > 1 && (
                  <>
                    <button
                      className="fullscreen-nav fullscreen-nav--prev"
                      onClick={(e) => {
                        e.stopPropagation();
                        showPrev();
                      }}
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft size={22} />
                    </button>
                    <button
                      className="fullscreen-nav fullscreen-nav--next"
                      onClick={(e) => {
                        e.stopPropagation();
                        showNext();
                      }}
                      aria-label="Next screenshot"
                    >
                      <ChevronRight size={22} />
                    </button>
                  </>
                )}

                <AnimatePresence mode="wait">
                  <motion.img
                    key={fullscreenIndex}
                    src={screenshots[fullscreenIndex]}
                    alt={`${project.title} screenshot ${fullscreenIndex + 1}`}
                    className="fullscreen-image"
                    initial={{ scale: 0.96, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.96, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    onClick={(e) => e.stopPropagation()} // Click on image does not close
                  />
                </AnimatePresence>

                {screenshots.length > 1 && (
                  <span className="fullscreen-counter">
                    {fullscreenIndex + 1} / {screenshots.length}
                  </span>
                )}
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
