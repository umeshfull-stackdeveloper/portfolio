import React, { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';

const Navbar = ({ darkMode, setDarkMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      padding: '1.25rem 0',
      borderBottom: '1px solid var(--border-color)',
      transition: 'background-color var(--transition-normal)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <a href="#home" style={{
          fontSize: '1.5rem',
          fontWeight: 800,
          textDecoration: 'none',
          color: 'var(--text-primary)',
          letterSpacing: '-0.5px'
        }}>
          Portfolio<span className="gradient-text">.</span>
        </a>

        {/* Desktop Nav Links */}
        <div className="nav-desktop" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2.5rem'
        }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontWeight: 500,
                  fontSize: '1rem',
                  transition: 'color var(--transition-fast)'
                }}
                onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
                onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
              >
                {link.name}
              </a>
            ))}
            {/* Admin Link */}
            <a
              href="#admin"
              style={{
                color: 'var(--text-muted)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '1rem',
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.target.style.color = 'var(--text-muted)'}
            >
              Admin
            </a>
          </div>

          {/* Theme & Admin togglers */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              padding: '0.5rem',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-tertiary)',
              transition: 'background-color var(--transition-fast)'
            }}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={20} className="gradient-text" /> : <Moon size={20} style={{ color: 'var(--accent)' }} />}
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="nav-mobile-buttons" style={{ display: 'none', gap: '1rem', alignItems: 'center' }}>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center',
              padding: '0.5rem',
              borderRadius: '50%',
              backgroundColor: 'var(--bg-tertiary)'
            }}
            aria-label="Toggle theme"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          
          <button
            onClick={toggleMenu}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-primary)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="glass" style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          padding: '1.5rem 2rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1.25rem',
          borderBottom: '1px solid var(--border-color)',
          boxShadow: 'var(--card-shadow)'
        }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              style={{
                color: 'var(--text-primary)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '1.1rem'
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#admin"
            onClick={() => setIsOpen(false)}
            style={{
              color: 'var(--text-muted)',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1.1rem'
            }}
          >
            Admin Dashboard
          </a>
        </div>
      )}

      {/* CSS styling for responsiveness */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop {
            display: none !important;
          }
          .nav-mobile-buttons {
            display: flex !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
