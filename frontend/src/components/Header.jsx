import { useState, useEffect } from 'react';
import AIAssistant from './AIAssistant';
import { smoothScrollTo, scrollToTargetWhenReady } from '../utils/smoothScroll';
import { FaCommentDots } from 'react-icons/fa';

export default function Header({ activeView, setActiveView }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (activeView !== 'home') return;
      const scrollYOffset = window.scrollY + 100;
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(sec => {
        if (scrollYOffset >= sec.offsetTop && scrollYOffset < sec.offsetTop + sec.offsetHeight) {
          setActiveSection(sec.id);
        }
      });
    };
    
    // Initial check
    onScroll();
    
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeView]);

  const scrollTo = (id) => {
    if (id === 'home' || id === 'about' || id === 'contact') {
      if (activeView !== 'home') {
        setActiveView('home');
        window.scrollTo(0, 0);
        const targetId = id === 'home' ? 'hero' : id;
        scrollToTargetWhenReady(targetId);
      } else {
        const targetId = id === 'home' ? 'hero' : id;
        smoothScrollTo(targetId);
      }
    } else {
      if (activeView !== id) {
        setActiveView(id);
        window.scrollTo(0, 0);
      }
    }
    setMenuOpen(false);
  };

  const navItems = ['about', 'skills', 'education', 'projects'];

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <nav className="nav container">
        <button className="nav-logo-group" onClick={() => scrollTo('home')}>
          <span className="nav-logo-sn">SN</span>
          <span className="nav-logo-name">SHIVANSH NARAIN</span>
        </button>

        <ul className={`nav-links${menuOpen ? ' open' : ''}`}>
          {navItems.map(item => {
            const isHomeSection = ['hero', 'explore', 'contact'].includes(activeSection);
            const isActive = (activeView === 'home' && item === 'home' && isHomeSection) || 
                             (activeView === 'home' && item === 'about' && activeSection === 'about') || 
                             (activeView !== 'home' && item === activeView);
            return (
              <li key={item}>
                <button
                  className={`nav-link${isActive ? ' active' : ''}`}
                  onClick={() => scrollTo(item)}
                >
                  {item.toUpperCase()}
                </button>
              </li>
            );
          })}
        </ul>

        <div className="nav-social-and-cta">
          <div className="nav-social">
            <a href="https://github.com/shivnshnarain" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/shivansh-narain" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://www.instagram.com/shivansh_narain" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="mailto:shivanshnarain@gmail.com" aria-label="Email" className="social-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>
            </a>
          </div>
          <button className="nav-cta" onClick={() => setIsAIOpen(true)}>
            <div className="nav-cta-border"></div>
            <span className="nav-cta-text">Say Hello</span>
          </button>
        </div>

        <button
          className="nav-toggle"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen(p => !p)}
        >
          <span style={{ transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : '' }} />
          <span style={{ opacity: menuOpen ? 0 : 1 }} />
          <span style={{ transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : '' }} />
        </button>
      </nav>

      <button 
        className="mobile-floating-ai-btn"
        onClick={() => setIsAIOpen(true)}
        aria-label="Say Hello"
      >
        <div className="mobile-floating-ai-tooltip">Say Hello</div>
        <FaCommentDots size={24} />
      </button>

      <AIAssistant 
        isOpen={isAIOpen} 
        onClose={() => setIsAIOpen(false)} 
        onComplete={() => {
          scrollTo('contact');
          setTimeout(() => {
            document.getElementById('cv2-name')?.focus();
          }, 1000);
        }} 
      />
    </header>
  );
}
