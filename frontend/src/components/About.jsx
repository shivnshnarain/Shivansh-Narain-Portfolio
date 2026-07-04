import { motion } from 'framer-motion';
import { useScrollContext } from '../context/ScrollContext';
import { smoothScrollTo, scrollToTargetWhenReady } from '../utils/smoothScroll';

export default function About({ setActiveView }) {
  const { setActiveSection } = useScrollContext();

  const navigateTo = (section) => {
    if (setActiveView) {
      setActiveView('projects');
      window.scrollTo(0, 0);
      if (section === 'design') {
        scrollToTargetWhenReady('graphic-design-portfolio');
      } else {
        scrollToTargetWhenReady('website-showcase');
      }
    }
  };

  const handleInterestClick = (label) => {
    if (label === 'Graphic Design') {
      navigateTo('design');
    } else {
      navigateTo('projects');
      
      let cat = 'all';
      if (label === 'Full Stack Dev' || label === 'Web Technologies') cat = 'fullstack';
      if (label === 'Cybersecurity') cat = 'cyber';
      if (label === 'Embedded Systems') cat = 'electronics';
      if (label === 'AI Tools') cat = 'all'; 
      
      window.dispatchEvent(new CustomEvent('filter-projects', { detail: cat }));
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const zoomVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <motion.section 
      id="about" 
      className="section about-section"
      onViewportEnter={() => setActiveSection('about')}
      viewport={{ amount: 0.3 }}
    >
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">About Me</span>
          <h2 className="section-title">The Person Behind the Work</h2>
        </motion.div>
        
        <motion.div 
          className="about-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.div className="about-image-col" variants={zoomVariants}>
            <div className="about-image-wrap visual-card">
              <img src="/shivansh.jpg" alt="Shivansh Narain" className="about-photo" />
            </div>
            <div className="about-stats">
              <motion.div className="stat-card" whileHover={{ y: -5, scale: 1.05 }}>
                <span className="stat-num">15+</span>
                <span className="stat-label" style={{ color: '#FFFFFF' }}>PROJECTS BUILT</span>
              </motion.div>
              <motion.div className="stat-card" whileHover={{ y: -5, scale: 1.05 }}>
                <span className="stat-num">5+</span>
                <span className="stat-label" style={{ color: '#FFFFFF' }}>SKILLS MASTERED</span>
              </motion.div>
              <motion.div className="stat-card" whileHover={{ y: -5, scale: 1.05 }}>
                <span className="stat-num">2+</span>
                <span className="stat-label" style={{ color: '#FFFFFF' }}>CERTIFICATIONS</span>
              </motion.div>
            </div>
          </motion.div>

          <motion.div className="about-text-col" variants={containerVariants}>
            <motion.p className="about-lead" variants={itemVariants}>
              I am an <strong>Electronics & Communication Engineering</strong> student pursuing B.Tech from <strong>Graphic Era Hill University</strong> — combining hardware roots with a deep passion for software, design, and security.
            </motion.p>
            <motion.p className="about-body" variants={itemVariants}>
              I enjoy building practical digital solutions and continuously improving my technical and creative skills. From designing brand identities to building full-stack web applications, I bring both sides of the creative-technical spectrum to every project.
            </motion.p>
            <motion.div className="interest-grid" variants={containerVariants}>
              {[
                { icon: '⚡', label: 'Full Stack Dev' },
                { icon: '🔐', label: 'Cybersecurity' },
                { icon: '🎨', label: 'Graphic Design' },
                { icon: '🔌', label: 'Embedded Systems' },
                { icon: '🤖', label: 'AI Tools' },
                { icon: '🌐', label: 'Web Technologies' },
              ].map(interest => (
                <motion.button 
                  key={interest.label} 
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="interest-item"
                  onClick={() => handleInterestClick(interest.label)}
                >
                  <span>{interest.label}</span>
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
