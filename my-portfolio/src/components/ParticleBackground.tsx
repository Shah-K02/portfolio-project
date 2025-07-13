import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleBackgroundProps {
  count?: number;
}

function Particles({ count = 5000 }: { count: number }) {
  const mesh = useRef<THREE.Points>(null!);
  
  // Generate random positions for particles
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Random positions in 3D space
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      // Color variations (cyan to blue theme)
      const colorVariation = Math.random();
      colors[i * 3] = colorVariation * 0.2; // R
      colors[i * 3 + 1] = 0.8 + colorVariation * 0.2; // G
      colors[i * 3 + 2] = 1; // B
    }
    
    return [positions, colors];
  }, [count]);
  
  // Animate particles
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (mesh.current) {
      mesh.current.rotation.x = time * 0.1;
      mesh.current.rotation.y = time * 0.05;
      
      // Subtle floating animation
      const positions = mesh.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        positions[i3 + 1] += Math.sin(time + positions[i3]) * 0.001;
      }
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <Points ref={mesh} positions={positions} colors={colors}>
      <PointMaterial
        transparent
        vertexColors
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

const ParticleBackground: React.FC<ParticleBackgroundProps> = ({ count = 3000 }) => {
  return (
    <div 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <Particles count={count} />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;