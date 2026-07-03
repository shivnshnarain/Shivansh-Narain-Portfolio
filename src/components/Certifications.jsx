import { motion } from 'framer-motion';
import { useScrollContext } from '../context/ScrollContext';
import SectionNumberBackground from './SectionNumberBackground';

export default function Certifications() {
  const { setActiveSection } = useScrollContext();

  const handlePreview = () => alert('Attach your certificate PDF to preview it.');
  const handleDownload = () => alert('Attach your certificate PDF to enable download.');

  const certs = [
    {
      id: 1,
      icon: '🏛️',
      name: 'Cyber Security',
      issuer: 'IIT Guwahati',
      type: 'Micro-Credit Certification',
      year: '2024–2025'
    },
    {
      id: 2,
      icon: '🌐',
      name: 'Web Development',
      issuer: 'Udemy / Coursera',
      type: 'Online Certification',
      year: '2024'
    },
    {
      id: 3,
      icon: '🔐',
      name: 'Ethical Hacking',
      issuer: 'EC-Council / Coursera',
      type: 'Professional Certificate',
      year: '2024'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
  };

  return (
    <motion.section 
      id="certifications" 
      className="section cert-section"
      onViewportEnter={() => setActiveSection('certifications')}
      viewport={{ amount: 0.3 }}
    >
      <SectionNumberBackground number="03" />
      <div className="container">
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-tag">Certifications</span>
          <h2 className="section-title">Credentials & Achievements</h2>
        </motion.div>

        <motion.div 
          className="certs-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {certs.map(cert => (
            <motion.div 
              key={cert.id} 
              className="cert-card visual-card"
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.03, 
                boxShadow: '0 25px 50px rgba(37,99,235,0.1)',
                borderColor: 'rgba(37,99,235,0.2)'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="cert-badge">{cert.icon}</div>
              <div>
                <h3 className="cert-name">{cert.name}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-type">{cert.type}</p>
                <span className="cert-year-badge">{cert.year}</span>
              </div>
              <div className="cert-actions">
                <button className="btn btn-sm btn-outline hover-lift" onClick={handlePreview}>Preview PDF</button>
                <button className="btn btn-sm btn-primary hover-lift" onClick={handleDownload}>Download</button>
                <a href="#" className="btn btn-sm btn-ghost hover-lift">Verify ↗</a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
