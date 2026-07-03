import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useScrollContext } from '../context/ScrollContext';
import SectionNumberBackground from './SectionNumberBackground';

const PROJECTS = [
  {
    id: 1,
    title: 'Kanak Grih',
    description: 'Financial services and loan assistance platform for government employees and businesses.',
    liveUrl: 'https://kanakgrih.com',
    image: '/assets/projects/kanakgrih.jpg'
  },
  {
    id: 2,
    title: 'Anoop Kumar Saxena',
    description: 'Professional advocate portfolio website with modern responsive design.',
    liveUrl: 'https://www.anoopkumarsaxena.social',
    image: '/assets/projects/anoop.jpg'
  },
  {
    id: 3,
    title: 'Oxellus Healthcare',
    description: 'Premium pharmaceutical-grade health supplement platform featuring clinical excellence and a luxury dark-mode design.',
    liveUrl: 'https://oxellus.netlify.app',
    image: '/assets/projects/oxellus.jpg'
  },
  {
    id: 4,
    title: 'Help Me Projects',
    description: 'Professional web application and interactive project platform.',
    liveUrl: 'https://helpmeprojects.com',
    image: '/assets/projects/helpmeprojects.jpg'
  }
];

export default function ProjectShowcase({ setActiveView }) {
  const { setActiveSection } = useScrollContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex, isHovered]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);
  };

  const currentProject = PROJECTS[currentIndex];

  const slideVariants = {
    initial: (dir) => ({ opacity: 0, x: dir === 1 ? 80 : -80, scale: 0.98 }),
    animate: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
    exit: (dir) => ({ opacity: 0, x: dir === 1 ? -80 : 80, scale: 0.98, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } })
  };

  return (
    <motion.section 
      id="website-showcase" 
      className="section fw-showcase-section"
      onViewportEnter={() => setActiveSection('projects')}
      viewport={{ amount: 0.2 }}
      ref={sectionRef}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={(dir) => ({ opacity: 0, y: dir === 1 ? 50 : -50 })}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }}
          exit={(dir) => ({ opacity: 0, y: dir === 1 ? -50 : 50, transition: { duration: 0.4 } })}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
        >
          <SectionNumberBackground number={`0${currentIndex + 1}`} />
        </motion.div>
      </AnimatePresence>
      {/* Glossy Background Effects */}
      <div className="fw-glass-bg"></div>

      <div className="fw-header container">
        <button className="fw-nav-btn fw-nav-dark" onClick={handlePrev}><FiChevronLeft /></button>
        <motion.h2 
          className="section-title fw-gradient-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ fontWeight: 800, margin: 0 }}
        >
          Website Showcase
        </motion.h2>
        <button className="fw-nav-btn fw-nav-dark" onClick={handleNext}><FiChevronRight /></button>
      </div>

      <div className="fw-main-content">
        {/* SLIDER WRAPPER - Layer 2 */}
        <motion.div 
          className="fw-slider-wrapper" 
          style={{ boxShadow: '0 0 0 rgba(0,0,0,0)' }}
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="fw-slide-inner"
            >
              <a href={currentProject.liveUrl} target="_blank" rel="noreferrer" className="fw-preview-link">
                <div className="fw-image-container">
                  <iframe 
                    src={currentProject.liveUrl} 
                    title={currentProject.title} 
                    className="fw-image"
                    sandbox="allow-scripts allow-same-origin"
                    style={{ border: 'none', pointerEvents: 'none', width: '100%', height: '100%' }}
                  />
                  <div className="fw-gradient-overlay" />
                  
                  {/* Embedded Title & Description */}
                  <div className="fw-project-info">
                    <h3 className="fw-title">{currentProject.title}</h3>
                    <p className="fw-desc">{currentProject.description}</p>
                    <div className="fw-view-btn">
                      <span>View Live Site</span>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        .fw-showcase-section {
          background: linear-gradient(135deg, #ffffff 0%, #f4f6f9 50%, #e2e8f0 100%);
          position: relative;
          padding: 120px 0;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          overflow: hidden;
          z-index: 1;
          margin: 0;
          border: none;
        }

        .fw-glass-bg {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 80% 20%, rgba(255,255,255,1) 0%, transparent 60%),
                      radial-gradient(circle at 20% 80%, rgba(226,232,240,0.8) 0%, transparent 60%);
          backdrop-filter: blur(40px);
          -webkit-backdrop-filter: blur(40px);
          z-index: -2;
        }

        .fw-header {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 50px;
          margin-bottom: 30px;
          z-index: 30; /* Layer 3: Navigation */
          position: relative;
          width: 100%;
        }

        .fw-gradient-text {
          font-size: 56px;
          letter-spacing: -1px;
          background: linear-gradient(to right, #FFD54A, #FF8C00, #FF1493, #8A2BE2, #00BFFF);
          background-size: 200% auto;
          color: transparent !important;
          -webkit-background-clip: text;
          background-clip: text;
          animation: fw-gradientSweep 6s linear infinite;
          text-shadow: 0 0 30px rgba(255, 213, 74, 0.4);
        }

        @keyframes fw-gradientSweep {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }

        @media (max-width: 768px) {
          .fw-header {
            gap: 20px;
          }
          .fw-gradient-text {
            font-size: 32px;
          }
        }

        .fw-nav-dark {
          background: rgba(255, 255, 255, 0.8) !important;
          border: 1px solid rgba(0, 0, 0, 0.08) !important;
          color: #0f172a !important;
          box-shadow: 0 10px 25px rgba(0,0,0,0.06);
          flex-shrink: 0;
        }

        .fw-nav-dark:hover {
          background: white !important;
          border-color: rgba(0, 0, 0, 0.1) !important;
          transform: scale(1.05);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1);
        }

        .fw-nav-btn {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          cursor: pointer;
          backdrop-filter: blur(10px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fw-main-content {
          position: relative;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .fw-slider-wrapper {
          position: relative;
          width: 85%;
          max-width: 1500px;
          margin: 0 auto;
          aspect-ratio: 16 / 9;
          z-index: 10; /* Layer 2: In front of number */
        }

        @media (max-width: 992px) {
          .fw-slider-wrapper {
            width: 95%;
            aspect-ratio: 16 / 10;
          }
        }

        @media (max-width: 768px) {
          .fw-slider-wrapper {
            width: 90%;
            aspect-ratio: 4 / 3;
          }
        }

        .fw-slide-inner {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .fw-preview-link {
          display: block;
          width: 100%;
          height: 100%;
          text-decoration: none;
          color: inherit;
        }

        .fw-image-container {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
          background: #fff;
          border-radius: 24px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.15), 0 0 0 1px rgba(255,255,255,0.8);
        }

        .fw-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Premium Hover Animation */
        .fw-preview-link:hover .fw-image {
          transform: scale(1.04);
        }

        .fw-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%, transparent 100%);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0.8;
        }

        .fw-preview-link:hover .fw-gradient-overlay {
          opacity: 0.95;
          background: linear-gradient(to top, rgba(79, 70, 229, 0.9) 0%, rgba(0,0,0,0.3) 70%, transparent 100%);
        }

        .fw-project-info {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          padding: 80px 60px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          transform: translateY(20px);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fw-preview-link:hover .fw-project-info {
          transform: translateY(-10px);
        }

        @media (max-width: 768px) {
          .fw-project-info {
            padding: 40px 30px;
          }
        }

        .fw-title {
          font-size: 56px;
          font-weight: 800;
          color: white;
          margin: 0 0 16px 0;
          text-shadow: 0 10px 30px rgba(0,0,0,0.5);
          letter-spacing: -1px;
        }

        .fw-desc {
          font-size: 20px;
          color: rgba(255, 255, 255, 0.9);
          max-width: 600px;
          margin: 0 0 40px 0;
          line-height: 1.6;
          text-shadow: 0 5px 15px rgba(0,0,0,0.5);
        }

        .fw-view-btn {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
          padding: 18px 36px;
          border-radius: 100px;
          background: white;
          box-shadow: 0 15px 40px rgba(0,0,0,0.2);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0;
          transform: translateY(20px);
        }

        .fw-preview-link:hover .fw-view-btn {
          opacity: 1;
          transform: translateY(0);
          box-shadow: 0 20px 50px rgba(255,255,255,0.4);
        }
      `}</style>
    </motion.section>
  );
}
