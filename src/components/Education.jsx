import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiZoomIn, FiMaximize, FiDownload, FiX, FiChevronLeft, FiChevronRight, FiExternalLink } from 'react-icons/fi';
import { useScrollContext } from '../context/ScrollContext';

const CERTS = [
  { id: 1, title: 'Admission Certificate', src: '/certificate.png', fallback: 'https://images.unsplash.com/photo-1589330694653-efa64753063f?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'ID Card', src: '/id-card.png', fallback: 'https://images.unsplash.com/photo-1633265486064-086b219458ce?auto=format&fit=crop&q=80&w=800' }
];

export default function Education({ setActiveView }) {
  const { setActiveSection } = useScrollContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeImg, setActiveImg] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const openModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = (e) => {
    e?.stopPropagation();
    setIsModalOpen(false);
    setIsZoomed(false);
    setActiveImg(0);
  };

  const handleDownload = (e) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = CERTS[activeImg].src;
    link.download = CERTS[activeImg].title.replace(/\s+/g, '_') + '.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const nextImg = (e) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev + 1) % CERTS.length);
    setIsZoomed(false);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setActiveImg((prev) => (prev - 1 + CERTS.length) % CERTS.length);
    setIsZoomed(false);
  };

  const handleCardClick = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.section
      id="education"
      className="section premium-light-bg"
      onViewportEnter={() => setActiveSection('education')}
      viewport={{ amount: 0.2 }}
    >
      {/* Match About/Contact Fixed Background Implementation */}
      <div className="edu-bg-image" />
      <div className="edu-bg-filter" />
      <div className="edu-bg-glows" />
      <div className="edu-bg-overlay" />
      <div className="container edu-content-container" style={{ position: 'relative', zIndex: 10 }}>
        <motion.div
          className="section-header"
          style={{ marginBottom: '40px' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title" style={{ fontSize: 'clamp(38px, 6vw, 54px)', color: '#000000', fontWeight: 800, margin: '0 auto 16px auto', textAlign: 'center', lineHeight: 1.1 }}>Academic Journey</h2>
          <p className="section-subtitle" style={{ color: '#000000', fontWeight: 500, maxWidth: '750px', margin: '0 auto', textAlign: 'center', fontSize: '18px', lineHeight: 1.6 }}>
            My <span style={{ color: '#000000' }}>Education</span> is a blend of <span style={{ color: '#000000' }}>Engineering</span>, <span style={{ color: '#000000' }}>Cybersecurity</span>, and <span style={{ color: '#000000' }}>Continuous Learning</span>.
          </p>
        </motion.div>

        <motion.div
          className="edu-custom-back-btn-container"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, delay: 0.2 }}
        >
          <button className="edu-glass-btn" onClick={() => setActiveView && setActiveView('home')}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Journey
          </button>
        </motion.div>

        <div className="edu-grid">
          {/* GEHU Card */}
          <motion.div
            className="edu-card-wrapper"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="edu-card" onClick={() => handleCardClick('https://www.gehu.ac.in/')}>
              <div className="edu-card-bg">
                <div 
                  className="edu-card-bg-layer original" 
                  style={{ backgroundImage: 'url(/assets/education/graphic-era-campus.jpg)' }} 
                />
                <div 
                  className="edu-card-bg-layer sketch" 
                  style={{ backgroundImage: 'url(/assets/education/graphic-era-campus-sketch.png)' }} 
                />
              </div>
              <div className="edu-card-overlay" />
              <div className="edu-card-content">
                <div className="edu-header">
                  <div className="edu-logo-box">
                    <img src="/assets/education/graphic-era-logo.png" alt="GEHU Logo" onError={(e) => { e.target.style.display = 'none'; }} className="edu-brand-logo" />
                  </div>
                  <div className="edu-header-text">
                    <h3 className="edu-institution">Graphic Era Hill University, Bhimtal Campus</h3>
                    <span className="edu-year">2024 – 2028</span>
                  </div>
                  <FiExternalLink className="edu-external-icon" />
                </div>
                <div className="edu-body">
                  <p className="edu-degree">Bachelor of Technology</p>
                  <p className="edu-field">Electronics & Communication Engineering</p>
                  <div className="edu-tags">
                    <span className="edu-card-badge">B.Tech</span>
                    <span className="edu-card-badge">ECE</span>
                    <span className="edu-card-badge">Full-Time</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* IIT Guwahati Card */}
          <motion.div
            className="edu-card-wrapper"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="edu-card" onClick={() => handleCardClick('https://www.iitg.ac.in/')}>
              <div className="edu-card-bg">
                <div 
                  className="edu-card-bg-layer original" 
                  style={{ backgroundImage: 'url(/assets/education/iit-guwahati-campus.jpg)' }} 
                />
                <div 
                  className="edu-card-bg-layer sketch" 
                  style={{ backgroundImage: 'url(/assets/education/iit-guwahati-campus-sketch.png)' }} 
                />
              </div>
              <div className="edu-card-overlay" />
              <div className="edu-card-content">
                <div className="edu-header">
                  <div className="edu-multi-logos">
                    <img src="/assets/education/iit-guwahati-logo.svg" alt="IITG Logo" className="edu-brand-logo" />
                    <img src="/assets/education/acciojob-logo.png" alt="AccioJob Logo" className="edu-brand-logo sm" />
                  </div>
                  <div className="edu-header-text">
                    <h3 className="edu-institution">Indian Institute of Technology Guwahati</h3>
                    <span className="edu-year">2024 – 2025</span>
                  </div>
                  <FiExternalLink className="edu-external-icon" />
                </div>
                <div className="edu-body">
                  <p className="edu-degree">Micro-Credit Certification</p>
                  <p className="edu-field">Cyber Security (in collaboration with AccioJob & NSDC)</p>

                  <div className="edu-tags">
                    <span className="edu-card-badge">Certification</span>
                    <span className="edu-card-badge">Cybersecurity</span>
                    <span className="edu-card-badge">IITG</span>
                  </div>

                  <div className="edu-action-area">
                    <button className="btn-view-cert" onClick={openModal}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                      </svg>
                      View Certificate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Learning Beyond the Classroom Section */}
        <motion.div
          className="edu-learning-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <h3 className="edu-learning-title">Learning Beyond the Classroom</h3>
          <p className="edu-learning-text">
            My academic journey is driven by curiosity, innovation, and continuous learning. Alongside my university education, I actively pursue industry-recognized certifications, practical projects, and emerging technologies to strengthen my skills in Electronics, Cybersecurity, Full-Stack Development, and modern digital solutions. Every experience contributes to building a strong foundation for solving real-world problems.
          </p>
          <div className="edu-learning-badges">
            <span className="edu-badge"><span className="edu-badge-icon">🎓</span> Academic Excellence</span>
            <span className="edu-badge"><span className="edu-badge-icon">🔐</span> Cybersecurity</span>
            <span className="edu-badge"><span className="edu-badge-icon">💻</span> Full Stack Development</span>
            <span className="edu-badge"><span className="edu-badge-icon">⚡</span> Problem Solving</span>
            <span className="edu-badge"><span className="edu-badge-icon">🚀</span> Continuous Learning</span>
            <span className="edu-badge"><span className="edu-badge-icon">📚</span> Practical Projects</span>
          </div>
        </motion.div>
      </div>

      {/* Certificate Viewer Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="cert-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="cert-modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="cert-modal-header">
                <h3>{CERTS[activeImg].title}</h3>
                <div className="cert-modal-actions">
                  <button className="cert-icon-btn" onClick={() => setIsZoomed(!isZoomed)} title="Zoom">
                    {isZoomed ? <FiMaximize /> : <FiZoomIn />}
                  </button>
                  <button className="cert-icon-btn" onClick={handleDownload} title="Download">
                    <FiDownload />
                  </button>
                  <button className="cert-icon-btn close-btn" onClick={closeModal} title="Close">
                    <FiX />
                  </button>
                </div>
              </div>

              <div className={`cert-modal-body ${isZoomed ? 'zoomed' : ''}`}>
                <img
                  src={CERTS[activeImg].src}
                  onError={(e) => { e.target.src = CERTS[activeImg].fallback; }}
                  alt={CERTS[activeImg].title}
                  className="cert-img"
                />

                {CERTS.length > 1 && (
                  <>
                    <button className="nav-btn prev" onClick={prevImg}><FiChevronLeft /></button>
                    <button className="nav-btn next" onClick={nextImg}><FiChevronRight /></button>
                  </>
                )}
              </div>

              <div className="cert-modal-footer">
                <div className="cert-indicators">
                  {CERTS.map((_, idx) => (
                    <div
                      key={idx}
                      className={`cert-dot ${idx === activeImg ? 'active' : ''}`}
                      onClick={() => { setActiveImg(idx); setIsZoomed(false); }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .premium-light-bg {
          background-color: var(--premium-bg);
          color: var(--text-main);
          overflow: hidden;
          position: relative;
          min-height: 100vh;
          display: grid;
          padding: 0 !important;
          margin: 0 !important;
        }
        .edu-bg-image {
          position: absolute;
          inset: 0;
          background-image: url('/assets/education/academic-bg.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          background-attachment: fixed;
          opacity: 0.9;
          z-index: 0;
          pointer-events: none;
        }
        .edu-bg-filter {
          position: absolute;
          inset: 0;
          backdrop-filter: grayscale(100%) blur(5px);
          -webkit-backdrop-filter: grayscale(100%) blur(5px);
          z-index: 1;
          pointer-events: none;
        }
        .edu-bg-glows {
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle 35vw at 15% 25%, rgba(255, 213, 74, 0.2), transparent 70%),
            radial-gradient(circle 40vw at 85% 75%, rgba(246, 196, 83, 0.2), transparent 70%),
            radial-gradient(circle 20vw at 50% 50%, rgba(233, 185, 73, 0.1), transparent 70%);
          z-index: 2;
          pointer-events: none;
        }
        .edu-bg-overlay {
          position: absolute;
          inset: 0;
          background: rgba(255, 255, 255, 0.25);
          z-index: 3;
          pointer-events: none;
        }
        .edu-content-container {
          grid-area: 1 / 1;
          z-index: 10;
          padding: 140px 24px 60px 24px;
          align-self: center;
          width: 100%;
          max-width: 1350px;
          margin: 0 auto;
        }
        .edu-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          max-width: 1440px;
          margin: 0 auto;
        }
        @media (max-width: 900px) {
          .edu-grid { grid-template-columns: 1fr; }
        }
        .edu-card-wrapper {
          position: relative;
          height: 100%;
          animation: cardFloat 2.5s ease-in-out infinite alternate;
        }
        .edu-card-wrapper:nth-child(2) {
          animation-delay: -1.25s;
          animation-duration: 3s;
        }
        @keyframes cardFloat {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-6px); }
        }
        .edu-card {
          position: relative;
          border-radius: 28px;
          overflow: hidden;
          isolation: isolate;
          -webkit-mask-image: -webkit-radial-gradient(white, black);
          cursor: pointer;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 15px 35px rgba(0,0,0,0.08);
          transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
          height: 100%;
          min-height: 440px;
          display: flex;
          flex-direction: column;
        }
        .edu-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: rgba(255, 255, 255, 0.4);
          box-shadow: 0 30px 60px rgba(0,0,0,0.2), 0 0 80px rgba(255, 255, 255, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.5);
        }
        .edu-card-bg {
          position: absolute;
          inset: 0;
          border-radius: 28px;
          z-index: 0;
          overflow: hidden;
        }
        .edu-card-bg-layer {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: opacity 0.45s ease-in-out;
        }
        .edu-card-bg-layer.original {
          opacity: 1;
        }
        .edu-card-bg-layer.sketch {
          opacity: 0;
        }
        .edu-card:hover .edu-card-bg-layer.original {
          opacity: 0;
        }
        .edu-card:hover .edu-card-bg-layer.sketch {
          opacity: 1;
        }
        .edu-card-overlay {
          position: absolute;
          inset: 0;
          border-radius: 28px;
          background: rgba(255, 255, 255, 0.5);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.4), inset 0 0 40px rgba(255, 255, 255, 0.05);
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          z-index: 1;
          pointer-events: none;
          transition: background 0.45s ease-in-out;
        }
        .edu-card:hover .edu-card-overlay {
          background: rgba(255, 255, 255, 0.2);
        }
        .edu-card-content {
          position: relative;
          z-index: 2;
          padding: 32px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        @media (max-width: 768px) {
          .edu-card-content { padding: 30px 24px; }
        }
        .edu-header {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          margin-bottom: 24px;
        }
        .edu-logo-box {
          width: 64px;
          height: 64px;
          background: #ffffff;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          padding: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.04);
        }
        .edu-multi-logos {
          display: flex;
          gap: 8px;
          align-items: center;
          background: #ffffff;
          border-radius: 16px;
          padding: 8px 12px;
          height: 64px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.04);
        }
        .edu-brand-logo {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .edu-brand-logo.sm {
          max-width: 40px;
        }
        .edu-header-text {
          flex: 1;
        }
        .edu-institution {
          font-size: 22px;
          font-weight: 800;
          color: #000000;
          margin-bottom: 6px;
          line-height: 1.3;
        }
        @media (max-width: 768px) {
          .edu-institution { font-size: 18px; }
          .edu-header { flex-direction: column; }
        }
        .edu-year {
          font-size: 14px;
          color: #000000;
          font-weight: 700;
          letter-spacing: 0.05em;
        }
        .edu-external-icon {
          color: #000000;
          font-size: 24px;
          transition: all 0.3s;
        }
        .edu-card:hover .edu-external-icon {
          color: #000000;
          transform: translate(4px, -4px);
        }
        .edu-body {
          display: flex;
          flex-direction: column;
          flex: 1;
        }
        .edu-degree {
          font-size: 18px;
          font-weight: 800;
          color: #000000;
          margin-bottom: 4px;
        }
        .edu-field {
          font-size: 15px;
          font-weight: 700;
          color: #000000;
          margin-bottom: 20px;
          line-height: 1.6;
        }
        .edu-tags {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }
        .edu-card-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(0, 0, 0, 0.30);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          color: #000000;
          font-weight: 600;
          font-size: 13px;
          padding: 8px 16px;
          border-radius: 100px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          height: 32px;
        }
        .edu-card-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
        }
        .edu-action-area {
          margin-top: auto;
          padding-top: 10px;
        }
        .btn-view-cert {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          color: #000000;
          border: 1px solid rgba(0,0,0,0.1);
          padding: 12px 24px;
          border-radius: 100px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .btn-view-cert:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(255, 255, 255, 0.3);
        }

        /* Modal Styles */
        .cert-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px;
        }
        @media (max-width: 768px) {
          .cert-modal-backdrop { padding: 20px; }
        }
        .cert-modal-content {
          background: #111;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px;
          width: 100%;
          max-width: 1000px;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(0,0,0,0.5);
        }
        .cert-modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px 30px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        .cert-modal-header h3 {
          color: #fff;
          font-size: 18px;
          font-weight: 600;
        }
        .cert-modal-actions {
          display: flex;
          gap: 12px;
        }
        .cert-icon-btn {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.05);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          border: 1px solid rgba(255,255,255,0.05);
          cursor: pointer;
          transition: all 0.2s;
        }
        .cert-icon-btn:hover {
          background: rgba(255,255,255,0.15);
          transform: translateY(-2px);
        }
        .cert-icon-btn.close-btn:hover {
          background: rgba(255,50,50,0.2);
          color: #ff5555;
        }
        .cert-modal-body {
          position: relative;
          background: #0a0a0a;
          height: 60vh;
          min-height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 20px;
        }
        .cert-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 8px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        }
        .cert-modal-body.zoomed .cert-img {
          transform: scale(1.5);
          cursor: zoom-out;
        }
        .nav-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          border: 1px solid rgba(255,255,255,0.2);
          cursor: pointer;
          backdrop-filter: blur(4px);
          transition: all 0.2s;
          z-index: 10;
        }
        .nav-btn:hover {
          background: rgba(255,255,255,0.25);
          transform: translateY(-50%) scale(1.1);
        }
        .nav-btn.prev { left: 20px; }
        .nav-btn.next { right: 20px; }
        
        .cert-modal-footer {
          padding: 20px;
          border-top: 1px solid rgba(255,255,255,0.1);
          display: flex;
          justify-content: center;
        }
        .cert-indicators {
          display: flex;
          gap: 12px;
        }
        .cert-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.2);
          cursor: pointer;
          transition: all 0.3s;
        }
        .cert-dot.active {
          background: #4A90A4;
          transform: scale(1.3);
          box-shadow: 0 0 10px rgba(74,144,164,0.5);
        }
        
        /* Custom Back to Journey Button Theme */
        .edu-custom-back-btn-container {
          display: flex;
          justify-content: center;
          margin-top: 32px;
          margin-bottom: 60px;
        }
        .edu-glass-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(17, 17, 17, 0.05);
          color: #000000;
          border: 1px solid #000000;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 12px 28px;
          border-radius: 100px;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.35s ease;
          box-shadow: 0 0 15px rgba(17, 17, 17, 0.05);
        }
        .edu-glass-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.6), 0 0 15px rgba(255, 255, 255, 0.4);
          border-color: #FFFFFF;
          background: #FFFFFF;
          color: #000000;
        }

        /* --- Premium Background Effects for Education Section --- */
        .edu-glass-reflection {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: linear-gradient(
            135deg, 
            rgba(255, 255, 255, 0.03) 0%, 
            rgba(255, 255, 255, 0.0) 35%, 
            rgba(255, 255, 255, 0.0) 65%, 
            rgba(255, 213, 74, 0.03) 100%
          );
          mix-blend-mode: screen;
        }
        
        .edu-ambient-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          z-index: 0;
          pointer-events: none;
          opacity: 0.4;
        }
        .edu-ambient-glow.glow-white {
          top: -20%; left: 10%;
          width: 50vw; height: 50vh;
          background: rgba(255, 255, 255, 0.04);
        }
        .edu-ambient-glow.glow-gold {
          bottom: -10%; right: 10%;
          width: 60vw; height: 60vh;
          background: rgba(255, 213, 74, 0.03);
        }
        
        .edu-light-haze {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          opacity: 0.4;
        }
        .edu-light-haze.haze-left {
          width: 70vw; height: 10vh;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.04), transparent);
          top: 30%; left: -20%;
          filter: blur(50px);
          animation: edu-haze-float-left 25s infinite ease-in-out alternate;
        }
        .edu-light-haze.haze-right {
          width: 60vw; height: 15vh;
          background: linear-gradient(90deg, transparent, rgba(255, 213, 74, 0.03), transparent);
          bottom: 25%; right: -15%;
          filter: blur(60px);
          animation: edu-haze-float-right 28s infinite ease-in-out alternate;
        }
        
        @keyframes edu-haze-float-left {
          0% { transform: translateY(0px) rotate(-10deg); opacity: 0.3; }
          100% { transform: translateY(-40px) rotate(-5deg); opacity: 0.6; }
        }
        @keyframes edu-haze-float-right {
          0% { transform: translateY(0px) rotate(15deg); opacity: 0.3; }
          100% { transform: translateY(40px) rotate(20deg); opacity: 0.6; }
        }

        /* --- Learning Beyond the Classroom --- */
        .edu-learning-section {
          margin-top: 80px;
          text-align: center;
          padding: 60px 40px;
          background: rgba(255, 255, 255, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-radius: 32px;
          border: 1px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
        }
        @media (max-width: 768px) {
          .edu-learning-section {
            padding: 40px 24px;
            margin-top: 60px;
          }
        }
        .edu-learning-title {
          font-size: 32px;
          font-weight: 800;
          color: #000000;
          margin-bottom: 24px;
        }
        @media (max-width: 768px) {
          .edu-learning-title { font-size: 26px; }
        }
        .edu-learning-text {
          font-size: 17px;
          line-height: 1.8;
          color: #000000;
          margin-bottom: 40px;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }
        @media (max-width: 768px) {
          .edu-learning-text { font-size: 16px; }
        }
        .edu-learning-badges {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          justify-content: center;
        }
        .edu-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          color: #000000;
          font-weight: 600;
          font-size: 15px;
          padding: 12px 24px;
          border-radius: 100px;
          box-shadow: 0 4px 15px rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .edu-badge:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.08);
        }
        .edu-badge-icon {
          font-size: 18px;
        }

        /* --- Strict Text Color Override to defeat global inheritances --- */
        #education h1, #education h2, #education h3, #education h4, #education h5, #education h6,
        #education p, #education span, #education a, #education li, #education strong, 
        #education em, #education b, #education i, #education button, #education svg,
        .section-title, .section-subtitle, .edu-glass-btn, .edu-institution, .edu-year,
        .edu-degree, .edu-field, .edu-card-badge, .edu-badge, .edu-learning-title,
        .edu-learning-text, .btn-view-cert, .edu-external-icon, .edu-badge-icon,
        .cert-modal-header h3, .cert-icon-btn, .nav-btn {
          color: #000000 !important;
          opacity: 1 !important;
          filter: none !important;
          text-shadow: none !important;
          mix-blend-mode: normal !important;
          -webkit-text-fill-color: #000000 !important;
        }
      `}</style>
    </motion.section>
  );
}
