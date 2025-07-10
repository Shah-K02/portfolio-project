// constants/projectsData.ts
import { Project } from "../types/project";
  
export const PROJECTS_DATA: Project[] = [
  {
    id: "project-1",
    title: "Personal Fitness Platform",
    description: "A modern fitness platform with advanced features.",
    longDescription:
      "A full-stack fitness platform built with React and Express, featuring user authentication, meal tracking, progress analytics, and social sharing. The platform supports multiple fitness devices.",
    link: "https://example.com/project-one",
    repositoryUrl: "https://github.com/user/fitness-platform",
    demoUrl: "https://demo.fitness-platform.com",
    technologies: ["React", "Express", "Node.js", "SQL", "CSS", "Restful API", "JWT", "Axios"],
    screenshots: [
      "https://via.placeholder.com/800x500/667eea/ffffff?text=Homepage",
      "https://via.placeholder.com/800x500/764ba2/ffffff?text=Product+Page",
      "https://via.placeholder.com/800x500/f67280/ffffff?text=Dashboard",
    ],
    status: "completed",
    category: "Web Development",
    year: 2024,
  },
  {
    id: "project-2",
    title: "AutoMods",
    description: "Full-stack app for sourcing car parts and modifications.",
    longDescription:
      "A comprehensive application that enables users to find and modify car parts easily. Features include a user-friendly interface, real-time inventory updates, and integration with various car part suppliers. Built with modern web technologies for optimal performance.",
    link: "https://example.com/project-two",
    repositoryUrl: "https://github.com/user/auto-mods",
    demoUrl: "https://demo.auto-mods.com",
    technologies: [
      "React",
      "TypeScript",
      "Socket.io",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    screenshots: [
      "https://via.placeholder.com/800x500/48bb78/ffffff?text=Task+Board",
      "https://via.placeholder.com/800x500/ed8936/ffffff?text=Calendar+View",
    ],
    status: "completed",
    category: "E-commerce",
    year: 2024,
  },
  {
    id: "project-3",
    title: "Sports4Us",
    description: "Fulll-stack ecommerce platform for sports gear.",
    longDescription:
      "A comprehensive ecommerce platform that connects sports enthusiasts with the gear they need. Features include user authentication, product reviews, and a seamless checkout process.",
    repositoryUrl: "https://github.com/user/sports4us",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "Express"],
    screenshots: [
      "https://via.placeholder.com/800x500/4ecdc4/ffffff?text=Sports4Us+Homepage",
    ],
    status: "completed",
    category: "E-commerce",
    year: 2023,
  },
  {
    id: "project-4",
    title: "Task Manager API",
    description: "API for task management.",
    longDescription:
      "A robust API built with Node.js for managing tasks. Features include user authentication, task creation, updating, and deletion, with admin capabilities for managing users and tasks.",
    demoUrl: "https://task-manager-demo.com",
    repositoryUrl: "https://github.com/user/task-manager",
    technologies: ["Node.js", "Express", "MongoDB", "JWT", "Mongoose"],
    screenshots: [
      "https://via.placeholder.com/400x800/ff6b6b/ffffff?text=Home+Screen",
      "https://via.placeholder.com/400x800/4ecdc4/ffffff?text=Workout+Screen",
    ],
    status: "completed",
    category: "API Development",
    year: 2023,
  },
];