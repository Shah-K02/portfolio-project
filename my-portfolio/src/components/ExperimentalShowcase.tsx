import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Import the new experimental components
import LiquidMorphNavigation from './Navigation/LiquidMorphNavigation';
import NeuralNetworkBackground from './Interactive/NeuralNetworkBackground';
import HolographicProjectCard from './Cards/HolographicProjectCard';

// Sample project data for demonstration
const sampleProjects = [
  {
    id: '1',
    title: 'Neural AI Dashboard',
    description: 'Interactive dashboard powered by machine learning algorithms with real-time data visualization and predictive analytics.',
    technologies: ['React', 'TensorFlow.js', 'D3.js', 'WebGL', 'Python'],
    image: '/api/placeholder/400/250',
    liveUrl: '#',
    githubUrl: '#',
    category: 'AI/ML',
    year: 2024
  },
  {
    id: '2',
    title: 'Quantum Portfolio',
    description: 'Experimental portfolio using quantum-inspired animations and holographic interfaces for next-generation web experiences.',
    technologies: ['TypeScript', 'Three.js', 'Framer Motion', 'WebGL', 'CSS Houdini'],
    image: '/api/placeholder/400/250',
    liveUrl: '#',
    githubUrl: '#',
    category: 'Experimental',
    year: 2024
  },
  {
    id: '3',
    title: 'Liquid Interface System',
    description: 'Fluid UI components that morph and adapt based on user interactions, creating an organic and intuitive experience.',
    technologies: ['React', 'GSAP', 'Canvas API', 'Web Animations', 'TypeScript'],
    image: '/api/placeholder/400/250',
    liveUrl: '#',
    githubUrl: '#',
    category: 'UI/UX',
    year: 2024
  }
];

const navigationItems = [
  { id: 'home', label: 'Home', section: 'home' },
  { id: 'neural', label: 'Neural Net', section: 'neural' },
  { id: 'projects', label: 'Holographic Projects', section: 'projects' },
  { id: 'liquid', label: 'Liquid UI', section: 'liquid' },
  { id: 'contact', label: 'Contact', section: 'contact' }
];

const learningData = {
  skills: [
    'React', 'TypeScript', 'Node.js', 'Python', 'Machine Learning', 
    'Three.js', 'WebGL', 'Framer Motion', 'Next.js', 'GraphQL'
  ],
  projects: [
    'Neural Dashboard', 'Quantum Portfolio', 'Liquid Interface', 
    'AI Chat Bot', 'Real-time Analytics', 'VR Experience'
  ],
  experiences: [
    'Frontend Development', 'Full-Stack Engineering', 'UI/UX Design',
    'Machine Learning', 'Web Performance', '3D Visualization'
  ]
};

const ExperimentalShowcase: React.FC = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [selectedProject, setSelectedProject] = useState<any>(null);

  const handleSectionChange = (index: number) => {
    setCurrentSection(index);
    
    // Smooth scroll to section (you can customize this)
    const sections = document.querySelectorAll('.showcase-section');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleViewProject = (project: any) => {
    setSelectedProject(project);
    // You can open a modal or navigate to project details
    console.log('Viewing project:', project);
  };

  return (
    <div className="experimental-showcase">
      {/* Neural Network Background */}
      <div className="neural-background-container" style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: -1 
      }}>
        <NeuralNetworkBackground
          className="main-neural-net"
          nodeCount={60}
          maxConnections={4}
          learningData={learningData}
          interactive={true}
        />
      </div>

      {/* Liquid Morphing Navigation */}
      <LiquidMorphNavigation
        items={navigationItems}
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
        className="main-navigation"
      />

      {/* Content Sections */}
      <div className="showcase-content">
        {/* Hero Section */}
        <motion.section 
          className="showcase-section hero-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            background: 'radial-gradient(circle at center, rgba(0, 20, 40, 0.8) 0%, rgba(0, 8, 20, 0.9) 100%)',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '800px' }}>
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{
                fontSize: 'clamp(3rem, 6vw, 5rem)',
                fontWeight: 800,
                marginBottom: '2rem',
                background: 'linear-gradient(135deg, #fff, #4ecdc4, #ff6b6b)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                filter: 'drop-shadow(0 0 20px rgba(78, 205, 196, 0.3))'
              }}
            >
              Experimental Portfolio
            </motion.h1>
            
            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              style={{
                fontSize: '1.2rem',
                color: 'rgba(255, 255, 255, 0.8)',
                lineHeight: 1.6,
                marginBottom: '3rem'
              }}
            >
              Experience the future of web interfaces with neural networks, 
              holographic projections, and liquid morphing animations.
            </motion.p>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.8 }}
            >
              <button
                onClick={() => handleSectionChange(1)}
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
                  border: 'none',
                  borderRadius: '25px',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(78, 205, 196, 0.3)'
                }}
              >
                Explore Neural Network
              </button>
            </motion.div>
          </div>
        </motion.section>

        {/* Neural Network Showcase */}
        <motion.section 
          className="showcase-section neural-section"
          style={{
            minHeight: '100vh',
            padding: '4rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '900px' }}>
            <h2 style={{
              fontSize: '3rem',
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, #4ecdc4, #ff6b6b)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Interactive Neural Network
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '3rem'
            }}>
              Move your mouse around to activate neural pathways. Click anywhere to trigger learning mode
              and watch new connections form between your skills, projects, and experiences.
            </p>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.05)', 
              padding: '2rem', 
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <p style={{ color: 'rgba(78, 205, 196, 1)', fontWeight: 600 }}>
                🧠 Neural nodes represent: Skills (Cyan) • Projects (Red) • Experience (Blue)
              </p>
            </div>
          </div>
        </motion.section>

        {/* Holographic Projects Section */}
        <motion.section 
          className="showcase-section projects-section"
          style={{
            minHeight: '100vh',
            padding: '4rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'linear-gradient(135deg, rgba(0, 8, 20, 0.95), rgba(0, 20, 40, 0.95))'
          }}
        >
          <h2 style={{
            fontSize: '3rem',
            marginBottom: '3rem',
            background: 'linear-gradient(135deg, #ff6b6b, #4ecdc4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textAlign: 'center'
          }}>
            Holographic Projects
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '2rem',
            maxWidth: '1200px',
            width: '100%'
          }}>
            {sampleProjects.map((project, index) => (
              <HolographicProjectCard
                key={project.id}
                project={project}
                index={index}
                onViewProject={handleViewProject}
              />
            ))}
          </div>
        </motion.section>

        {/* Liquid UI Section */}
        <motion.section 
          className="showcase-section liquid-section"
          style={{
            minHeight: '100vh',
            padding: '4rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '900px' }}>
            <h2 style={{
              fontSize: '3rem',
              marginBottom: '2rem',
              background: 'linear-gradient(135deg, #ff6b6b, #feca57)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Liquid Morphing Navigation
            </h2>
            <p style={{
              fontSize: '1.1rem',
              color: 'rgba(255, 255, 255, 0.8)',
              marginBottom: '3rem'
            }}>
              Experience fluid navigation that adapts and morphs like liquid mercury. 
              The navigation system responds to your interactions with organic animations and particle effects.
            </p>
            <div style={{ 
              background: 'rgba(255, 255, 255, 0.05)', 
              padding: '2rem', 
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <p style={{ color: 'rgba(255, 199, 87, 1)', fontWeight: 600 }}>
                🌊 Notice the liquid connections flowing between navigation points
              </p>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          className="showcase-section contact-section"
          style={{
            minHeight: '100vh',
            padding: '4rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'radial-gradient(circle at center, rgba(0, 20, 40, 0.9) 0%, rgba(0, 8, 20, 1) 100%)'
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: '800px' }}>
            <motion.h2
              style={{
                fontSize: '3rem',
                marginBottom: '2rem',
                background: 'linear-gradient(135deg, #4ecdc4, #45b7d1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Ready to Experiment?
            </motion.h2>
            
            <motion.p
              style={{
                fontSize: '1.2rem',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: '3rem',
                lineHeight: 1.6
              }}
            >
              These experimental components represent the cutting edge of web interface design. 
              Let's collaborate to create something truly extraordinary for your next project.
            </motion.p>

            <motion.div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
                  border: 'none',
                  borderRadius: '25px',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(78, 205, 196, 0.3)'
                }}
              >
                Get In Touch
              </button>
              
              <button
                style={{
                  padding: '1rem 2rem',
                  fontSize: '1.1rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '25px',
                  color: 'white',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(10px)'
                }}
              >
                View Source Code
              </button>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default ExperimentalShowcase;
