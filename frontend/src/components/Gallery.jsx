import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { useScrollContext } from '../context/ScrollContext';
import PdfViewer from './PdfViewer';
import SectionNumberBackground from './SectionNumberBackground';
const PORTFOLIO_DATA = [
  { id: 1, title: 'Republic Day Poster', cat: 'posters', software: 'Adobe Photoshop', img: '/poster1.jpg' },
  { id: 2, title: 'Valentine Campaign', cat: 'social', software: 'Canva', img: '/poster2.jpg' },
  { id: 3, title: 'Solar Connect', cat: 'posters', software: 'Adobe Illustrator', img: '/poster3.jpg' },
  { id: 4, title: 'Solar Plant Corporate', cat: 'posters', software: 'Adobe Photoshop', img: '/poster4.jpg' },
  { id: 5, title: 'Digilox Valentine', cat: 'social', software: 'Adobe Photoshop', img: '/poster5.png' },
  { id: 6, title: 'Digilox Republic Day', cat: 'posters', software: 'Adobe Illustrator', img: '/poster6.jpg' },
  { id: 7, title: 'Niva Ecotech Valentine', cat: 'social', software: 'Canva', img: '/poster7.jpg' },
  { id: 8, title: 'Niva Ecotech Republic Day', cat: 'posters', software: 'Adobe Photoshop', img: '/poster8.jpg' },
  { id: 9, title: 'ABCD Design Presentation', cat: 'corporate', software: 'Canva / PowerPoint / Adobe Tools', isPdf: true, pdfUrl: '/ABCDesign.pdf', img: '/abcd_thumb.jpg' },
  { id: 10, title: 'DC Link Company Brochure', cat: 'brochure', software: 'Canva / Photoshop / Illustrator', isPdf: true, pdfUrl: '/DCLink.pdf', img: '/dclink_thumb.jpg' },
  { id: 11, title: 'Digilox New Year 2026', cat: 'social', software: 'Adobe Photoshop', img: '/graphic-project-new-01.jpg' },
  { id: 12, title: 'DC Link New Year 2026', cat: 'posters', software: 'Adobe Illustrator', img: '/graphic-project-new-02.jpg' },
];


const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'posters', label: 'Posters' },
  { id: 'social', label: 'Social Media' },
  { id: 'corporate', label: 'Presentations' },
  { id: 'brochure', label: 'Brochures' },
  { id: 'logos', label: 'Logos' },
  { id: 'branding', label: 'Branding' },
];

const StackedCard = ({ item, index, total, currentIndex, setSelectedImage, windowWidth }) => {
  const isMobile = windowWidth <= 768;
  const isTablet = windowWidth <= 1100 && windowWidth > 768;

  let diff = (index - currentIndex + total) % total;
  let isFront = diff === 0;
  let isOutgoing = diff === total - 1;
  
  // Max visible cards on mobile is 2, on tablet is 4, on desktop is 7
  const maxVisible = isMobile ? 2 : (isTablet ? 4 : 7);
  let isHiddenRight = diff > maxVisible && !isOutgoing;

  let visualDiff = diff;
  if (isHiddenRight) visualDiff = maxVisible + 1;
  if (diff > maxVisible && !isHiddenRight && !isOutgoing) visualDiff = maxVisible;

  // Responsive offsets
  const baseOffset = isMobile ? 35 : (isTablet ? 60 : 115);
  const baseZOffset = isMobile ? -80 : (isTablet ? -100 : -160);
  const scaleReduction = isMobile ? 0.08 : 0.07;

  let xOffset = isOutgoing ? (isMobile ? -100 : -150) : (isHiddenRight ? (maxVisible + 1) * baseOffset : visualDiff * baseOffset);
  let x = `calc(-50% + ${xOffset}px)`;
  let y = "-50%";
  
  let z = isFront || isOutgoing ? 50 : (isHiddenRight ? (maxVisible + 1) * baseZOffset : visualDiff * baseZOffset);
  let scale = isFront || isOutgoing ? 1 : Math.max(1 - (isHiddenRight ? maxVisible + 1 : visualDiff) * scaleReduction, 0);
  let rotateY = isFront ? 0 : (isOutgoing ? 8 : (isMobile ? -3 : -8));
  let zIndex = isOutgoing ? total + 1 : (isHiddenRight ? 0 : total - visualDiff);
  let opacity = isOutgoing || isHiddenRight ? 0 : (isFront ? 1 : (isMobile ? Math.max(1 - visualDiff * 0.3, 0) : 1));

  let shadowBlur = isFront || isOutgoing ? 30 : Math.max(12 - visualDiff * 2, 2);
  let shadowY = isFront || isOutgoing ? 20 : Math.max(10 - visualDiff * 1.5, 4);
  let shadowOpacity = isFront ? 0.3 : (isOutgoing || isHiddenRight ? 0 : Math.max(0.12 - visualDiff * 0.02, 0));
  let boxShadow = `0px ${shadowY}px ${shadowBlur}px rgba(0,0,0,${shadowOpacity})`;

  return (
    <motion.div 
      className={`stacked-card-wrapper ${isFront ? 'is-front' : ''}`}
      initial={false}
      animate={{ x, y, z, scale, rotateY, boxShadow, opacity }}
      transition={{ type: "spring", stiffness: 140, damping: 22 }}
      style={{ zIndex, pointerEvents: isFront ? 'auto' : 'none', borderRadius: '18px' }}
      onClick={() => {
        if (isFront) {
          setSelectedImage(item);
        }
      }}
    >
      <div className="stacked-card-content">
        <img src={item.img} alt={item.title} draggable="false" />
        <div className="portfolio-watermark" style={{ opacity: 0.5 }}></div>
        {item.isPdf && (
          <div className="pdf-badge" style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.9)', fontSize: '10px', fontWeight: 600, padding: '4px 10px', borderRadius: '20px', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', letterSpacing: '0.5px' }}>PDF</div>
        )}
      </div>
    </motion.div>
  );
};

export default function Gallery() {
  const { setActiveSection } = useScrollContext();
  const [activeCat, setActiveCat] = useState('all');
  const [hoveredImage, setHoveredImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isHoveringStack, setIsHoveringStack] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const lastScrollTime = React.useRef(0);

  const handleStackNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % PORTFOLIO_DATA.length);
  }, []);

  const handleStackPrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + PORTFOLIO_DATA.length) % PORTFOLIO_DATA.length);
  }, []);

  useEffect(() => {
    if (isHoveringStack) return;
    const timer = setInterval(() => {
      handleStackNext();
    }, 4000);
    return () => clearInterval(timer);
  }, [currentIndex, handleStackNext, isHoveringStack]);

  const handlePanEnd = (e, info) => {
    if (info.offset.x < -40) handleStackNext();
    else if (info.offset.x > 40) handleStackPrev();
  };

  const handleWheel = (e) => {
    const now = Date.now();
    if (now - lastScrollTime.current < 400) return; // Debounce strict 1-card jumps
    
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 20) {
        handleStackNext();
        lastScrollTime.current = now;
      } else if (e.deltaX < -20) {
        handleStackPrev();
        lastScrollTime.current = now;
      }
    } else {
      if (e.deltaY > 20) {
        handleStackNext();
        lastScrollTime.current = now;
      } else if (e.deltaY < -20) {
        handleStackPrev();
        lastScrollTime.current = now;
      }
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedImage(null);
      if (!selectedImage) {
        if (e.key === 'ArrowRight') handleStackNext();
        if (e.key === 'ArrowLeft') handleStackPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, handleStackNext, handleStackPrev]);

  const handleNext = (e) => {
    e.stopPropagation();
    const currentIndex = PORTFOLIO_DATA.findIndex(i => i.id === selectedImage.id);
    setSelectedImage(PORTFOLIO_DATA[(currentIndex + 1) % PORTFOLIO_DATA.length]);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    const currentIndex = PORTFOLIO_DATA.findIndex(i => i.id === selectedImage.id);
    setSelectedImage(PORTFOLIO_DATA[(currentIndex - 1 + PORTFOLIO_DATA.length) % PORTFOLIO_DATA.length]);
  };

  const filteredData = activeCat === 'all'  
    ? PORTFOLIO_DATA 
    : PORTFOLIO_DATA.filter(item => item.cat === activeCat);

  return (
    <motion.section 
      id="graphic-design-portfolio" 
      className="section gallery-section-v2"
      onViewportEnter={() => setActiveSection('projects')}
      viewport={{ amount: 0.1 }}
    >
      {/* Background Effects */}
      <div className="gallery-bg-effects">
        <div className="gallery-ambient-glow"></div>
      </div>

      <div className="gallery-v2-container">
        {/* LEFT COLUMN */}
        <div className="gallery-left-content">
          <motion.div 
            className="eyebrow-glowing"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="glow-dot"></div>
            MY CREATIVE WORK
          </motion.div>

          <motion.h1 
            className="gallery-title-main"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          >
            <span className="text-light">GRAPHIC</span>
            <span className="text-light">DESIGN</span>
            <span className="text-gradient">PORTFOLIO</span>
          </motion.h1>

          <motion.p 
            className="gallery-description"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            A collection of branding, social media creatives, advertisements, posters, brochures, presentations, UI designs, visual identities and marketing creatives crafted with creativity, precision and modern aesthetics.
          </motion.p>

          <motion.button 
            className="gallery-btn-explore"
            onClick={() => setSelectedImage(PORTFOLIO_DATA[0])}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            Explore Work
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </motion.button>

          <motion.div 
            className="gallery-stats-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="gallery-stat-item">
              <div className="gallery-stat-value">50+</div>
              <div className="stat-divider"></div>
              <div className="gallery-stat-label">Projects Completed</div>
            </div>
            <div className="gallery-stat-item">
              <div className="gallery-stat-value">100%</div>
              <div className="stat-divider"></div>
              <div className="gallery-stat-label">Client Satisfaction</div>
            </div>
            <div className="gallery-stat-item">
              <div className="gallery-stat-value">4+</div>
              <div className="stat-divider"></div>
              <div className="gallery-stat-label">Years Experience</div>
            </div>
          </motion.div>

          <motion.div 
            className="gallery-internship-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <div className="internship-content">
              <span className="internship-tag">Graphic Design Internship</span>
              <p className="internship-desc">
                Gained practical experience in branding, marketing materials, and professional design workflows.
              </p>
            </div>
            <button 
              id="view-offer-letter-btn"
              className="internship-btn"
              onClick={() => setSelectedImage({ id: 'offer-letter', img: '/offer-letter-uploaded-new.png', isOfferLetter: true, title: 'Offer Letter' })}
              style={{ position: 'relative', zIndex: 9999, pointerEvents: 'auto' }}
            >
              View Offer Letter
            </button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div 
          className="gallery-right-stacked"
          onMouseEnter={() => setIsHoveringStack(true)}
          onMouseLeave={() => setIsHoveringStack(false)}
        >
          
          <motion.div 
            className="stacked-scene"
            onPanEnd={handlePanEnd}
            onWheel={handleWheel}
            style={{ cursor: 'grab' }}
            whileTap={{ cursor: 'grabbing' }}
          >
            {PORTFOLIO_DATA.map((item, index) => (
              <StackedCard 
                key={`stacked-${item.id}`}
                item={item}
                index={index}
                total={PORTFOLIO_DATA.length}
                currentIndex={currentIndex}
                setSelectedImage={setSelectedImage}
                windowWidth={windowWidth}
              />
            ))}
          </motion.div>

          <div className="gallery-right-bottom-ui">
            <div className="gallery-stack-controls">
              <button className="gallery-arrow left" onClick={handleStackPrev}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
              <button className="gallery-arrow right" onClick={handleStackNext}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Portfolio Projects */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            className="premium-project-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedImage(null)}
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
                width: selectedImage.isOfferLetter ? 'auto' : '100%',
                maxWidth: selectedImage.isPdf ? '900px' : (selectedImage.isOfferLetter ? '95vw' : '550px'),
                height: selectedImage.isPdf ? '95vh' : (selectedImage.isOfferLetter ? '95vh' : 'auto'),
                maxHeight: '95vh',
                overflowY: selectedImage.isOfferLetter ? 'hidden' : 'auto',
                overflowX: selectedImage.isOfferLetter ? 'hidden' : 'auto',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              {/* Navigation Arrows */}
              {!selectedImage.isOfferLetter && (
                <>
                  <button 
                    onClick={handlePrev}
                    style={{ position: 'fixed', left: '2rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', transition: 'all 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
                  >&#8592;</button>
                  
                  <button 
                    onClick={handleNext}
                    style={{ position: 'fixed', right: '2rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', transition: 'all 0.3s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.transform = 'translateY(-50%) scale(1)'; }}
                  >&#8594;</button>
                </>
              )}

              <button 
                onClick={() => setSelectedImage(null)}
                style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', transition: 'background 0.3s' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(0,0,0,0.6)'}
              >&times;</button>
              
              {/* Image Section */}
              <div style={{ 
                width: selectedImage.isOfferLetter ? 'auto' : '100%', 
                aspectRatio: selectedImage.isPdf || selectedImage.isOfferLetter ? 'auto' : (windowWidth <= 1100 ? 'auto' : '1 / 1'),
                height: selectedImage.isPdf || selectedImage.isOfferLetter ? '100%' : 'auto',
                flex: selectedImage.isPdf || selectedImage.isOfferLetter ? 1 : 'none',
                position: 'relative', 
                borderRadius: selectedImage.isOfferLetter ? '0' : '16px', 
                overflow: 'hidden', 
                border: selectedImage.isOfferLetter ? 'none' : '1px solid rgba(255,255,255,0.4)', 
                boxShadow: selectedImage.isOfferLetter ? 'none' : '0 0 30px rgba(255,255,255,0.2)',
                background: selectedImage.isOfferLetter ? 'transparent' : 'rgba(0,0,0,0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: selectedImage.isPdf || selectedImage.isOfferLetter ? '0' : (windowWidth <= 1100 ? '60px' : '20px')
              }}>
                {selectedImage.isPdf ? (
                  <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <PdfViewer file={selectedImage.pdfUrl} />
                  </div>
                ) : (
                  <>
                    <img src={selectedImage.img} alt={selectedImage.title} style={{ width: selectedImage.isOfferLetter ? 'auto' : '100%', height: (windowWidth <= 1100 && !selectedImage.isOfferLetter) ? 'auto' : '100%', objectFit: 'contain', display: 'block' }} draggable="false" />
                    {!selectedImage.isOfferLetter && <div className="portfolio-watermark"></div>}
                  </>
                )}
                
                {/* Created Using Badge */}
                {!selectedImage.isPdf && !selectedImage.isOfferLetter && (
                  <div style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    letterSpacing: '0.05em',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                  }}>
                    {selectedImage.software}
                  </div>
                )}
              </div>
              
              {/* Details Box */}
              {!selectedImage.isPdf && !selectedImage.isOfferLetter && (
                <div style={{ 
                  background: 'rgba(255,255,255,0.08)', 
                  backdropFilter: 'blur(20px)', 
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.15)', 
                  borderRadius: '16px',
                  padding: '24px', 
                  color: '#fff', 
                  textAlign: 'left',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.15)'
                }}>
                  <h2 style={{ color: '#fff', fontSize: '26px', fontWeight: '800', margin: '0 0 16px 0', letterSpacing: '0.02em' }}>{selectedImage.title}</h2>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                    <div>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Category</p>
                      <p style={{ color: '#fff', fontSize: '15px', fontWeight: '500', margin: 0 }}>{CATEGORIES.find(c => c.id === selectedImage.cat)?.label}</p>
                    </div>
                    <div>
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Project Type</p>
                      <p style={{ color: '#fff', fontSize: '15px', fontWeight: '500', margin: 0 }}>{selectedImage.cat === 'social' ? 'Social Media Design' : selectedImage.cat === 'posters' ? 'Marketing Material' : selectedImage.cat === 'corporate' ? 'Corporate Design' : 'Branding'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>Description</p>
                    <p style={{ color: 'rgba(255,255,255,0.95)', fontSize: '15px', lineHeight: '1.6', margin: 0 }}>
                      {selectedImage.description || `Professional ${CATEGORIES.find(c => c.id === selectedImage.cat)?.label.toLowerCase()} created using ${selectedImage.software}. This project involved conceptualizing and designing premium visual assets to align with brand guidelines and marketing objectives.`}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.section>
  );
}
