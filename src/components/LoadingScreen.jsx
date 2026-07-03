import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollContext } from '../context/ScrollContext';

export default function LoadingScreen() {
  const { isLoaded, setIsLoaded } = useScrollContext();
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    // Reveal profile image after 1.8 seconds
    const profileTimer = setTimeout(() => setShowProfile(true), 1800);
    // Total loading sequence duration: 3.5s
    const endTimer = setTimeout(() => setIsLoaded(true), 3500);

    return () => {
      clearTimeout(profileTimer);
      clearTimeout(endTimer);
    };
  }, [setIsLoaded]);

  const letterVariantsLeft = {
    hidden: { opacity: 0, filter: "blur(8px)", x: -20 },
    visible: { opacity: 1, filter: "blur(0px)", x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const letterVariantsRight = {
    hidden: { opacity: 0, filter: "blur(8px)", x: 20 },
    visible: { opacity: 1, filter: "blur(0px)", x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  const textToLetters = (text, side) => text.split('').map((char, index) => (
    <motion.span 
      key={index} 
      variants={side === 'left' ? letterVariantsLeft : letterVariantsRight} 
      style={{ display: 'inline-block' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  ));

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          className="loading-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#ffffff',
            zIndex: 9999,
            display: 'flex',
            overflow: 'hidden'
          }}
        >
          {/* Center Divider */}
          <motion.div
            initial={{ height: 0, opacity: 0, boxShadow: "0 0 0px rgba(0,0,0,0)" }}
            animate={{ 
              height: "100%", 
              opacity: 1,
              boxShadow: "0 0 20px rgba(0,0,0,0.15)"
            }}
            transition={{ 
              height: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
              opacity: { duration: 0.5, delay: 0.2 },
              boxShadow: { duration: 1, ease: "easeOut", delay: 1.6 }
            }}
            style={{
              position: 'absolute',
              left: '50%',
              top: '0',
              bottom: '0',
              width: '1px',
              background: 'rgba(0,0,0,0.15)',
              transform: 'translateX(-50%)',
              zIndex: 10
            }}
          />

          {/* Left Side: Designer */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingRight: '4%' }}>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.8 } } }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 6vw, 80px)',
                fontWeight: 800,
                color: 'var(--black)',
                letterSpacing: '-0.04em',
                margin: 0,
                textAlign: 'right'
              }}
            >
              {textToLetters("Designer", "left")}
            </motion.h1>
          </div>

          {/* Right Side: Developer */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: '4%' }}>
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.08, delayChildren: 0.8 } } }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 6vw, 80px)',
                fontWeight: 800,
                color: 'var(--black)',
                letterSpacing: '-0.04em',
                margin: 0,
                textAlign: 'left'
              }}
            >
              {textToLetters("Developer", "right")}
            </motion.h1>
          </div>

          {/* Center Profile Image Reveal */}
          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(10px)" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  height: '95vh',
                  width: '100%',
                  maxWidth: '1400px',
                  display: 'flex',
                  justifyContent: 'center',
                  zIndex: 5,
                  pointerEvents: 'none',
                  mixBlendMode: 'multiply'
                }}
              >
                <img src="/hero_designer.png" alt="" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', height: '100%', width: 'auto', objectFit: 'contain' }} />
                <img src="/hero_developer.png" alt="" style={{ position: 'absolute', bottom: 0, left: '50%', transform: 'translateX(-50%)', height: '100%', width: 'auto', objectFit: 'contain' }} />
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
