import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PdfViewer from './PdfViewer';

const INTERNSHIP_DOCS = [
  {
    id: 1,
    title: 'Offer Letter',
    company: 'ABCD Design',
    role: 'Graphic Designer Intern Trainee',
    isFuture: false,
    isPdf: false,
    fileUrl: '/offer-letter-uploaded.png',
    img: '/abcd_thumb.jpg', // Placeholder thumbnail
    type: 'Offer Letter'
  },
  {
    id: 2,
    title: 'Internship Certificate',
    company: 'ABCD Design',
    role: 'Graphic Designer Intern',
    isFuture: true,
    isPdf: false,
    fileUrl: '#',
    img: '/placeholder-cert.jpg',
    type: 'Certificate'
  },
  {
    id: 3,
    title: 'Experience Certificate',
    company: 'Future Experience',
    role: 'Professional Role',
    isFuture: true,
    isPdf: false,
    fileUrl: '#',
    img: '/placeholder-exp.jpg',
    type: 'Certificate'
  },
  {
    id: 4,
    title: 'Additional Documents',
    company: 'Professional Development',
    role: 'Various',
    isFuture: true,
    isPdf: false,
    fileUrl: '#',
    img: '/placeholder-doc.jpg',
    type: 'Document'
  }
];

export default function InternshipExperience() {
  const [selectedDoc, setSelectedDoc] = useState(null);

  return (
    <section className="section internship-section" style={{ background: '#F9FAFB', position: 'relative' }}>
      <div className="container">
        <div className="section-header">
          <motion.span 
            className="section-tag"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Professional Journey
          </motion.span>
          <motion.h2 
            className="section-title title-solid"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            INTERNSHIP EXPERIENCE
          </motion.h2>
          <motion.p 
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Showcasing official documents, certificates, and records of my professional experience and internships.
          </motion.p>
        </div>

        <div className="internship-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginTop: '40px' }}>
          {INTERNSHIP_DOCS.map((doc, index) => (
            <motion.div
              key={doc.id}
              className={`internship-card ${doc.isFuture ? 'future-card' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.4)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.4s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.05)';
              }}
            >
              <div 
                className="internship-thumb"
                style={{
                  height: '200px',
                  background: doc.isFuture ? '#f3f4f6' : '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderBottom: '1px solid rgba(0,0,0,0.05)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {doc.isFuture ? (
                  <div style={{ color: '#9ca3af', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>To Be Updated</span>
                  </div>
                ) : (
                  <img 
                    src={doc.img} 
                    alt={doc.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} 
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                {!doc.isFuture && (
                  <div className="thumb-overlay" style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: 0,
                    transition: 'opacity 0.3s'
                  }}>
                  </div>
                )}
              </div>

              <div className="internship-content" style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '12px', fontWeight: '700', color: '#4A90A4', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
                  {doc.company}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111', marginBottom: '4px' }}>
                  {doc.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px', flex: 1 }}>
                  {doc.role}
                </p>

                <button 
                  className={`btn ${doc.isFuture ? 'btn-ghost' : 'btn-primary'} btn-full`}
                  disabled={doc.isFuture}
                  onClick={() => !doc.isFuture && setSelectedDoc(doc)}
                  style={{
                    opacity: doc.isFuture ? 0.6 : 1,
                    cursor: doc.isFuture ? 'not-allowed' : 'pointer'
                  }}
                >
                  {doc.isFuture ? 'Coming Soon' : `View ${doc.type}`}
                  {!doc.isFuture && (
                    <span className="arrow" style={{ marginLeft: '6px' }}>→</span>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedDoc && selectedDoc.id === 1 ? (
          <motion.div 
            className="premium-project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedDoc(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.6)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem'
            }}
          >
            <motion.div 
              className="premium-project-modal-content"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={e => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '800px',
                height: 'auto',
                maxHeight: '95vh',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflowY: 'auto'
              }}
            >
              <button 
                onClick={() => setSelectedDoc(null)}
                style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', transition: 'background 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
              >&times;</button>
              
              <div style={{ 
                width: '100%', 
                height: 'auto',
                position: 'relative', 
                borderRadius: '16px', 
                overflow: 'hidden', 
                border: '1px solid rgba(255,255,255,0.4)', 
                boxShadow: '0 0 30px rgba(255,255,255,0.2)',
                background: 'rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img src={selectedDoc.fileUrl} alt={selectedDoc.title} style={{ width: '100%', height: 'auto', display: 'block' }} draggable="false" />
              </div>
            </motion.div>
          </motion.div>
        ) : selectedDoc && (
          <motion.div 
            className="gallery-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedDoc(null)}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)' }}
          >
            <button 
              className="gallery-modal-close" 
              onClick={() => setSelectedDoc(null)}
              style={{ position: 'absolute', top: '30px', right: '40px', background: 'none', border: 'none', color: '#fff', fontSize: '40px', cursor: 'pointer', zIndex: 10 }}
            >&times;</button>
            
            <motion.div 
              className={`gallery-modal-content ${selectedDoc.isPdf ? 'pdf-modal' : ''}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={e => e.stopPropagation()}
              style={{ width: '90%', maxWidth: '1000px', maxHeight: '90vh', background: '#fff', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ flex: 1, overflow: 'hidden', position: 'relative', background: '#f5f5f5' }}>
                {selectedDoc.isPdf ? (
                  <PdfViewer file={selectedDoc.fileUrl} />
                ) : (
                  <img src={selectedDoc.fileUrl} alt={selectedDoc.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                )}
              </div>
              <div style={{ padding: '20px 30px', background: '#fff', borderTop: '1px solid #eee' }}>
                <h3 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: '#111' }}>{selectedDoc.title}</h3>
                <p style={{ margin: '4px 0 0', color: '#666', fontSize: '14px' }}>{selectedDoc.company} • {selectedDoc.role}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
