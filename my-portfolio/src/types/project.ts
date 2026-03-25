export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    link?: string;
    repositoryUrl?: string;
    githubUrl?: string;
    liveUrl?: string; // Added for HolographicProjectCard compatibility
    image?: string;  // Added for HolographicProjectCard compatibility
    technologies?: string[];
    screenshots?: string[];
    demoUrl?: string;
    status?: 'completed' | 'in-progress' | 'archived';
    category?: string;
    year?: number;
    team?: number;
  }
