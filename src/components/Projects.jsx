import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollContext } from '../context/ScrollContext';

const ALL_PROJECTS = [
  {
    id: 1,
    name: 'Oxellus Platform',
    desc: 'A modern web platform for Oxellus — featuring services, team, and contact management.',
    category: 'fullstack',
    icon: '🌐',
    bg: 'linear-gradient(135deg,#2F3B52,#4A90A4)',
    stack: ['HTML', 'CSS', 'JavaScript'],
    live: 'https://oxellus.netlify.app',
    github: '#'
  },
  {
    id: 2,
    name: 'SecureVault App',
    desc: 'A secure password manager built with Node.js, MongoDB, and AES encryption.',
    category: 'fullstack',
    icon: '🔐',
    bg: 'linear-gradient(135deg,#1a1a2e,#16213e)',
    stack: ['Node.js', 'MongoDB', 'Express'],
    live: '#',
    github: '#'
  },
  {
    id: 3,
    name: 'IoT Smart Monitor',
    desc: 'ESP32-based environment monitor with real-time temperature, humidity, and air quality tracking.',
    category: 'electronics',
    icon: '⚡',
    bg: 'linear-gradient(135deg,#0f4c75,#1b262c)',
    stack: ['ESP32', 'Arduino', 'IoT'],
    live: '#',
    github: '#'
  },
  {
    id: 4,
    name: 'Brand Identity System',
    desc: 'Complete brand identity including logo, color palette, typography, and social media kit.',
    category: 'design',
    icon: '🎨',
    bg: 'linear-gradient(135deg,#E8A87C,#E74C3C)',
    stack: ['Canva', 'Illustrator', 'Photoshop'],
    live: '#',
    github: '#'
  },
  {
    id: 5,
    name: 'Network Vulnerability Scanner',
    desc: 'Python-based network scanner to identify open ports, services, and common vulnerabilities.',
    category: 'cyber',
    icon: '🛡️',
    bg: 'linear-gradient(135deg,#2c3e50,#34495e)',
    stack: ['Python', 'Linux', 'Networking'],
    live: '#',
    github: '#'
  },
  {
    id: 6,
    name: 'Portfolio v1',
    desc: 'First iteration of personal portfolio with React and Firebase backend.',
    category: 'fullstack',
    icon: '📱',
    bg: 'linear-gradient(135deg,#667eea,#764ba2)',
    stack: ['React', 'Firebase', 'CSS'],
    live: '#',
    github: '#'
  }
];

export default function Projects() {
  const { setActiveSection } = useScrollContext();
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const handleFilter = (e) => setFilter(e.detail);
    window.addEventListener('filter-projects', handleFilter);
    return () => window.removeEventListener('filter-projects', handleFilter);
  }, []);

  const filteredProjects = ALL_PROJECTS.filter(p => filter === 'all' || p.category === filter);

  return (
    <motion.section 
      id="projects" 
      className="section projects-section"
      onViewportEnter={() => setActiveSection('projects')}
      viewport={{ amount: 0.1 }}
    >
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Projects</span>
          <h2 className="section-title">What I've Built</h2>
        </motion.div>

        <motion.div 
          className="project-filters"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {[
            { id: 'all', label: 'All' },
            { id: 'fullstack', label: 'Full Stack' },
            { id: 'cyber', label: 'Cybersecurity' },
            { id: 'electronics', label: 'Electronics' },
            { id: 'design', label: 'Design' }
          ].map(f => (
            <button
              key={f.id}
              className={`filter-btn ${filter === f.id ? 'active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        <motion.div layout className="projects-grid">
          <AnimatePresence>
            {filteredProjects.map((p, index) => (
              <motion.div 
                key={p.id} 
                className="project-card"
                layout
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                whileHover={{ y: -8, scale: 1.02, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              >
                <div className="project-thumb" style={{ background: p.bg }}>
                  <motion.span 
                    className="project-thumb-icon"
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {p.icon}
                  </motion.span>
                </div>
                <div className="project-info">
                  <h3 className="project-name">{p.name}</h3>
                  <p className="project-desc">{p.desc}</p>
                  <div className="project-stack">
                    {p.stack.map(s => <span key={s}>{s}</span>)}
                  </div>
                  <div className="project-links">
                    <a href={p.live} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary hover-lift">Live Site</a>
                    <a href={p.github} target="_blank" rel="noreferrer" className="btn btn-sm btn-outline hover-lift">GitHub</a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}
