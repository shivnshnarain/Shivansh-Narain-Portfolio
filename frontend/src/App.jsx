import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Gallery from './components/Gallery';
import ProjectShowcase from './components/ProjectShowcase';


import Contact from './components/Contact';
import Footer from './components/Footer';
import ExploreJourney from './components/ExploreJourney';
import PaymentPage from './components/PaymentPage';
import ThankYou from './components/ThankYou';
import WhatsAppButton from './components/WhatsAppButton';
import { ScrollProvider } from './context/ScrollContext';
import BackgroundManager from './components/BackgroundManager';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function App() {
  const [activeView, setActiveView] = useState(() => {
    if (window.location.pathname === '/thank-you') {
      return 'thank-you';
    }
    return 'home';
  });

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.4, ease: "easeIn" } }
  };

  return (
    <ScrollProvider>
      <BackgroundManager />
      <Header activeView={activeView} setActiveView={setActiveView} />
      
      {activeView !== 'home' && activeView !== 'education' && activeView !== 'skills' && activeView !== 'projects' && activeView !== 'payment' && activeView !== 'thank-you' && (
        <div className="back-nav-container">
          <button className="btn-back" onClick={() => setActiveView('home')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            Back to Journey
          </button>
        </div>
      )}

      <main>
        <AnimatePresence mode="wait">
          {activeView === 'home' && (
            <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit">
              <Hero setActiveView={setActiveView} />
              <About setActiveView={setActiveView} />
              <ExploreJourney setActiveView={setActiveView} />

              <Contact setActiveView={setActiveView} />
            </motion.div>
          )}
          
          {activeView === 'skills' && (
            <motion.div key="skills" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ minHeight: '100vh' }}>
              <Skills setActiveView={setActiveView} />
            </motion.div>
          )}

          {activeView === 'education' && (
            <motion.div key="education" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ minHeight: '100vh' }}>
              <Education setActiveView={setActiveView} />
            </motion.div>
          )}

          {activeView === 'projects' && (
            <motion.div key="projects" id="projects" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <ProjectShowcase setActiveView={setActiveView} />
              <Gallery />
            </motion.div>
          )}

          {activeView === 'payment' && (
            <motion.div key="payment" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <PaymentPage setActiveView={setActiveView} />
            </motion.div>
          )}

          {activeView === 'thank-you' && (
            <motion.div key="thank-you" variants={pageVariants} initial="initial" animate="animate" exit="exit" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
              <ThankYou setActiveView={setActiveView} />
            </motion.div>
          )}


        </AnimatePresence>
      </main>
      <Footer activeView={activeView} setActiveView={setActiveView} />
      <WhatsAppButton />
    </ScrollProvider>
  );
}
