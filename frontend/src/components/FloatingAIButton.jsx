import React, { useState, useEffect } from 'react';
import { FaMagic } from 'react-icons/fa';
import './FloatingAIButton.css';

export default function FloatingAIButton({ onClick, isAIOpen }) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Collapse the button automatically when the AI Assistant modal is closed
  useEffect(() => {
    if (!isAIOpen) {
      setIsExpanded(false);
    }
  }, [isAIOpen]);

  const handleClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
      // Wait for the expansion animation to complete before opening the modal
      setTimeout(() => {
        onClick();
      }, 350); 
    } else {
      onClick();
    }
  };

  return (
    <div className="floating-ai-container">
      <button 
        className={`floating-ai-btn ${isExpanded ? 'expanded' : ''}`} 
        onClick={handleClick}
        aria-label="Say Hello to AI Assistant"
      >
        <div className="floating-ai-border"></div>
        <div className="floating-ai-content">
          <FaMagic className="floating-ai-icon" />
          <span className="floating-ai-text">Say Hello</span>
        </div>
      </button>
    </div>
  );
}
