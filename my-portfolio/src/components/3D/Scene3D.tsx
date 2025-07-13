import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere, useTexture } from '@react-three/drei';
import { Mesh, Vector3 } from 'three';
import './Scene3D.css';

interface FloatingElementProps {
  position: [number, number, number];
  color: string;
  text: string;
  onClick?: () => void;
}

const FloatingElement: React.FC<FloatingElementProps> = ({ position, color, text, onClick }) => {
  const meshRef = useRef<Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[1, 1, 1]}
        scale={clicked ? 1.2 : hovered ? 1.1 : 1}
        onClick={() => {
          setClicked(!clicked);
          onClick?.();
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial color={hovered ? '#ff6b6b' : color} />
      </Box>
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.3}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  );
};

const AnimatedSphere: React.FC = () => {
  const sphereRef = useRef<Mesh>(null!);
  const { viewport } = useThree();

  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2;
      sphereRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 2;
      if (sphereRef.current.material && 'color' in sphereRef.current.material) {
        (sphereRef.current.material as any).color.setHSL(
          (state.clock.elapsedTime * 0.1) % 1,
          0.7,
          0.5
        );
      }
    }
  });

  return (
    <Sphere ref={sphereRef} args={[0.5, 32, 32]} position={[0, 2, 0]}>
      <meshStandardMaterial wireframe />
    </Sphere>
  );
};

interface Scene3DProps {
  skills?: string[];
  onSkillClick?: (skill: string) => void;
}

const Scene3D: React.FC<Scene3DProps> = ({ skills = ['React', 'TypeScript', 'Node.js', 'Python', 'AWS'], onSkillClick }) => {
  return (
    <div className="scene-3d-container">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4f46e5" />
        
        <AnimatedSphere />
        
        {skills.map((skill, index) => {
          const angle = (index / skills.length) * Math.PI * 2;
          const radius = 3;
          const position: [number, number, number] = [
            Math.cos(angle) * radius,
            Math.sin(index * 0.5) * 2,
            Math.sin(angle) * radius
          ];
          
          return (
            <FloatingElement
              key={skill}
              position={position}
              color={`hsl(${(index * 360) / skills.length}, 70%, 60%)`}
              text={skill}
              onClick={() => onSkillClick?.(skill)}
            />
          );
        })}
        
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
    </div>
  );
};

export default Scene3D;