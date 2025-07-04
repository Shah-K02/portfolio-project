import { Project } from "../types/project";
  
/**
 * Extracts unique categories from an array of projects
 */
export const getUniqueCategories = (projects: Project[]): string[] => {
  const categories = projects
    .map((project) => project.category)
    .filter((category): category is string => typeof category === "string");
  
  return Array.from(new Set(categories));
};

/**
 * Filters projects by category
 */
export const filterProjectsByCategory = (
  projects: Project[],
  category: string
): Project[] => {
  if (category === "all") {
    return projects;
  }
  return projects.filter((project) => project.category === category);
};

/**
 * Sorts projects by year (newest first)
 */
export const sortProjectsByYear = (projects: Project[]): Project[] => {
  return [...projects].sort((a, b) => (b.year || 0) - (a.year || 0));
};

/**
 * Groups projects by status
 */
export const groupProjectsByStatus = (projects: Project[]): Record<string, Project[]> => {
  return projects.reduce((acc, project) => {
    const status = project.status || "unknown";
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(project);
    return acc;
  }, {} as Record<string, Project[]>);
};