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

  const progress = items.length > 1 ? currentSection / (items.length - 1) : 0;

  return (
    <nav
      className={`side-nav ${className}`}
      aria-label="Section navigation"
    >
      <div className="side-nav__track">
        {/* The trace — a vertical rail that fills as you move through sections */}
        <span className="side-nav__rail" aria-hidden="true">
          <span
            className="side-nav__rail-fill"
            style={{ '--nav-fill': `${progress * 100}%` } as React.CSSProperties}
          />
        </span>

        {items.map((item, index) => {
          const isActive = index === currentSection;
          const isHovered = hoveredItem === index;
          const showLabel = isActive || isHovered;

          return (
            <button
              key={item.id}
              className={`side-nav__node${isActive ? ' is-active' : ''}`}
              onClick={() => onSectionChange(index)}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
              aria-label={`Navigate to ${item.label} section`}
              aria-current={isActive ? 'true' : undefined}
              type="button"
            >
              <span className="side-nav__node-dot" aria-hidden="true">
                {isActive && (
                  <>
                    <span className="side-nav__node-corner side-nav__node-corner--tl" />
                    <span className="side-nav__node-corner side-nav__node-corner--br" />
                  </>
                )}
              </span>

              <span
                className={`side-nav__label${showLabel ? ' is-visible' : ''}${isActive ? ' is-active' : ''}`}
                aria-hidden="true"
              >
                <span className="side-nav__label-index">{String(index + 1).padStart(2, '0')}</span>
                {isHovered && <span className="side-nav__label-text">{item.label}</span>}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default LiquidMorphNavigation;
