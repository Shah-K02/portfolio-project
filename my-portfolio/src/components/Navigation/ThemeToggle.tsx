import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { IoSunny, IoMoon } from 'react-icons/io5';
import './ThemeToggle.css';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="icon-container">
        {theme === 'light' ? <IoMoon size={26} color="var(--rich-black, #000814)" /> : <IoSunny size={26} color="var(--rich-black, #000814)" />}
      </div>
      <span className="sr-only">
        {theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      </span>
    </button>
  );
};