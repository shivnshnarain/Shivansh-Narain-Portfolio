"use client";
import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useScrollContext } from '../context/ScrollContext';
import DesignerDashboard from './DesignerDashboard';
import DeveloperDashboard from './DeveloperDashboard';
import { smoothScrollTo } from '../utils/smoothScroll';
import './HeroDashboards.css';

export default function Hero({ setActiveView }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMode, setMobileMode] = useState('designer');
  const heroRef = useRef(null);
  const { setActiveSection, isLoaded } = useScrollContext();

  // Parallax Setup
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, 150]);
  const textY = useTransform(scrollY, [0, 800], [0, 50]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMove = (clientX) => {
    if (!isDragging || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const onMouseMove = (e) => handleMove(e.clientX);
  const onTouchMove = (e) => handleMove(e.touches[0].clientX);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', () => setIsDragging(false));
      window.addEventListener('touchmove', onTouchMove, { passive: false });
      window.addEventListener('touchend', () => setIsDragging(false));
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', () => setIsDragging(false));
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
    };
  }, [isDragging]);

  const scrollTo = (id) => {
    smoothScrollTo(id);
  };

  const navigateToProjectSection = (targetId) => {
    if (setActiveView) {
      setActiveView('projects');
      let attempts = 0;
      const interval = setInterval(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          clearInterval(interval);
        }
        attempts++;
        if (attempts > 20) clearInterval(interval);
      }, 100);
    } else {
      document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const designerOpacity = isMobile 
    ? (mobileMode === 'designer' ? 1 : 0) 
    : (sliderPosition < 20 ? 0 : sliderPosition < 40 ? (sliderPosition - 20) / 20 : 1);
    
  const developerOpacity = isMobile 
    ? (mobileMode === 'developer' ? 1 : 0) 
    : (sliderPosition > 80 ? 0 : sliderPosition > 60 ? (80 - sliderPosition) / 20 : 1);

  const designerClip = isMobile 
    ? (mobileMode === 'designer' ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(0 0, 0 0, 0 100%, 0 100%)')
    : `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`;

  const developerClip = isMobile
    ? (mobileMode === 'developer' ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' : 'polygon(100% 0, 100% 0, 100% 100%, 100% 100%)')
    : `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`;

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const textToLetters = (text) => text.split('').map((char, index) => (
    <motion.span key={index} variants={letterVariants} style={{ display: 'inline-block' }}>
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  ));

  return (
    <motion.section 
      id="hero" 
      className="hero-split-section"
      ref={heroRef}
      onViewportEnter={() => setActiveSection('hero')}
      viewport={{ amount: 0.2 }}
    >
      {/* BACKGROUND LAYERS with Parallax & Intro Fade */}
      <motion.div 
        className="hero-bg developer-bg"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1, clipPath: developerClip }}
        transition={{ 
          opacity: { duration: 1.5, ease: "easeOut" },
          scale: { duration: 1.5, ease: "easeOut" },
          clipPath: { type: "tween", ease: "linear", duration: isMobile ? 0.3 : 0 }
        }}
        style={{ y: bgY }}
      ></motion.div>
      <motion.div 
        className="hero-bg designer-bg"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1, clipPath: designerClip }}
        transition={{ 
          opacity: { duration: 1.5, ease: "easeOut" },
          scale: { duration: 1.5, ease: "easeOut" },
          clipPath: { type: "tween", ease: "linear", duration: isMobile ? 0.3 : 0 }
        }}
        style={{ y: bgY }}
      ></motion.div>

      {/* OVERLAY */}
      <motion.div 
        className="hero-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      ></motion.div>

      {/* FULL SCREEN DASHBOARDS */}
      <DesignerDashboard sliderPosition={sliderPosition} isMobile={isMobile} designerOpacity={designerOpacity} />
      <DeveloperDashboard sliderPosition={sliderPosition} isMobile={isMobile} developerOpacity={developerOpacity} />

      {isMobile && (
        <motion.div 
          className="mobile-toggle-wrapper"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="mobile-toggle">
            <button 
              className={`toggle-btn ${mobileMode === 'designer' ? 'active' : ''}`}
              onClick={() => setMobileMode('designer')}
            >
              Designer
            </button>
            <button 
              className={`toggle-btn ${mobileMode === 'developer' ? 'active' : ''}`}
              onClick={() => setMobileMode('developer')}
            >
              Developer
            </button>
          </div>
        </motion.div>
      )}
      
      {/* LEFT SIDE — DESIGNER CONTENT */}
      <motion.div 
        className="hero-half hero-left-side"
        animate={{ 
          opacity: designerOpacity, 
          x: (1 - designerOpacity) * -20 
        }}
        style={{ 
          pointerEvents: designerOpacity > 0.5 ? 'auto' : 'none',
          display: isMobile ? (mobileMode === 'designer' ? 'flex' : 'none') : 'flex',
          y: textY
        }}
        transition={{ type: "tween", ease: "easeInOut", duration: isMobile ? 0.3 : 0 }}
      >
        <motion.div 
          className="hero-content left-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.p variants={itemVariants} className="hero-eyebrow eyebrow-left">I'M A CREATIVE</motion.p>
          <motion.h1 className="hero-title title-gradient" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
            {textToLetters("Designer")}
          </motion.h1>
          <motion.p variants={itemVariants} className="hero-desc desc-left">
            Graphic Designer passionate about creating visually appealing designs,
            branding, social media creatives, posters, and user-centered experiences.
          </motion.p>
          <motion.div variants={itemVariants} className="hero-actions">
            <button className="btn btn-gradient-fill hover-lift" onClick={() => navigateToProjectSection('graphic-design-portfolio')}>
              View My Works <span className="arrow">→</span>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* RIGHT SIDE — DEVELOPER CONTENT */}
      <motion.div 
        className="hero-half hero-right-side"
        animate={{ 
          opacity: developerOpacity, 
          x: (1 - developerOpacity) * 20 
        }}
        style={{ 
          pointerEvents: developerOpacity > 0.5 ? 'auto' : 'none',
          display: isMobile ? (mobileMode === 'developer' ? 'flex' : 'none') : 'flex',
          y: textY
        }}
        transition={{ type: "tween", ease: "easeInOut", duration: isMobile ? 0.3 : 0 }}
      >
        <motion.div 
          className="hero-content right-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.p variants={itemVariants} className="hero-eyebrow eyebrow-right">I'M A FULL STACK</motion.p>
          <motion.h1 className="hero-title title-solid" variants={{ visible: { transition: { staggerChildren: 0.05 } } }}>
            {textToLetters("Developer")}
          </motion.h1>
          <motion.p variants={itemVariants} className="hero-desc desc-right">
            Full Stack Developer who builds modern, scalable, and secure web
            applications with clean code and efficient solutions.
          </motion.p>
          <motion.div variants={itemVariants} className="hero-actions">
            <button className="btn btn-solid-dark hover-lift" onClick={() => navigateToProjectSection('website-showcase')}>
              View Projects <span className="arrow">→</span>
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* SLIDER HANDLE & LINE */}
      {!isMobile && (
        <motion.div 
          className="slider-divider"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1, left: `${sliderPosition}%` }}
          transition={{ 
            opacity: { delay: 1, duration: 1 },
            scaleY: { delay: 1, duration: 1, ease: "easeOut" },
            left: { type: "tween", ease: "linear", duration: 0 }
          }}
        >
          <div className="slider-line"></div>
          <div 
            className="slider-handle hover-lift"
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{marginRight: '2px'}}>
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft: '2px'}}>
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
            
            <div className={`slider-tooltip ${isDragging ? 'hidden' : ''}`}>
              Drag Left or Right
            </div>
          </div>
        </motion.div>
      )}

      {/* SCROLL DOWN INDICATOR */}
      <motion.div 
        className="scroll-indicator"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <div className="mouse-icon">
          <div className="wheel"></div>
        </div>
        <span className="scroll-text">Scroll Down</span>
      </motion.div>
    </motion.section>
  );
}
