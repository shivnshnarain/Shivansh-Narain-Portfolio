import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useScrollContext } from '../context/ScrollContext';

// SVG Icons (Heroicons style)
const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12 19.79 19.79 0 0 1 1 3.18 2 2 0 0 1 2.96 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 5.95 5.95l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
  </svg>
);

const MailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M2 7l10 7 10-7"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFFFFF" stroke="none">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A66C2" stroke="none">
    <path d="M22.23 0H1.77C.8 0 0 .77 0 1.72v20.56C0 23.23.8 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0zM7.12 20.45H3.56V9h3.56v11.45zM5.34 7.43c-1.14 0-2.06-.92-2.06-2.06 0-1.14.92-2.06 2.06-2.06 1.14 0 2.06.92 2.06 2.06 0 1.14-.92 2.06-2.06 2.06zm15.11 13.02h-3.56v-5.56c0-1.33-.03-3.03-1.85-3.03-1.85 0-2.13 1.45-2.13 2.94v5.65H9.36V9h3.41v1.56h.05c.48-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="url(#ig-grad)" stroke="none">
    <defs>
      <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f09433" />
        <stop offset="25%" stopColor="#e6683c" />
        <stop offset="50%" stopColor="#dc2743" />
        <stop offset="75%" stopColor="#cc2366" />
        <stop offset="100%" stopColor="#bc1888" />
      </linearGradient>
    </defs>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm3.98-10.822a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EA4335" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2"/>
    <path d="M2 7l10 7 10-7"/>
  </svg>
);

export default function Contact({ setActiveView }) {
  const { setActiveSection } = useScrollContext();
  const [nextUrl, setNextUrl] = useState('');

  useEffect(() => {
    setNextUrl(window.location.origin + '/thank-you');
  }, []);

  const contactInfo = [
    { Icon: PhoneIcon, label: 'Phone', value: '+91 95699 83385', href: 'tel:+919569983385' },
    { Icon: MailIcon,  label: 'Email', value: 'shivanshnarain@gmail.com', href: 'mailto:shivanshnarain@gmail.com' },
  ];

  const socialLinks = [
    { label: 'GitHub',    href: 'https://github.com/shivnshnarain',                   Icon: GitHubIcon },
    { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/shivansh-narain',         Icon: LinkedInIcon },
    { label: 'Instagram', href: 'https://www.instagram.com/shivansh_narain',           Icon: InstagramIcon },
    { label: 'Email',     href: 'mailto:shivanshnarain@gmail.com',                     Icon: EmailIcon },
  ];

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 0) => ({
      opacity: 1, y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <motion.section
      id="contact"
      className="contact-section-v2"
      onViewportEnter={() => setActiveSection('contact')}
      viewport={{ amount: 0.15 }}
    >
      <div className="contact-bg-image" />
      <div className="contact-bg-overlay" />
      <div className="contact-bg-glow" />

      <div className="contact-v2-inner">
        {/* ── LEFT COLUMN ── */}
        <div className="contact-v2-left">
          <motion.span className="contact-badge" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
            CONTACT
          </motion.span>

          <motion.h2 className="contact-v2-heading" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}>
            <span style={{ color: '#FFFFFF' }}>LET'S</span> <span className="contact-gold">WORK</span>
            <br />
            <span className="contact-gold">TOGETHER</span>
          </motion.h2>

          <motion.div className="contact-v2-divider" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} />

          <motion.p className="contact-v2-desc" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={3}>
            Have a project, business inquiry, collaboration opportunity, or idea?
            I'd love to hear from you and discuss how we can work together toward a shared goal.
          </motion.p>

          {/* Compact contact info cards */}
          <div className="contact-info-list">
            {contactInfo.map(({ Icon, label, value, href }, i) => (
              <motion.a
                key={label}
                href={href}
                className="contact-info-card"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={4 + i * 0.5}
              >
                <span className="contact-info-icon-wrap">
                  <Icon />
                </span>
                <div>
                  <p className="contact-info-label">{label}</p>
                  <p className="contact-info-value">{value}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Social buttons */}
          <motion.div className="contact-v2-social" variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={6}>
            {socialLinks.map(({ label, href, Icon }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-v2-social-btn"
                whileHover={{ y: -4, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                title={label}
              >
                <Icon />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT COLUMN – FORM ── */}
        <motion.div
          className="contact-v2-right"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="contact-form-card">
            {/* Corner glows */}
            <span className="corner-glow tl" />
            <span className="corner-glow tr" />
            <span className="corner-glow bl" />
            <span className="corner-glow br" />

            <h3 className="contact-form-title">Send a Message</h3>
            <p className="contact-form-subtitle">Fill out the form and I'll respond within 24 hours.</p>

            <form action="https://formsubmit.co/1e1a84f5b38cf5cf4131446388be76f6" method="POST" className="contact-form-v2">
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_subject" value="New Portfolio Contact" />
              <input type="hidden" name="_next" value={nextUrl} />
              <div className="cfv2-row">
                <div className="form-group-v2">
                  <label htmlFor="cv2-name">Full Name <span className="req">*</span></label>
                  <input type="text" id="cv2-name" name="name" placeholder="Your Full Name" required />
                </div>
                <div className="form-group-v2">
                  <label htmlFor="cv2-email">Email Address <span className="req">*</span></label>
                  <input type="email" id="cv2-email" name="email" placeholder="your@email.com" required />
                </div>
              </div>

              <div className="cfv2-row">
                <div className="form-group-v2">
                  <label htmlFor="cv2-phone">Phone Number</label>
                  <input type="tel" id="cv2-phone" name="phone" placeholder="+91 00000 00000" />
                </div>
                <div className="form-group-v2">
                  <label htmlFor="cv2-subject">Subject <span className="req">*</span></label>
                  <input type="text" id="cv2-subject" name="subject" placeholder="Project / Collaboration / Inquiry" required />
                </div>
              </div>

              <div className="form-group-v2">
                <label htmlFor="cv2-message">Message <span className="req">*</span></label>
                <textarea id="cv2-message" name="message" rows="6" placeholder="Tell me about your project, idea, or business inquiry…" required />
              </div>

              <motion.button
                type="submit"
                className="contact-submit-btn"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                SEND MESSAGE →
              </motion.button>
            </form>
          </div>
          
          <motion.div
            style={{ marginTop: '24px', display: 'flex', justifyContent: 'center' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <button 
              className="nav-cta" 
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setTimeout(() => setActiveView('payment'), 300);
              }} 
              style={{ width: '100%', padding: '16px', display: 'flex', justifyContent: 'center' }}
            >
              <div className="nav-cta-border"></div>
              <span className="nav-cta-text" style={{ fontSize: '1rem' }}>Proceed to Payment</span>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
