import React from 'react';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
  repeat?: number;
}

const SkeletonLoader: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = '',
  repeat = 1
}) => {
  const getSkeletonStyle = () => {
    const style: React.CSSProperties = {
      width: width || '100%',
      height: height || (variant === 'text' ? '1em' : '100px')
    };

    if (variant === 'circular') {
      style.borderRadius = '50%';
    } else if (variant === 'rectangular') {
      style.borderRadius = '4px';
    } else {
      style.borderRadius = '2px';
    }

    return style;
  };

  const renderSkeleton = () => (
    <div
      className={`skeleton ${className}`}
      style={getSkeletonStyle()}
      aria-hidden="true"
    />
  );

  return (
    <div className="space-y-2">
      {Array.from({ length: repeat }, (_, index) => (
        <React.Fragment key={index}>
          {renderSkeleton()}
        </React.Fragment>
      ))}
    </div>
  );
};

export const ProjectCardSkeleton: React.FC = () => (
  <div className="p-4 rounded-lg bg-card">
    <SkeletonLoader variant="rectangular" height={200} />
    <div className="mt-4 space-y-2">
      <SkeletonLoader variant="text" width="60%" />
      <SkeletonLoader variant="text" height="0.875em" repeat={2} />
      <div className="flex space-x-2 mt-4">
        <SkeletonLoader variant="text" width={60} />
        <SkeletonLoader variant="text" width={60} />
      </div>
    </div>
  </div>
);

export const ProfileSkeleton: React.FC = () => (
  <div className="flex items-center space-x-4">
    <SkeletonLoader variant="circular" width={64} height={64} />
    <div className="space-y-2">
      <SkeletonLoader variant="text" width={150} />
      <SkeletonLoader variant="text" width={100} height="0.875em" />
    </div>
  </div>
);

export default SkeletonLoader;