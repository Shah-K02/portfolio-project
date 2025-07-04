import React from "react";

interface PageIndicatorsProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const PageIndicators: React.FC<PageIndicatorsProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    onPageChange(page);
  };

  return (
    <div className="carousel-indicators" role="tablist">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`indicator ${index === currentPage ? "active" : ""}`}
          onClick={() => handlePageChange(index)}
          aria-label={`Go to page ${index + 1}`}
          role="tab"
          aria-selected={index === currentPage}
          type="button"
        />
      ))}
    </div>
  );
};

export default PageIndicators;
