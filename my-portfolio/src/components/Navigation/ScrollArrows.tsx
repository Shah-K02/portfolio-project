
import { IoIosArrowUp,IoIosArrowDown   } from "react-icons/io";

interface ScrollArrowsProps {
  hideUpArrow: boolean;
  hideDownArrow: boolean;
  scrollToSection: (direction: 'up' | 'down') => void;
}

export const ScrollArrows = ({ hideUpArrow, hideDownArrow, scrollToSection }: ScrollArrowsProps) => (
  <div className="arrow-container">
    {!hideUpArrow && (
      <IoIosArrowUp  
        className="arrow-button"
        onClick={() => scrollToSection("up")}
        size={30}
      />
    )}
    {!hideDownArrow && (
      <IoIosArrowDown  
        className="arrow-button"
        onClick={() => scrollToSection("down")}
        size={30}
      />
    )}
  </div>
);
