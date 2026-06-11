import React from 'react';
import { Linkedin, Whatsapp } from './BrandIcons';

const SocialFABs = () => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '2rem',
      left: '2rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
      zIndex: 9999
    }}>
      {/* LinkedIn FAB */}
      <a
        href="https://www.linkedin.com/in/umesh-dunna-cybersecurity"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Connect on LinkedIn"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#0a66c2', // Official LinkedIn blue
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(10, 102, 194, 0.3)',
          transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(10, 102, 194, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(10, 102, 194, 0.3)';
        }}
      >
        <Linkedin size={22} style={{ fill: '#ffffff', stroke: 'none' }} />
      </a>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/918143211258"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          width: '50px',
          height: '50px',
          borderRadius: '50%',
          backgroundColor: '#25d366', // Official WhatsApp green
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 15px rgba(37, 211, 102, 0.3)',
          transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-3px)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(37, 211, 102, 0.3)';
        }}
      >
        <Whatsapp size={22} style={{ strokeWidth: 2.5 }} />
      </a>
    </div>
  );
};

export default SocialFABs;
