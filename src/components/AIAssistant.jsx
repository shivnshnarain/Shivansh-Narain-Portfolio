import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AIAssistant.css';

const fullText = `Hi there! 👋

Welcome to my portfolio.

I'm Shivansh Narain.

It's wonderful to have you here.

Feel free to explore my work, and if you'd like to discuss a project, collaborate, or just say hello, I'd love to hear from you.

Simply fill out the contact form below, and I'll personally get back to you as soon as possible.

Hope you enjoy your visit, and have a fantastic day!`;

const speechText = `Hi there! Welcome to my portfolio. I'm Shivansh Narain. It's wonderful to have you here. Feel free to explore my work, and if you'd like to discuss a project, collaborate, or just say hello, I'd love to hear from you. Simply fill out the contact form below, and I'll personally get back to you as soon as possible. Hope you enjoy your visit, and have a fantastic day!`;

export default function AIAssistant({ isOpen, onClose, onComplete }) {
  const [displayedText, setDisplayedText] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const utteranceRef = useRef(null);
  const intervalRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setDisplayedText('');
      setIsMinimized(false);
      
      let speechTimeout;
      
      window.speechSynthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.rate = 1.02;
      utterance.pitch = 0.96;
      utterance.volume = 1.0;
      
      utterance.onend = () => {
        if (onComplete) onComplete();
        scrollTimeoutRef.current = setTimeout(() => {
          onClose();
        }, 3000);
      };
      
      const playSpeechAndType = () => {
        // Try to select a natural English male voice
        const voices = window.speechSynthesis.getVoices();
        const preferredNames = [
          'Microsoft Guy Online',
          'Microsoft Ryan Online',
          'Microsoft Andrew Online',
          'Google US English Male',
          'Google UK English Male',
          'Daniel',
          'Alex',
          'David'
        ];
        
        let engVoice = voices.find(v => preferredNames.some(name => v.name.includes(name)));
        
        if (!engVoice) {
          engVoice = voices.find(v => 
            (v.lang.includes('en-US') || v.lang.includes('en-GB')) && 
            (v.name.includes('Male') || v.name.includes('Neural') || v.name.includes('Natural'))
          );
        }
        if (!engVoice) {
          engVoice = voices.find(v => (v.lang.includes('en-US') || v.lang.includes('en-GB')) && !v.name.includes('Female'));
        }
        if (!engVoice) {
          engVoice = voices.find(v => v.lang.includes('en-US') || v.lang.includes('en-GB'));
        }
        if (engVoice) {
          utterance.voice = engVoice;
        }
        
        window.speechSynthesis.speak(utterance);
        utteranceRef.current = utterance;
        
        // Start typing animation in sync with speech
        let i = 0;
        intervalRef.current = setInterval(() => {
          setDisplayedText(fullText.substring(0, i));
          i++;
          if (i > fullText.length) {
            clearInterval(intervalRef.current);
          }
        }, 40); // Typing speed matched to 1.02 rate
      };

      // Start speaking and typing after a 500ms delay
      speechTimeout = setTimeout(() => {
        if (window.speechSynthesis.getVoices().length === 0) {
          window.speechSynthesis.onvoiceschanged = () => {
            playSpeechAndType();
            window.speechSynthesis.onvoiceschanged = null;
          };
        } else {
          playSpeechAndType();
        }
      }, 500);

      return () => {
        if (speechTimeout) clearTimeout(speechTimeout);
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        window.speechSynthesis.cancel();
      };
    } else {
        window.speechSynthesis.cancel();
        if (intervalRef.current) clearInterval(intervalRef.current);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    }
  }, [isOpen]);

  const handleClose = () => {
    window.speechSynthesis.cancel();
    onClose();
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="ai-assistant-popup"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        >
          <div className="ai-header">
            <div className="ai-avatar-group">
              <div className="ai-avatar">SN</div>
              <div className="ai-title-wrap">
                <span className="ai-title">AI Assistant</span>
                <span className="ai-status">
                  <span className="ai-dot"></span> {isMinimized ? 'paused' : 'speaking...'}
                </span>
              </div>
            </div>
            <div className="ai-controls">
              <button onClick={toggleMinimize} className="ai-ctrl-btn">
                {isMinimized ? '+' : '−'}
              </button>
              <button onClick={handleClose} className="ai-ctrl-btn">×</button>
            </div>
          </div>
          
          <AnimatePresence>
            {!isMinimized && (
              <motion.div
                className="ai-body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
              >
                <div className="ai-message">
                  {displayedText}
                  <span className="ai-cursor"></span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
