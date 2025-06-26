export interface Project {
    id: number;
    title: string;
    description: string;
    fullDescription: string;
    technologies: string[];
    github: string;
    image: string;
  }
  
  export interface SkillCategory {
    [key: string]: string[];
  }
  
  export interface ContactInfo {
    email: string;
    location: string;
    linkedin: string;
    github: string;
  }