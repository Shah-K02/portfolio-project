import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import './InteractiveParticles.css';

// Utility function to resolve CSS variables to actual color values
const resolveCSSVariable = (cssVar: string): string => {
  if (cssVar.startsWith('var(')) {
    // Extract the variable name from var(--variable-name)
    const varName = cssVar.slice(4, -1);
    const computedValue = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    return computedValue || cssVar;
  }
  return cssVar;
};

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  type: 'normal' | 'spark' | 'trail';
}

interface InteractiveParticlesProps {
  particleCount?: number;
  color?: string;
  connectionDistance?: number;
  className?: string;
  interactive?: boolean;
  theme?: 'light' | 'dark';
  onInteraction?: (x: number, y: number) => void;
}

const InteractiveParticles: React.FC<InteractiveParticlesProps> = ({
  particleCount = 100,
  color = 'var(--color-accent-1)',
  connectionDistance = 150,
  className = '',
  interactive = true,
  theme = 'dark',
  onInteraction
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, isDown: false });
  const [isActive, setIsActive] = useState(false);

  const colors = useMemo(() => {
    const baseColors = theme === 'dark' 
      ? ['var(--color-accent-1)', 'var(--color-accent-2)', 'var(--color-detail)', '#4f46e5', '#10b981']
      : ['var(--color-accent-1)', 'var(--color-accent-2)', 'var(--color-detail)', '#3b82f6', '#34d399'];
    
    // Resolve CSS variables to actual color values for Canvas compatibility
    return baseColors.map(color => resolveCSSVariable(color));
  }, [theme]);

  const createParticle = useCallback((x?: number, y?: number, type: Particle['type'] = 'normal'): Particle => {
    const canvas = canvasRef.current;
    if (!canvas) return {} as Particle;

    return {
      x: x ?? Math.random() * canvas.width,
      y: y ?? Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: type === 'spark' ? 30 : type === 'trail' ? 20 : 100,
      maxLife: type === 'spark' ? 30 : type === 'trail' ? 20 : 100,
      type
    };
  }, [colors]);

  const initParticles = useCallback(() => {
    particlesRef.current = Array.from({ length: particleCount }, () => createParticle());
  }, [particleCount, createParticle]);

  const updateParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mouse = mouseRef.current;
    
    particlesRef.current = particlesRef.current.filter(particle => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Interactive behavior
      if (interactive && mouse.isDown) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100;
          particle.vx += (dx / distance) * force * 0.1;
          particle.vy += (dy / distance) * force * 0.1;
        }
      }
      
      // Boundary collision
      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -0.8;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -0.8;
      
      // Keep particles in bounds
      particle.x = Math.max(0, Math.min(canvas.width, particle.x));
      particle.y = Math.max(0, Math.min(canvas.height, particle.y));
      
      // Apply friction
      particle.vx *= 0.99;
      particle.vy *= 0.99;
      
      // Update life
      particle.life--;
      
      return particle.life > 0;
    });
    
    // Add new particles to maintain count
    while (particlesRef.current.length < particleCount) {
      particlesRef.current.push(createParticle());
    }
  }, [interactive, particleCount, createParticle]);

  const drawParticles = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw connections
    ctx.strokeStyle = resolveCSSVariable('var(--color-border)');
    ctx.lineWidth = 1;
    
    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const p1 = particlesRef.current[i];
        const p2 = particlesRef.current[j];
        const distance = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2);
        
        if (distance < 100) {
          const opacity = (100 - distance) / 100 * 0.3;
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
    
    // Draw particles
    particlesRef.current.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      ctx.globalAlpha = alpha;
      
      // Create gradient for particle
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size
      );
      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fill();
      
      // Add glow effect for spark particles
      if (particle.type === 'spark') {
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    });
    
    ctx.globalAlpha = 1;
  }, [theme]);

  const animate = useCallback(() => {
    updateParticles();
    drawParticles();
    animationRef.current = requestAnimationFrame(animate);
  }, [updateParticles, drawParticles]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
    
    if (interactive && mouseRef.current.isDown) {
      // Create spark particles at mouse position
      for (let i = 0; i < 3; i++) {
        particlesRef.current.push(
          createParticle(
            mouseRef.current.x + (Math.random() - 0.5) * 20,
            mouseRef.current.y + (Math.random() - 0.5) * 20,
            'spark'
          )
        );
      }
      
      onInteraction?.(mouseRef.current.x, mouseRef.current.y);
    }
  }, [interactive, createParticle, onInteraction]);

  const handleMouseDown = useCallback(() => {
    mouseRef.current.isDown = true;
    setIsActive(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false;
    setIsActive(false);
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    initParticles();
  }, [initParticles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    handleResize();
    animate();
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize, animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`interactive-particles ${theme} ${isActive ? 'active' : ''}`}
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    />
  );
};

export default InteractiveParticles;