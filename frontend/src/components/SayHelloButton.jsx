import React from 'react';
import { FaCommentDots } from 'react-icons/fa';
import { smoothScrollTo } from '../utils/smoothScroll';
import './SayHelloButton.css';

export default function SayHelloButton() {
  const handleClick = (e) => {
    e.preventDefault();
    smoothScrollTo('contact');
  };

  return (
    <div className="say-hello-container">
      <div className="say-hello-tooltip">Say Hello</div>
      <button 
        onClick={handleClick}
        className="say-hello-button"
        aria-label="Say Hello"
      >
        <FaCommentDots className="say-hello-icon" />
      </button>
    </div>
  );
}
