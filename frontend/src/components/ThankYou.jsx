import React from 'react';
import { motion } from 'framer-motion';

export default function ThankYou({ setActiveView }) {
  return (
    <motion.div 
      className="thank-you-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center'
      }}
    >
      <div className="contact-bg-glow" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', opacity: 0.5 }}></div>
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '1.5rem' }}>
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      </motion.div>
      <h1 style={{ fontSize: '3rem', color: '#fff', marginBottom: '1rem', fontFamily: 'var(--font-primary, sans-serif)' }}>Thank You!</h1>
      <p style={{ fontSize: '1.2rem', color: '#a0a0a0', maxWidth: '600px', marginBottom: '2rem', lineHeight: '1.6' }}>
        Your message has been successfully sent. I will get back to you as soon as possible.
      </p>
      
      <button 
        className="nav-cta" 
        onClick={() => {
          // Instead of just relying on state, since we may have landed here via a fresh page load (redirected by FormSubmit)
          // We can use history API to go back to root or just push state and let App.jsx render 'home'.
          window.history.pushState({}, '', '/');
          setActiveView('home');
          window.scrollTo(0, 0);
        }}
        style={{ padding: '16px 32px', display: 'flex', justifyContent: 'center', border: 'none', background: 'transparent', cursor: 'pointer' }}
      >
        <div className="nav-cta-border"></div>
        <span className="nav-cta-text" style={{ fontSize: '1.1rem' }}>Return Home</span>
      </button>
    </motion.div>
  );
}
