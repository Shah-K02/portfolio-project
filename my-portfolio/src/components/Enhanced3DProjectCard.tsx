import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Project } from '../types/project';
import MagneticCursor from './MagneticCursor';
import './Enhanced3DProjectCard.css';

interface Enhanced3DProjectCardProps {
  project: Project;
  onViewProject: (project: Project) => void;
  index: number;
}

const Enhanced3DProjectCard: React.FC<Enhanced3DProjectCardProps> = ({
  project,
  onViewProject,
  index
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring animations for smooth movement
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]));
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'var(--matrix-green, #00ff88)';
      case 'in-progress': return 'var(--electric-blue, #0066ff)';
      case 'archived': return 'var(--quantum-purple, #6366f1)';
      default: return 'var(--neon-cyan, #00f5ff)';
    }
  };
  
  return (
    <MagneticCursor strength={0.1}>
      <motion.div
        ref={cardRef}
        className="enhanced-3d-card"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        whileHover={{ scale: 1.02 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Card Front */}
        <motion.div
          className="card-face card-front"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6 }}
          style={{
            backfaceVisibility: 'hidden',
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        >
          <div className="card-content">
            {/* Holographic border effect */}
            <div className="holographic-border" />
            
            {/* Status indicator */}
            <div
              className="status-indicator"
              style={{ backgroundColor: getStatusColor(project.status || 'completed') }}
            >
              {project.status || 'completed'}
            </div>
            
            {/* Project title with glow effect */}
            <motion.h3 
              className="project-title-3d"
              animate={{ 
                textShadow: isHovered 
                  ? '0 0 20px var(--neon-cyan, #00f5ff)' 
                  : '0 0 0px transparent'
              }}
            >
              {project.title}
            </motion.h3>
            
            {/* Description */}
            <p className="project-description-3d">{project.description}</p>
            
            {/* Technology orbit */}
            <div className="tech-orbit">
              {project.technologies?.slice(0, 4).map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  className="tech-orb"
                  animate={{
                    scale: isHovered ? 1.05 : 1,
                  }}
                  transition={{
                    duration: 0.3,
                    delay: techIndex * 0.1,
                    ease: 'easeOut'
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
            
            {/* Year badge */}
            <div className="year-badge">{project.year}</div>
          </div>
        </motion.div>
        
        {/* Card Back */}
        <motion.div
          className="card-face card-back"
          animate={{ rotateY: isFlipped ? 0 : -180 }}
          transition={{ duration: 0.6 }}
          style={{
            backfaceVisibility: 'hidden',
            position: 'absolute',
            width: '100%',
            height: '100%',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="card-content">
            <div className="holographic-border" />
            
            <h4 className="project-details-title">Project Details</h4>
            <p className="project-long-description">{project.longDescription}</p>
            
            <div className="action-buttons">
              <motion.button
                className="action-btn primary"
                whileHover={{ scale: 1.05, boxShadow: '0 0 25px var(--neon-cyan)' }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  onViewProject(project);
                }}
              >
                View Details
              </motion.button>
              
              {project.demoUrl && (
                <motion.a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn secondary"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 25px var(--electric-blue)' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  Live Demo
                </motion.a>
              )}
            </div>
            
            <div className="all-technologies">
              {project.technologies?.map((tech, techIndex) => (
                <span key={tech} className="tech-tag-3d">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Floating particles effect */}
        {isHovered && (
          <div className="floating-particles">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  y: [-20, -60],
                  x: [0, Math.random() * 40 - 20]
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>
    </MagneticCursor>
  );
};

export default Enhanced3DProjectCard;