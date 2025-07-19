import React from 'react';
import { Link } from 'react-router-dom';

const AnimatedBreadcrumb = ({ items = [] }) => {
  return (
    <nav className="flex items-center space-x-2 py-4">
      {items.map((item, index) => (
        <React.Fragment key={item.path}>
          {index > 0 && (
            <span className="text-gray-400 mx-2">/</span>
          )}
          <Link
            to={item.path}
            className={`
              breadcrumb-enter breadcrumb-enter-active
              hover-lift
              text-gray-600 hover:text-primary
              transition-colors duration-300
            `}
            style={{
              animationDelay: `${index * 100}ms`
            }}
          >
            {item.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
};

export default AnimatedBreadcrumb;