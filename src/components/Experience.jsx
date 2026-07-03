import { motion } from 'framer-motion';
import { useScrollContext } from '../context/ScrollContext';

export default function Experience() {
  const { setActiveSection } = useScrollContext();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.section 
      id="experience" 
      className="section exp-section"
      onViewportEnter={() => setActiveSection('experience')}
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
          <span className="section-tag">Experience</span>
          <h2 className="section-title">Professional Journey</h2>
        </motion.div>

        <div style={{ position: 'relative', paddingLeft: '40px', marginTop: '40px' }}>
          {/* Vertical Timeline Line */}
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              left: '8px',
              top: 0,
              width: '4px',
              background: 'linear-gradient(to bottom, #2563EB, #4A90A4)',
              borderRadius: '4px'
            }}
          />

          {/* Timeline Dot */}
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring", stiffness: 300, damping: 15 }}
            style={{
              position: 'absolute',
              left: 0,
              top: '40px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              background: '#2563EB',
              border: '4px solid #ffffff',
              boxShadow: '0 0 15px rgba(37,99,235,0.4)',
              zIndex: 2
            }}
          />

          <motion.div 
            className="exp-card visual-card"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.4, duration: 0.6, type: "spring", bounce: 0.2 }}
            whileHover={{ y: -8, boxShadow: '0 25px 50px rgba(0,0,0,0.08)' }}
          >
            <motion.div className="exp-header" variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <motion.div variants={itemVariants} className="exp-logo-wrap" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontWeight: 800, fontSize: '20px', color: '#2563EB' }}>OX</span>
              </motion.div>
              <motion.div variants={itemVariants}>
                <h3 className="exp-company">Oxellus</h3>
                <p className="exp-role">Chief Operating Officer (COO)</p>
                <span className="exp-duration">2024 – Present</span>
              </motion.div>
              <motion.a 
                variants={itemVariants} 
                href="https://oxellus.netlify.app" 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-sm btn-outline exp-header-ml hover-lift"
              >
                Visit Website ↗
              </motion.a>
            </motion.div>

            <motion.p 
              className="exp-desc"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
            >
              Oxellus is a forward-thinking technology company focused on building innovative digital solutions, web platforms, and technology products for modern businesses.
            </motion.p>

            <motion.div 
              className="exp-responsibilities"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h4 variants={itemVariants}>Key Responsibilities</motion.h4>
              <ul className="exp-list">
                {[
                  "Overseeing company operations and technology strategy",
                  "Leading product development and web application projects",
                  "Managing cross-functional teams and client relationships",
                  "Driving cybersecurity initiatives and digital infrastructure",
                  "Business development and partnership building"
                ].map((item, i) => (
                  <motion.li key={i} variants={itemVariants} className="exp-list-item">{item}</motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              className="exp-achievements"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h4 variants={itemVariants}>Achievements</motion.h4>
              <div className="achievement-chips">
                {[
                  { icon: "🚀", text: "Launched company platform" },
                  { icon: "🤝", text: "Built client portfolio" },
                  { icon: "💡", text: "Led 5+ projects" },
                  { icon: "📈", text: "Scaled operations" }
                ].map((chip, i) => (
                  <motion.span 
                    key={i} 
                    variants={itemVariants} 
                    className="achievement-chip"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(37,99,235,0.1)' }}
                  >
                    {chip.icon} {chip.text}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
