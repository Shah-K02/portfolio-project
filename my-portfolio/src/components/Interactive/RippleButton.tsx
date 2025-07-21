import React, { useState, useEffect } from 'react';

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: string;
  duration?: number;
  loading?: boolean;
}

interface Ripple {
  x: number;
  y: number;
  size: number;
  id: number;
}

const RippleButton: React.FC<RippleButtonProps> = ({
  children,
  color = 'var(--color-surface-overlay)',
  duration = 500,
  loading = false,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const [nextKey, setNextKey] = useState(0);

  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];

    ripples.forEach((ripple) => {
      const timeout = setTimeout(() => {
        setRipples((prevRipples) =>
          prevRipples.filter((r) => r.id !== ripple.id)
        );
      }, duration);

      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
    };
  }, [ripples, duration]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading) {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(button.clientWidth, button.clientHeight);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      const newRipple = {
        x,
        y,
        size,
        id: nextKey,
      };

      setNextKey((prev) => prev + 1);
      setRipples((prevRipples) => [...prevRipples, newRipple]);

      if (onClick) {
        onClick(event);
      }
    }
  };

  return (
    <button
      className={`
        relative overflow-hidden
        ${loading ? 'button-loading' : ''}
        ${className}
      `}
      onClick={handleClick}
      disabled={disabled || loading}
      {...props}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            background: color,
            transform: 'scale(0)',
            animation: `ripple ${duration}ms linear`,
          }}
        />
      ))}
      {children}
    </button>
  );
};

export default RippleButton;