import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface Node {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  connections: string[];
  type: 'skill' | 'project' | 'experience' | 'learning';
  label?: string;
  strength: number;
  activated: boolean;
  lastActivation: number;
}

interface Connection {
  from: string;
  to: string;
  strength: number;
  active: boolean;
  pulsePhase: number;
}

interface NeuralNetworkBackgroundProps {
  className?: string;
  nodeCount?: number;
  maxConnections?: number;
  learningData?: {
    skills: string[];
    projects: string[];
    experiences: string[];
  };
  interactive?: boolean;
}

const NeuralNetworkBackground: React.FC<NeuralNetworkBackgroundProps> = ({
  className = '',
  nodeCount = 50,
  maxConnections = 3,
  learningData = {
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AI/ML'],
    projects: ['Portfolio', 'E-commerce', 'Dashboard'],
    experiences: ['Frontend Dev', 'Full-Stack', 'Problem Solving']
  },
  interactive = true
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [isLearning, setIsLearning] = useState(false);

  // Initialize neural network
  const initializeNetwork = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { width, height } = canvas.getBoundingClientRect();
    const newNodes: Node[] = [];
    const allData = [
      ...learningData.skills.map(skill => ({ label: skill, type: 'skill' as const })),
      ...learningData.projects.map(project => ({ label: project, type: 'project' as const })),
      ...learningData.experiences.map(exp => ({ label: exp, type: 'experience' as const }))
    ];

    // Create nodes
    for (let i = 0; i < nodeCount; i++) {
      const dataItem = allData[i % allData.length];
      const node: Node = {
        id: `node-${i}`,
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        connections: [],
        type: dataItem?.type || 'learning',
        label: dataItem?.label,
        strength: Math.random() * 0.8 + 0.2,
        activated: false,
        lastActivation: 0
      };
      newNodes.push(node);
    }

    // Create connections based on proximity and type similarity
    const newConnections: Connection[] = [];
    newNodes.forEach((node, index) => {
      let connectionCount = 0;
      newNodes.forEach((otherNode, otherIndex) => {
        if (index !== otherIndex && connectionCount < maxConnections) {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          );
          
          // Higher probability of connection for similar types or close nodes
          const typeBonus = node.type === otherNode.type ? 0.3 : 0;
          const distanceThreshold = 150;
          const connectionProbability = Math.max(0, (distanceThreshold - distance) / distanceThreshold) + typeBonus;
          
          if (Math.random() < connectionProbability && distance < distanceThreshold) {
            newConnections.push({
              from: node.id,
              to: otherNode.id,
              strength: Math.random() * 0.8 + 0.2,
              active: false,
              pulsePhase: Math.random() * Math.PI * 2
            });
            node.connections.push(otherNode.id);
            connectionCount++;
          }
        }
      });
    });

    setNodes(newNodes);
    setConnections(newConnections);
  }, [nodeCount, maxConnections, learningData]);

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;

    // Clear canvas
    ctx.fillStyle = 'rgba(0, 8, 20, 0.1)';
    ctx.fillRect(0, 0, width, height);

    const currentTime = Date.now();

    // Update and draw connections
    connections.forEach(connection => {
      const fromNode = nodes.find(n => n.id === connection.from);
      const toNode = nodes.find(n => n.id === connection.to);
      
      if (!fromNode || !toNode) return;

      // Calculate connection activity based on node states
      const isActive = fromNode.activated || toNode.activated || connection.active;
      const opacity = isActive ? 0.8 : 0.2 + Math.sin(currentTime * 0.001 + connection.pulsePhase) * 0.1;
      
      // Draw connection line with gradient
      const gradient = ctx.createLinearGradient(fromNode.x, fromNode.y, toNode.x, toNode.y);
      gradient.addColorStop(0, `rgba(78, 205, 196, ${opacity})`);
      gradient.addColorStop(0.5, `rgba(255, 107, 107, ${opacity * 0.5})`);
      gradient.addColorStop(1, `rgba(69, 183, 209, ${opacity})`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = isActive ? 2 : 0.5;
      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      
      // Add curve for more organic feel
      const midX = (fromNode.x + toNode.x) / 2 + Math.sin(currentTime * 0.002 + connection.pulsePhase) * 20;
      const midY = (fromNode.y + toNode.y) / 2 + Math.cos(currentTime * 0.002 + connection.pulsePhase) * 20;
      ctx.quadraticCurveTo(midX, midY, toNode.x, toNode.y);
      ctx.stroke();

      // Draw data pulse along active connections
      if (isActive) {
        const pulseProgress = (currentTime * 0.003 + connection.pulsePhase) % 1;
        const pulseX = fromNode.x + (toNode.x - fromNode.x) * pulseProgress;
        const pulseY = fromNode.y + (toNode.y - fromNode.y) * pulseProgress;
        
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * (1 - pulseProgress)})`;
        ctx.fill();
      }
    });

    // Update and draw nodes
    nodes.forEach((node, index) => {
      // Update position with gentle drift
      node.x += node.vx;
      node.y += node.vy;
      
      // Bounce off edges
      if (node.x <= 0 || node.x >= width) node.vx *= -1;
      if (node.y <= 0 || node.y >= height) node.vy *= -1;
      
      // Keep within bounds
      node.x = Math.max(0, Math.min(width, node.x));
      node.y = Math.max(0, Math.min(height, node.y));

      // Fade activation over time
      if (node.activated && currentTime - node.lastActivation > 2000) {
        node.activated = false;
      }

      // Draw node based on type
      const nodeSize = node.activated ? 8 : 4;
      const opacity = node.activated ? 1 : 0.6;
      
      // Node color based on type
      let color;
      switch (node.type) {
        case 'skill':
          color = `rgba(78, 205, 196, ${opacity})`;
          break;
        case 'project':
          color = `rgba(255, 107, 107, ${opacity})`;
          break;
        case 'experience':
          color = `rgba(69, 183, 209, ${opacity})`;
          break;
        default:
          color = `rgba(150, 206, 180, ${opacity})`;
      }

      // Draw node with glow effect
      ctx.beginPath();
      ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
      
      if (node.activated) {
        // Draw glow
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = color.replace(/[\d.]+\)$/g, '0.2)');
        ctx.fill();
        
        // Draw label if available
        if (node.label && nodeSize > 6) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
          ctx.font = '12px Inter, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(node.label, node.x, node.y - nodeSize - 8);
        }
      }
    });

    animationRef.current = requestAnimationFrame(animate);
  }, [nodes, connections]);

  // Handle mouse interaction
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !interactive) return;

    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Activate nearby nodes
    nodes.forEach(node => {
      const distance = Math.sqrt(Math.pow(node.x - mouseX, 2) + Math.pow(node.y - mouseY, 2));
      if (distance < 80) {
        node.activated = true;
        node.lastActivation = Date.now();
        
        // Activate connected nodes with delay
        setTimeout(() => {
          node.connections.forEach(connectedId => {
            const connectedNode = nodes.find(n => n.id === connectedId);
            if (connectedNode) {
              connectedNode.activated = true;
              connectedNode.lastActivation = Date.now();
            }
          });
        }, 200);
      }
    });
  }, [nodes, interactive]);

  // Learning mode - simulate learning by creating new connections
  const triggerLearning = useCallback(() => {
    setIsLearning(true);
    
    // Create new temporary connections
    const learningConnections: Connection[] = [];
    for (let i = 0; i < 5; i++) {
      const randomNode1 = nodes[Math.floor(Math.random() * nodes.length)];
      const randomNode2 = nodes[Math.floor(Math.random() * nodes.length)];
      
      if (randomNode1 && randomNode2 && randomNode1.id !== randomNode2.id) {
        learningConnections.push({
          from: randomNode1.id,
          to: randomNode2.id,
          strength: 1,
          active: true,
          pulsePhase: 0
        });
        
        randomNode1.activated = true;
        randomNode1.lastActivation = Date.now();
        randomNode2.activated = true;
        randomNode2.lastActivation = Date.now();
      }
    }
    
    setConnections(prev => [...prev, ...learningConnections]);
    
    // Remove learning connections after animation
    setTimeout(() => {
      setConnections(prev => prev.filter(conn => !learningConnections.includes(conn)));
      setIsLearning(false);
    }, 3000);
  }, [nodes]);

  // Initialize on mount and when dependencies change
  useEffect(() => {
    initializeNetwork();
  }, [initializeNetwork]);

  // Start animation loop
  useEffect(() => {
    if (nodes.length > 0) {
      animate();
    }
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, nodes.length]);

  // Resize handler
  useEffect(() => {
    const handleResize = () => {
      initializeNetwork();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initializeNetwork]);

  return (
    <div className={`neural-network-container ${className}`}>
      <canvas
        ref={canvasRef}
        className="neural-network-canvas"
        onMouseMove={handleMouseMove}
        onClick={triggerLearning}
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: interactive ? 'auto' : 'none',
          background: 'radial-gradient(circle at center, rgba(0, 20, 40, 0.1) 0%, transparent 70%)'
        }}
      />
      
      {/* Learning indicator */}
      {isLearning && (
        <motion.div
          className="learning-indicator"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(78, 205, 196, 0.9)',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '500',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            zIndex: 10
          }}
        >
          🧠 Neural Network Learning...
        </motion.div>
      )}
      
      {/* Interactive hint */}
      {interactive && (
        <motion.div
          className="interaction-hint"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.8rem',
            textAlign: 'right',
            zIndex: 10
          }}
        >
          Move mouse to activate nodes<br/>
          Click to trigger learning
        </motion.div>
      )}
    </div>
  );
};

export default NeuralNetworkBackground;
