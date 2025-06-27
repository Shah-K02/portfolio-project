interface ScrollProgressProps {
    scrollProgress: number;
  }
  
  export const ScrollProgress = ({ scrollProgress }: ScrollProgressProps) => (
    <div
      className="scroll-progress-bar"
      style={{ width: `${scrollProgress}%` }}
    />
  );