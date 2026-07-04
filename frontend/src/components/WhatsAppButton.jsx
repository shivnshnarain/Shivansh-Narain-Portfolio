import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import './WhatsAppButton.css';

export default function WhatsAppButton() {
  const phoneNumber = '919569983385';
  const message = `Hi Shivansh 👋\n\nI visited your portfolio and I'm interested in discussing a project with you.\n\nCan we connect?`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className="whatsapp-button-container">
      <div className="whatsapp-tooltip">Chat with me on WhatsApp</div>
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-button"
        aria-label="Chat with Shivansh on WhatsApp"
      >
        <FaWhatsapp className="whatsapp-icon" />
      </a>
    </div>
  );
}
