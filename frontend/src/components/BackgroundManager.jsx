import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollContext } from '../context/ScrollContext';

const backgrounds = {
  hero: { color: '#ffffff' },
  about: { color: '#fafafa' },
  skills: { color: '#ffffff' }, 
  education: { color: '#ffffff' }, 
  projects: { color: '#f8fafc' },


  contact: { color: '#ffffff' },
};

export default function BackgroundManager() {
  const { activeSection } = useScrollContext();
  
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -99, pointerEvents: 'none' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            inset: 0,
            background: backgrounds[activeSection]?.color || '#ffffff',
            willChange: 'opacity'
          }}
        />
      </AnimatePresence>
    </div>
  );
}
