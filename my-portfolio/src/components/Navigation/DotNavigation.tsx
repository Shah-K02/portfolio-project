// src/components/Navigation/DotNavigation.tsx
interface DotNavigationProps {
    sectionCount: number;
    currentSection: number;
    sectionRefs: React.RefObject<HTMLDivElement | null>[];
  }
  
  export const DotNavigation = ({ sectionCount, currentSection, sectionRefs }: DotNavigationProps) => (
    <div className="dot-navigation">
      {Array(sectionCount).fill(0).map((_, index) => (
        <div
          key={index}
          className={`dot ${index === currentSection ? "active-dot" : ""}`}
          onClick={() => {
            window.scrollTo({
              top: sectionRefs[index].current?.offsetTop,
              behavior: "smooth",
            });
          }}
        />
      ))}
    </div>
  );