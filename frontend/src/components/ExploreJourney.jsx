import { motion } from 'framer-motion';
import { useScrollContext } from '../context/ScrollContext';

const cards = [
  {
    id: 'skills',
    title: 'Skills & Technologies',
    desc: 'Explore my development, cybersecurity, electronics, design, and tool expertise.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFC857" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    )
  },
  {
    id: 'education',
    title: 'Academic Journey',
    desc: 'My educational path from Graphic Era Hill University and IIT Guwahati.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFC857" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
      </svg>
    )
  },
  {
    id: 'projects',
    title: 'Projects & Portfolio',
    desc: 'A collection of web development, cybersecurity, electronics, and graphic design projects.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#FFC857" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
    )
  },

];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: "spring", stiffness: 80, damping: 15 } 
  }
};

export default function ExploreJourney({ setActiveView }) {
  const { setActiveSection } = useScrollContext();

  const handleCardClick = (id) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      setActiveView(id);
    }, 150);
  };

  return (
    <motion.section 
      id="explore" 
      className="section explore-section premium-gray-bg"
      onViewportEnter={() => setActiveSection('explore')}
      viewport={{ amount: 0.2 }}
    >
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.8 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <h2 className="explore-title" style={{ color: 'var(--text-main)', fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800' }}>EXPLORE MY JOURNEY</h2>
          <p className="explore-subtitle" style={{ color: 'var(--text-sec)', fontSize: '18px', maxWidth: '600px', margin: '0 auto' }}>
            Discover my skills, education, and projects.
          </p>
        </motion.div>
        
        <motion.div 
          className="explore-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {cards.map((card) => (
            <motion.div 
              key={card.id}
              className="explore-card premium-glass-card"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.02, 
                y: -10,
                boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                borderColor: 'rgba(244, 197, 66, 0.4)'
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCardClick(card.id)}
            >
              <div className="explore-card-bg-gradient" style={{ background: 'linear-gradient(135deg, rgba(244,197,66,0.05), transparent)' }}></div>
              <div className="explore-card-icon" style={{ 
                background: 'rgba(244,197,66,0.1)', 
                color: 'var(--accent-primary)', 
                width: '72px',
                height: '72px',
                borderRadius: '20px', 
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px' 
              }}>
                {card.icon}
              </div>
              <h3 className="explore-card-title" style={{ color: 'var(--text-main)', fontSize: '22px', fontWeight: '700', marginBottom: '12px' }}>{card.title}</h3>
              <p className="explore-card-desc" style={{ color: 'var(--text-sec)', fontSize: '15px', lineHeight: '1.6' }}>{card.desc}</p>
              
              <div className="explore-card-arrow" style={{ marginTop: '30px', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '14px' }}>
                <span>Explore</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
