import React, { useState, useRef, TouchEvent } from 'react';
import { motion, useMotionValue, useSpring, useTransform, Variants } from 'framer-motion';
import { Project } from '../types/project';
import { SpringConfig } from '../types/animation';
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
  
  // Mouse position tracking with spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Enhanced spring configuration for more natural movement
  const springConfig: SpringConfig = {
    stiffness: 150,
    damping: 15,
    mass: 0.1
  };
  
  // Spring animations for card rotation
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), springConfig);
  
  // Parallax effect for card elements
  const imageX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);
  const imageY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-15, 15]), springConfig);
  
  // Depth effect for content layers
  const titleZ = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), springConfig);
  const orbitZ = useSpring(useTransform(mouseX, [-0.5, 0.5], [-30, 30]), springConfig);
  
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
      case 'completed': return 'var(--color-detail)';
    case 'in-progress': return 'var(--color-accent-1)';
    case 'archived': return 'var(--color-accent-2)';
    default: return 'var(--color-accent-1)';
    }
  };
  
  // Define variants
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: i * 0.1
      }
    })
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
          perspective: '1000px'
        }}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        custom={index}
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
              style={{
                transform: `translateZ(${titleZ.get()}px)`,
                textShadow: isHovered 
                  ? '0 0 20px var(--color-accent-1), 0 0 40px var(--color-accent-1)' 
                  : '0 0 0px transparent'
              }}
              animate={{ 
                scale: isHovered ? 1.05 : 1,
                transition: { type: "spring", ...springConfig }
              }}
            >
              {project.title}
            </motion.h3>
            
            {/* Description */}
            <p className="project-description-3d">{project.description}</p>
            
            {/* Technology orbit */}
            <motion.div 
              className="tech-orbit"
              style={{ transform: `translateZ(${orbitZ.get()}px)` }}
            >
              {project.technologies?.slice(0, 4).map((tech, techIndex) => (
                <motion.span
                  key={tech}
                  className="tech-orb"
                  animate={{
                    scale: isHovered ? 1.1 : 1,
                    y: isHovered ? -5 : 0
                  }}
                  transition={{
                    type: "spring",
                    ...springConfig,
                    delay: techIndex * 0.1
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
            
            {/* Year badge with parallax */}
            <motion.div 
              className="year-badge"
              style={{
                x: imageX,
                y: imageY,
                filter: isHovered ? 'brightness(1.2) drop-shadow(0 0 10px var(--neon-cyan))' : 'none'
              }}
            >
              {project.year}
            </motion.div>
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