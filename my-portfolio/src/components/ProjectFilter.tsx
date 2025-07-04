import React from "react";

interface ProjectFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  const handleCategoryChange = (category: string) => {
    onCategoryChange(category);
  };

  return (
    <div
      className="project-filter"
      role="tablist"
      aria-label="Filter projects by category"
    >
      <button
        className={`filter-btn ${selectedCategory === "all" ? "active" : ""}`}
        onClick={() => handleCategoryChange("all")}
        role="tab"
        aria-selected={selectedCategory === "all"}
        type="button"
      >
        All Projects
      </button>
      {categories.map((category) => (
        <button
          key={category}
          className={`filter-btn ${
            selectedCategory === category ? "active" : ""
          }`}
          onClick={() => handleCategoryChange(category)}
          role="tab"
          aria-selected={selectedCategory === category}
          type="button"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default ProjectFilter;
