export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription?: string;
    link?: string;
    repositoryUrl?: string;
    technologies?: string[];
    screenshots?: string[];
    demoUrl?: string;
    status?: 'completed' | 'in-progress' | 'archived';
    category?: string;
    year?: number;
  }