import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Admin from './components/Admin';
import Footer from './components/Footer';
import Particles from './components/Particles';
import Chatbot from './components/Chatbot';

function App() {
  // Theme state - default to dark mode for premium feel
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme ? savedTheme === 'dark' : true;
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [isSplashing, setIsSplashing] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  // Handle setting root class for dark mode variables
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  // Track page scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.pageYOffset / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle splash loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setIsSplashing(false);
      }, 500); // matches transition speed
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Splash Screen component render
  if (isSplashing) {
    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: '#030712',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
        opacity: fadeOut ? 0 : 1,
        transition: 'opacity 0.5s ease-in-out'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{
            fontSize: '3rem',
            fontWeight: 800,
            letterSpacing: '-1px',
            color: '#ffffff',
            fontFamily: 'sans-serif'
          }}>
            Portfolio<span style={{
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>.</span>
          </div>
          
          <div style={{
            width: '120px',
            height: '4px',
            backgroundColor: '#1f2937',
            borderRadius: '2px',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div className="splash-bar" style={{
              position: 'absolute',
              height: '100%',
              width: '50px',
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              left: '-50px',
              animation: 'splashLoad 1.5s infinite ease-in-out'
            }}></div>
          </div>
        </div>
        
        <style>{`
          @keyframes splashLoad {
            0% { left: -50px; }
            50% { left: 120px; }
            100% { left: 120px; }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Scroll Progress Bar */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '4px',
        width: `${scrollProgress}%`,
        background: 'var(--accent-gradient)',
        zIndex: 99999,
        transition: 'width 0.1s ease-out'
      }} />

      {/* Dynamic Particle Background */}
      <Particles darkMode={darkMode} />

      {/* Navigation */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Main Content Sections */}
      <main style={{ flexGrow: 1, position: 'relative', zIndex: 1 }}>
        <Home />
        <About />
        <Skills />
        <Projects />
        <Contact />
        <Admin />
      </main>

      {/* Floating Recruiter Chatbot Assistant */}
      <Chatbot />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
