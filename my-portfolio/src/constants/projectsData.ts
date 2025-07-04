// constants/projectsData.ts
import { Project } from "../types/project";
  
export const PROJECTS_DATA: Project[] = [
  {
    id: "project-1",
    title: "E-Commerce Platform",
    description: "A modern e-commerce platform with advanced features.",
    longDescription:
      "A full-stack e-commerce platform built with React and Node.js, featuring user authentication, payment processing, inventory management, and real-time analytics. The platform supports multiple payment gateways and includes an admin dashboard for managing products and orders.",
    link: "https://example.com/project-one",
    repositoryUrl: "https://github.com/user/ecommerce-platform",
    demoUrl: "https://demo.ecommerce-platform.com",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "Express"],
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
    title: "Task Management App",
    description: "Collaborative task management with real-time updates.",
    longDescription:
      "A comprehensive task management application that enables teams to collaborate effectively. Features include drag-and-drop task boards, real-time notifications, file attachments, time tracking, and detailed reporting. Built with modern web technologies for optimal performance.",
    link: "https://example.com/project-two",
    repositoryUrl: "https://github.com/user/task-manager",
    demoUrl: "https://demo.taskmanager.com",
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
    status: "in-progress",
    category: "Productivity",
    year: 2024,
  },
  {
    id: "project-3",
    title: "Weather Analytics Dashboard",
    description: "Real-time weather data visualization and analytics.",
    longDescription:
      "An advanced weather analytics dashboard that aggregates data from multiple weather APIs to provide comprehensive weather insights. Features interactive charts, historical data analysis, weather alerts, and customizable widgets for different locations.",
    repositoryUrl: "https://github.com/user/weather-dashboard",
    technologies: ["React", "D3.js", "Python", "FastAPI", "Redis"],
    screenshots: [
      "https://via.placeholder.com/800x500/4ecdc4/ffffff?text=Weather+Dashboard",
    ],
    status: "completed",
    category: "Data Visualization",
    year: 2023,
  },
  {
    id: "project-4",
    title: "Mobile Fitness Tracker",
    description: "Cross-platform mobile app for fitness tracking.",
    longDescription:
      "A comprehensive fitness tracking application built with React Native. Includes workout planning, progress tracking, social features, and integration with popular fitness devices. The app uses machine learning to provide personalized workout recommendations.",
    demoUrl: "https://fitness-tracker-demo.com",
    repositoryUrl: "https://github.com/user/fitness-tracker",
    technologies: ["React Native", "Firebase", "TensorFlow", "Redux"],
    screenshots: [
      "https://via.placeholder.com/400x800/ff6b6b/ffffff?text=Home+Screen",
      "https://via.placeholder.com/400x800/4ecdc4/ffffff?text=Workout+Screen",
    ],
    status: "completed",
    category: "Mobile Development",
    year: 2023,
  },
  {
    id: "project-5",
    title: "AI Content Generator",
    description: "AI-powered content creation and optimization tool.",
    longDescription:
      "An intelligent content generation platform that uses advanced AI models to create, optimize, and analyze content. Features include SEO optimization, multiple content formats, plagiarism detection, and performance analytics.",
    repositoryUrl: "https://github.com/user/ai-content-generator",
    technologies: ["Python", "OpenAI API", "Flask", "React", "PostgreSQL"],
    status: "in-progress",
    category: "Artificial Intelligence",
    year: 2024,
  },
  {
    id: "project-6",
    title: "Blockchain Voting System",
    description: "Secure and transparent voting system using blockchain.",
    longDescription:
      "A decentralized voting platform built on blockchain technology to ensure transparency and security in electoral processes. Features voter authentication, immutable vote recording, real-time results, and comprehensive audit trails.",
    repositoryUrl: "https://github.com/user/blockchain-voting",
    technologies: ["Solidity", "Web3.js", "Ethereum", "React", "IPFS"],
    status: "archived",
    category: "Blockchain",
    year: 2022,
  },
];