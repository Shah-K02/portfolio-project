import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, Pause, GitHub, Code, Monitor, Smartphone, Tablet, Maximize2, X, ChevronLeft, ChevronRight, ExternalLink } from 'react-feather';
import './EnhancedProjectShowcase.css';
import { Project } from '../types/project';

interface EnhancedProjectShowcaseProps {
  project: Project;
  onClose: () => void;
}

const EnhancedProjectShowcase: React.FC<EnhancedProjectShowcaseProps> = ({ project, onClose }) => {
  const [currentScreenshot, setCurrentScreenshot] = useState(0);
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [10, -10]));
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-10, 10]));

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextScreenshot = () => {
    setCurrentScreenshot((prev) =>
      prev === (project.screenshots?.length || 1) - 1 ? 0 : prev + 1
    );
  };

  const prevScreenshot = () => {
    setCurrentScreenshot((prev) =>
      prev === 0 ? (project.screenshots?.length || 1) - 1 : prev - 1
    );
  };

  const getDeviceClass = () => {
    switch (viewMode) {
      case 'tablet': return 'tablet-view';
      case 'mobile': return 'mobile-view';
      default: return 'desktop-view';
    }
  };

  // Mock demo data - in a real app, this would come from the project data
  const demoFeatures = [
    {
      id: 'feature1',
      title: 'User Authentication',
      description: 'Secure login and registration system with JWT tokens',
      interactive: true,
      demoUrl: '#'
    },
    {
      id: 'feature2',
      title: 'Real-time Dashboard',
      description: 'Live data updates with WebSocket connections',
      interactive: true,
      demoUrl: '#'
    },
    {
      id: 'feature3',
      title: 'Responsive Design',
      description: 'Optimized for all device sizes and orientations',
      interactive: false,
      demoUrl: '#'
    }
  ];

  return (
    <motion.div
      className="enhanced-showcase-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={`enhanced-showcase ${isFullscreen ? 'fullscreen' : ''}`}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: isFullscreen ? 0 : rotateX,
          rotateY: isFullscreen ? 0 : rotateY,
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Header */}
        <div className="showcase-header">
          <div className="showcase-title-section">
            <h2 className="showcase-title">{project.title}</h2>
            <span className="showcase-status">{project.status}</span>
          </div>
          <div className="showcase-controls">
            <button 
              className="control-btn"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            >
              {isFullscreen ? <X size={20} /> : <Maximize2 size={20} />}
            </button>
            <button className="control-btn close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="showcase-content">
          {/* Left Panel - Project Info */}
          <div className="showcase-sidebar">
            <div className="project-info">
              <h3>Project Overview</h3>
              <p className="project-description">{project.longDescription}</p>
              
              <div className="project-links">
                {project.demoUrl && (
                  <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link demo">
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
                {project.repositoryUrl && (
                  <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer" className="project-link repo">
                    <GitHub size={16} />
                    Source Code
                  </a>
                )}
              </div>

              <div className="tech-stack">
                <h4>Technologies Used</h4>
                <div className="tech-tags">
                  {project.technologies?.map((tech) => (
                    <span key={tech} className="tech-tag">{tech}</span>
                  )) || []}
                </div>
              </div>

              <div className="demo-features">
                <h4>Key Features</h4>
                <div className="features-list">
                  {demoFeatures.map((feature) => (
                    <motion.div
                      key={feature.id}
                      className="feature-item"
                      whileHover={{ x: 5 }}
                    >
                      <div className="feature-content">
                        <h5>{feature.title}</h5>
                        <p>{feature.description}</p>
                      </div>
                      {feature.interactive && (
                        <button className="feature-demo-btn">
                          <Code size={14} />
                          Try
                        </button>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Interactive Demo */}
          <div className="showcase-main">
            {/* Device View Controls */}
            <div className="device-controls">
              <div className="view-modes">
                <button 
                  className={`view-btn ${viewMode === 'desktop' ? 'active' : ''}`}
                  onClick={() => setViewMode('desktop')}
                >
                  <Monitor size={16} />
                  Desktop
                </button>
                <button 
                  className={`view-btn ${viewMode === 'tablet' ? 'active' : ''}`}
                  onClick={() => setViewMode('tablet')}
                >
                  <Tablet size={16} />
                  Tablet
                </button>
                <button 
                  className={`view-btn ${viewMode === 'mobile' ? 'active' : ''}`}
                  onClick={() => setViewMode('mobile')}
                >
                  <Smartphone size={16} />
                  Mobile
                </button>
              </div>
            </div>

            {/* Demo Viewport */}
            <div className={`demo-viewport ${getDeviceClass()}`}>
              <div className="device-frame">
                <div className="device-screen">
                  {/* Screenshot Carousel */}
                  <div className="screenshot-container">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentScreenshot}
                        src={project.screenshots?.[currentScreenshot] || ''}
                        alt={`${project.title} screenshot ${currentScreenshot + 1}`}
                        className="screenshot"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                      />
                    </AnimatePresence>
                    
                    {project.screenshots && project.screenshots.length > 1 && (
                      <>
                        <button className="nav-btn prev" onClick={prevScreenshot}>
                          <ChevronLeft size={20} />
                        </button>
                        <button className="nav-btn next" onClick={nextScreenshot}>
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </div>

                  {/* Video Demo (if available) */}
                  {project.demoUrl && (
                    <div className="video-demo">
                      <video
                        ref={videoRef}
                        className="demo-video"
                        poster={project.screenshots?.[0] || ''}
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                      >
                        <source src="/demo-video.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <button className="video-control" onClick={toggleVideo}>
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Screenshot Thumbnails */}
            {project.screenshots && project.screenshots.length > 1 && (
              <div className="screenshot-thumbnails">
                {project.screenshots.map((screenshot, index) => (
                  <motion.button
                    key={index}
                    className={`thumbnail ${index === currentScreenshot ? 'active' : ''}`}
                    onClick={() => setCurrentScreenshot(index)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={screenshot} alt={`Thumbnail ${index + 1}`} />
                  </motion.button>
                ))}
              </div>
            )}

            {/* Interactive Elements */}
            <div className="interactive-elements">
              <div className="performance-metrics">
                <h4>Performance Metrics</h4>
                <div className="metrics-grid">
                  <div className="metric">
                    <span className="metric-value">95</span>
                    <span className="metric-label">Performance</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">98</span>
                    <span className="metric-label">Accessibility</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">92</span>
                    <span className="metric-label">Best Practices</span>
                  </div>
                  <div className="metric">
                    <span className="metric-value">100</span>
                    <span className="metric-label">SEO</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EnhancedProjectShowcase;