import React, { useState } from 'react';
import './LiquidMorphNavigation.css';

interface NavigationItem {
  id: string;
  label: string;
  section: string;
}

interface LiquidMorphNavigationProps {
  items: NavigationItem[];
  currentSection: number;
  onSectionChange: (index: number) => void;
  className?: string;
}

const LiquidMorphNavigation: React.FC<LiquidMorphNavigationProps> = ({
  items,
  currentSection,
  onSectionChange,
  className = '',
}) => {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  return (
    <nav
      className={`pill-nav ${className}`}
      aria-label="Section navigation"
    >
      <div className="pill-nav__track">
        {items.map((item, index) => {
          const isActive  = index === currentSection;
          const isHovered = hoveredItem === index;

          return (
            <button
              key={item.id}
              className={`pill-nav__dot${isActive ? ' is-active' : ''}`}
              onClick={() => onSectionChange(index)}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              aria-label={`Navigate to ${item.label} section`}
              aria-current={isActive ? 'true' : undefined}
              type="button"
            >
              <span className="pill-nav__dot-inner" />

              {/* Tooltip */}
              <span
                className={`pill-nav__label${isHovered ? ' is-visible' : ''}`}
                aria-hidden="true"
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default LiquidMorphNavigation;
