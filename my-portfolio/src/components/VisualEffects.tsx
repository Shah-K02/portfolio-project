import React from 'react';
import { useVisualEffects } from '../hooks/useVisualEffects';
import '../styles/visualEffects.css';

export const VisualEffects: React.FC = () => {
  const { cursorRef, gradientRef } = useVisualEffects();

  return (
    <>
      <div className="noise-overlay" />
      <div className="grid-pattern" />
      <div ref={gradientRef} className="dynamic-gradient" />
      <div ref={cursorRef} className="custom-cursor" />
    </>
  );
};