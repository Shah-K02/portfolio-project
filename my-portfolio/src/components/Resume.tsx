import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Download, Calendar, MapPin, Award, BookOpen, Briefcase, ExternalLink } from 'react-feather';
import './Resume.css';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
  technologies: string[];
}

interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements: string[];
}

interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  link?: string;
}

const Resume: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'experience' | 'education' | 'certifications'>('experience');
  const { ref, inView } = useScrollAnimation({ amount: 0.2 });

  const experiences: Experience[] = [
    {
      id: 'exp1',
      title: 'Senior Full Stack Developer',
      company: 'Tech Innovations Inc.',
      location: 'San Francisco, CA',
      startDate: '2022-01',
      endDate: 'Present',
      current: true,
      description: [
        'Led development of scalable web applications serving 100K+ users',
        'Architected microservices infrastructure reducing response time by 40%',
        'Mentored junior developers and conducted code reviews',
        'Implemented CI/CD pipelines improving deployment efficiency by 60%'
      ],
      technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'PostgreSQL']
    },
    {
      id: 'exp2',
      title: 'Frontend Developer',
      company: 'Digital Solutions Ltd.',
      location: 'New York, NY',
      startDate: '2020-06',
      endDate: '2021-12',
      current: false,
      description: [
        'Developed responsive web applications using React and Vue.js',
        'Collaborated with UX/UI designers to implement pixel-perfect designs',
        'Optimized application performance achieving 95+ Lighthouse scores',
        'Integrated RESTful APIs and GraphQL endpoints'
      ],
      technologies: ['React', 'Vue.js', 'JavaScript', 'SASS', 'GraphQL', 'Jest']
    }
  ];

  const education: Education[] = [
    {
      id: 'edu1',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of Technology',
      location: 'Boston, MA',
      startDate: '2016-09',
      endDate: '2020-05',
      gpa: '3.8/4.0',
      achievements: [
        'Magna Cum Laude',
        'Dean\'s List (6 semesters)',
        'Computer Science Excellence Award',
        'President of Programming Club'
      ]
    }
  ];

  const certifications: Certification[] = [
    {
      id: 'cert1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023-03',
      credentialId: 'AWS-SAA-123456',
      link: 'https://aws.amazon.com/certification/'
    },
    {
      id: 'cert2',
      name: 'Google Cloud Professional Developer',
      issuer: 'Google Cloud',
      date: '2022-11',
      credentialId: 'GCP-PD-789012',
      link: 'https://cloud.google.com/certification/'
    },
    {
      id: 'cert3',
      name: 'React Developer Certification',
      issuer: 'Meta',
      date: '2022-08',
      credentialId: 'META-RD-345678'
    }
  ];

  const handleDownloadResume = () => {
    // In a real implementation, this would download a PDF
    const link = document.createElement('a');
    link.href = '/resume.pdf'; // You would place your actual resume PDF in the public folder
    link.download = 'John_Doe_Resume.pdf';
    link.click();
  };

  const tabVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={ref}
      className={`resume-section section-animated fade-up ${
        inView ? 'section-visible' : 'section-hidden'
      }`}
    >
      <div className="resume-container">
        <motion.div
          className="resume-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="resume-title">
            Professional Resume
            <span className="title-underline"></span>
          </h2>
          <motion.button
            className="download-button"
            onClick={handleDownloadResume}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download size={20} />
            Download PDF
          </motion.button>
        </motion.div>

        <div className="resume-tabs">
          {(['experience', 'education', 'certifications'] as const).map((tab) => (
            <motion.button
              key={tab}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {tab === 'experience' && <Briefcase size={18} />}
              {tab === 'education' && <BookOpen size={18} />}
              {tab === 'certifications' && <Award size={18} />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </motion.button>
          ))}
        </div>

        <div className="resume-content">
          <AnimatePresence mode="wait">
            {activeTab === 'experience' && (
              <motion.div
                key="experience"
                className="tab-content"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="timeline">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={exp.id}
                      className="timeline-item"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="timeline-marker"></div>
                      <div className="timeline-content">
                        <div className="experience-header">
                          <h3 className="experience-title">{exp.title}</h3>
                          <div className="experience-meta">
                            <span className="company">{exp.company}</span>
                            <span className="location">
                              <MapPin size={14} />
                              {exp.location}
                            </span>
                            <span className="date">
                              <Calendar size={14} />
                              {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                            </span>
                          </div>
                        </div>
                        <ul className="experience-description">
                          {exp.description.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                        <div className="experience-technologies">
                          {exp.technologies.map((tech) => (
                            <span key={tech} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'education' && (
              <motion.div
                key="education"
                className="tab-content"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="education-grid">
                  {education.map((edu, index) => (
                    <motion.div
                      key={edu.id}
                      className="education-card"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="education-header">
                        <h3 className="education-degree">{edu.degree}</h3>
                        <div className="education-meta">
                          <span className="institution">{edu.institution}</span>
                          <span className="location">
                            <MapPin size={14} />
                            {edu.location}
                          </span>
                          <span className="date">
                            <Calendar size={14} />
                            {edu.startDate} - {edu.endDate}
                          </span>
                          {edu.gpa && (
                            <span className="gpa">GPA: {edu.gpa}</span>
                          )}
                        </div>
                      </div>
                      <div className="education-achievements">
                        <h4>Achievements</h4>
                        <ul>
                          {edu.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'certifications' && (
              <motion.div
                key="certifications"
                className="tab-content"
                variants={tabVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                <div className="certifications-grid">
                  {certifications.map((cert, index) => (
                    <motion.div
                      key={cert.id}
                      className="certification-card"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ y: -5 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="certification-header">
                        <h3 className="certification-name">{cert.name}</h3>
                        <span className="certification-issuer">{cert.issuer}</span>
                      </div>
                      <div className="certification-meta">
                        <span className="certification-date">
                          <Calendar size={14} />
                          {cert.date}
                        </span>
                        {cert.credentialId && (
                          <span className="credential-id">
                            ID: {cert.credentialId}
                          </span>
                        )}
                      </div>
                      {cert.link && (
                        <a 
                          href={cert.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="certification-link"
                        >
                          <ExternalLink size={16} />
                          Verify
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Resume;