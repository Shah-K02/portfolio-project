
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import './Navigation.css';

interface ScrollArrowsProps {
  hideUpArrow: boolean;
  hideDownArrow: boolean;
  scrollToSection: (direction: 'up' | 'down') => void;
}

export const ScrollArrows = ({ hideUpArrow, hideDownArrow, scrollToSection }: ScrollArrowsProps) => (
  <div className="arrow-container">
    {!hideUpArrow && (
      <button 
        className="arrow-button"
        onClick={() => scrollToSection("up")}
        aria-label="Scroll up"
      >
        <IoIosArrowUp size={24} style={{ color: 'inherit' }} />
      </button>
    )}
    {!hideDownArrow && (
      <button 
        className="arrow-button"
        onClick={() => scrollToSection("down")}
        aria-label="Scroll down"
      >
        <IoIosArrowDown size={24} style={{ color: 'inherit' }} />
      </button>
    )}
  </div>
);
