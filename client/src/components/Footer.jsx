import React from 'react';
import { Mail } from 'lucide-react';
import { Github } from './BrandIcons';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      backgroundColor: 'var(--bg-secondary)',
      borderTop: '1px solid var(--border-color)',
      padding: '3rem 0',
      transition: 'background-color var(--transition-normal)'
    }}>
      <div className="container" style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        textAlign: 'center'
      }}>
        {/* Brand */}
        <a href="#home" style={{
          fontSize: '1.25rem',
          fontWeight: 800,
          textDecoration: 'none',
          color: 'var(--text-primary)',
          letterSpacing: '-0.5px'
        }}>
          Portfolio<span className="gradient-text">.</span>
        </a>

        {/* Footer Nav Links */}
        <div style={{
          display: 'flex',
          gap: '1.5rem',
          flexWrap: 'wrap',
          justifyContent: 'center'
        }}>
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.9rem',
                fontWeight: 500,
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div style={{ display: 'flex', gap: '1.25rem' }}>
          <a
            href="https://github.com/umeshfull-stackdeveloper?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            style={{
              color: 'var(--text-secondary)',
              transition: 'color var(--transition-fast), transform var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--accent)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Github size={20} />
          </a>
          <a
            href="mailto:umesh.dunna@example.com"
            aria-label="Send Email"
            style={{
              color: 'var(--text-secondary)',
              transition: 'color var(--transition-fast), transform var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--accent)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Mail size={20} />
          </a>
        </div>

        {/* Divider */}
        <div style={{
          width: '100%',
          maxWidth: '200px',
          height: '1px',
          backgroundColor: 'var(--border-color)'
        }}></div>

        {/* Copyright notice */}
        <p style={{
          fontSize: '0.85rem',
          color: 'var(--text-muted)'
        }}>
          &copy; {currentYear} Umesh Dunna. All Rights Reserved. Built with React.js, Node.js, Express.js & MongoDB.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
