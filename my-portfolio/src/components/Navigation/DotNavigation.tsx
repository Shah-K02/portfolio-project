interface DotNavigationProps {
    sectionCount: number;
    currentSection: number;
    scrollToSection: (index: number) => void;
  }
  
  export const DotNavigation = ({ 
    sectionCount, 
    currentSection, 
    scrollToSection 
  }: DotNavigationProps) => (
    <div className="dot-navigation">
      {Array.from({ length: sectionCount }).map((_, index) => (
        <div
          key={index}
          className={`dot ${index === currentSection ? "active-dot" : ""}`}
          onClick={() => scrollToSection(index)}
        />
      ))}
    </div>
  );