import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere } from '@react-three/drei';
import { Mesh } from 'three';
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
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  const getIconGeometry = (text: string) => {
    switch(text.toLowerCase()) {
      case 'react':
        return <Sphere args={[0.6, 32, 32]} />;
      case 'typescript':
        return <Box args={[1, 1, 1]} />;
      case 'node.js':
        return <Box args={[1.2, 0.8, 0.2]} />;
      case 'python':
        return <Box args={[0.8, 0.8, 0.8]} />;
      case 'aws':
        return <Box args={[1.2, 0.6, 0.6]} />;
      default:
        return <Box args={[1, 1, 1]} />;
    }
  };

  const getIconColor = (text: string) => {
    switch(text.toLowerCase()) {
      case 'react':
        return '#61DAFB';
      case 'typescript':
        return '#3178C6';
      case 'node.js':
        return '#68A063';
      case 'python':
        return '#FFD43B';
      case 'aws':
        return '#FF9900';
      default:
        return color;
    }
  };

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        scale={clicked ? 1.3 : hovered ? 1.2 : 1}
        onClick={() => {
          setClicked(!clicked);
          onClick?.();
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {getIconGeometry(text)}
        <meshPhongMaterial
          color={getIconColor(text)}
          emissive={hovered ? getIconColor(text) : '#000000'}
          emissiveIntensity={hovered ? 0.5 : 0}
          shininess={100}
        />
      </mesh>
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.35}
        color="white"
        anchorX="center"
        anchorY="middle"
        font={undefined} // Using default font
      >
        {text}
      </Text>
    </group>
  );
};

const AnimatedSphere: React.FC = () => {
  const sphereRef = useRef<Mesh>(null!);

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