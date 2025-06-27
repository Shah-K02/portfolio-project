import React from 'react';

interface Project {
    title: string;
    description: string;
    link?: string;
}

const projects: Project[] = [
    {
        title: 'Project One',
        description: 'Description for project one.',
        link: 'https://example.com/project-one',
    },
    {
        title: 'Project Two',
        description: 'Description for project two.',
        link: 'https://example.com/project-two',
    },
    // Add more projects as needed
];

const Projects: React.FC = () => (
    <section>
        <h2>Projects</h2>
        <ul>
            {projects.map((project, idx) => (
                <li key={idx}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    {project.link && (
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            View Project
                        </a>
                    )}
                </li>
            ))}
        </ul>
    </section>
);

export default Projects;