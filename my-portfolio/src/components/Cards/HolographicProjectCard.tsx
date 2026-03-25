import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './HolographicProjectCard.css';
import { Project } from '../../types/project';

interface HolographicProjectCardProps {
  project: Project;
  index: number;
  onViewProject?: (project: Project) => void;
  className?: string;
}

const HolographicProjectCard: React.FC<HolographicProjectCardProps> = ({
  project,
  index,
  onViewProject,
  className = ''
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Handle mouse movement for 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const x = (e.clientX - centerX) / rect.width;
    const y = (e.clientY - centerY) / rect.height;
    
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  // Generate holographic pattern data
  const hologramPatterns = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2
  }));

  const displayImage = project.image || project.screenshots?.[0] || 'https://via.placeholder.com/400x250/667eea/ffffff?text=Project+Image';
  const githubUrl = project.githubUrl || project.repositoryUrl;
  const liveUrl = project.liveUrl || project.demoUrl;

  return (
    <motion.div
      className={`holographic-card ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${mousePosition.y * 15}deg) rotateY(${mousePosition.x * 15}deg)`,
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
    >
      {/* Holographic background layer */}
      <motion.div
        className="holo-background"
        animate={{
          background: isHovered 
            ? `conic-gradient(from ${index * 60}deg at 50% 50%, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4, #feca57, #ff9ff3, #54a0ff, #ff6b6b)`
            : `conic-gradient(from 0deg at 50% 50%, rgba(78, 205, 196, 0.1), rgba(255, 107, 107, 0.05), rgba(69, 183, 209, 0.1))`
        }}
      />

      {/* Iridescent overlay */}
      <motion.div
        className="iridescent-overlay"
        style={{
          background: `radial-gradient(circle at ${50 + mousePosition.x * 30}% ${50 + mousePosition.y * 30}%, 
            rgba(255, 107, 107, ${0.1 + (isHovered ? 0.2 : 0)}) 0%, 
            rgba(78, 205, 196, ${0.1 + (isHovered ? 0.15 : 0)}) 25%, 
            rgba(69, 183, 209, ${0.1 + (isHovered ? 0.2 : 0)}) 50%, 
            rgba(150, 206, 180, ${0.1 + (isHovered ? 0.1 : 0)}) 75%, 
            transparent 100%)`,
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
        }}
      />

      {/* Holographic particles */}
      <div className="holo-particles">
        {hologramPatterns.map((pattern) => (
          <motion.div
            key={pattern.id}
            className="holo-particle"
            style={{
              left: `${pattern.x}%`,
              top: `${pattern.y}%`,
              width: `${pattern.size}px`,
              height: `${pattern.size}px`,
            }}
            animate={{
              opacity: isHovered ? [0.2, 1, 0.2] : [0.1, 0.3, 0.1],
              scale: isHovered ? [0.5, 1.5, 0.5] : [0.5, 1, 0.5],
              rotate: [0, 360]
            }}
            transition={{
              duration: pattern.duration,
              repeat: Infinity,
              delay: pattern.delay,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Reflection effects */}
      <motion.div
        className="reflection-layer"
        style={{
          background: `linear-gradient(${135 + mousePosition.x * 45}deg, 
            rgba(255, 255, 255, 0.1) 0%, 
            rgba(255, 255, 255, 0.05) 25%, 
            transparent 50%, 
            rgba(255, 255, 255, 0.05) 75%, 
            rgba(255, 255, 255, 0.1) 100%)`,
          transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`
        }}
      />

      {/* Card content */}
      <div className="card-content">
        {/* Project image with holographic border */}
        {displayImage && (
          <motion.div 
            className="project-image-container"
            style={{
              transform: `translateZ(20px) rotateX(${mousePosition.y * 5}deg) rotateY(${mousePosition.x * 5}deg)`
            }}
          >
            <div className="holo-image-border" />
            <img
              src={displayImage}
              alt={project.title}
              className="project-image"
              loading="lazy"
            />
            <div className="image-glow" />
          </motion.div>
        )}

        {/* Project info */}
        <motion.div 
          className="project-info"
          style={{
            transform: `translateZ(10px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`
          }}
        >
          <h3 className="project-title">{project.title}</h3>
          <p className="project-description">{project.description}</p>
          
          {/* Technologies with holographic tags */}
          <div className="tech-stack">
            {project.technologies?.map((tech, techIndex) => (
              <motion.span
                key={tech}
                className="tech-tag"
                whileHover={{ scale: 1.1, rotateZ: 5 }}
                animate={{
                  boxShadow: isHovered 
                    ? `0 0 20px hsla(${260 + techIndex * 30}, 70%, 60%, 0.5)`
                    : '0 0 0px transparent'
                }}
                transition={{ delay: techIndex * 0.1 }}
              >
                {tech}
              </motion.span>
            )) || []}
          </div>
        </motion.div>

        {/* Action buttons with holographic effects */}
        <motion.div 
          className="card-actions"
          style={{
            transform: `translateZ(30px) rotateX(${mousePosition.y * 3}deg) rotateY(${mousePosition.x * 3}deg)`
          }}
        >
          {liveUrl && (
            <motion.a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="holo-button primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="button-text">View Live</span>
              <div className="button-glow" />
            </motion.a>
          )}
          
          {githubUrl && (
            <motion.a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="holo-button secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="button-text">Code</span>
              <div className="button-glow" />
            </motion.a>
          )}
          
          {onViewProject && (
            <motion.button
              onClick={() => onViewProject(project)}
              className="holo-button tertiary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="button-text">Details</span>
              <div className="button-glow" />
            </motion.button>
          )}
        </motion.div>
      </div>

      {/* Glitch effect overlay */}
      <motion.div
        className="glitch-overlay"
        animate={{
          opacity: isHovered ? [0, 0.1, 0] : 0,
          x: isHovered ? [0, 2, -2, 0] : 0
        }}
        transition={{
          duration: 0.1,
          repeat: isHovered ? Infinity : 0,
          repeatDelay: Math.random() * 2 + 1
        }}
      />

      {/* Floating data visualization */}
      <motion.div
        className="floating-data"
        animate={{
          opacity: isHovered ? 0.7 : 0,
          y: isHovered ? [-10, 10, -10] : 0
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="data-line" />
        <div className="data-points">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="data-point"
              animate={{
                scale: isHovered ? [0.5, 1.2, 0.5] : 0.5,
                opacity: isHovered ? [0.3, 1, 0.3] : 0
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Edge glow effect */}
      <motion.div
        className="edge-glow"
        style={{
          boxShadow: isHovered 
            ? `0 0 ${20 + 30}px hsla(${260 + index * 30}, 70%, 60%, 0.7), 
               0 0 ${40 + 60}px hsla(${260 + index * 30}, 70%, 60%, 0.3), 
               inset 0 0 ${20 + 20}px hsla(${260 + index * 30}, 70%, 60%, 0.25)`
            : '0 0 0px transparent'
        }}
      />
    </motion.div>
  );
};

export default HolographicProjectCard;
