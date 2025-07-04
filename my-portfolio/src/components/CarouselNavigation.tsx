import React from "react";
import { LeftArrowIcon, RightArrowIcon } from "./Icons";

interface CarouselNavigationProps {
  onPrevious: () => void;
  onNext: () => void;
  canNavigatePrevious: boolean;
  canNavigateNext: boolean;
}

const CarouselNavigation: React.FC<CarouselNavigationProps> = ({
  onPrevious,
  onNext,
  canNavigatePrevious,
  canNavigateNext,
}) => {
  return (
    <>
      <button
        className="carousel-arrow left"
        onClick={onPrevious}
        disabled={!canNavigatePrevious}
        aria-label="Previous projects"
        type="button"
      >
        <LeftArrowIcon />
      </button>
      <button
        className="carousel-arrow right"
        onClick={onNext}
        disabled={!canNavigateNext}
        aria-label="Next projects"
        type="button"
      >
        <RightArrowIcon />
      </button>
    </>
  );
};

export default CarouselNavigation;
