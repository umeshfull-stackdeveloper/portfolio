import React, { useState, useEffect } from 'react';
import { ArrowRight, Download } from 'lucide-react';
import { Github } from './BrandIcons';

const Home = () => {
  const roles = ['Java Full Stack Developer | Building Scalable Web Applications'];
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(100);

  useEffect(() => {
    const handleTyping = () => {
      const fullText = roles[roleIndex];
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        setSpeed(80);
        if (currentText === fullText) {
          setIsDeleting(true);
          setSpeed(2000);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        setSpeed(40);
        if (currentText === '') {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
          setSpeed(500);
        }
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, speed]);

  return (
    <section id="home" className="container" style={{
      display: 'flex',
      alignItems: 'center',
      minHeight: 'calc(100vh - 120px)',
      paddingTop: '2rem',
      paddingBottom: '2rem'
    }}>
      <div className="grid-2" style={{ width: '100%' }}>
        {/* Left Info Column */}
        <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <span style={{
            fontSize: '1.1rem',
            fontWeight: 600,
            color: 'var(--accent)',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}>
            Welcome to My Portfolio
          </span>
          
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            lineHeight: 1.15,
            color: 'var(--text-primary)',
            letterSpacing: '-1px'
          }}>
            Hi, I'm <span className="gradient-text">Umesh Dunna</span>
            <br />
            <span style={{ fontSize: '2.5rem', fontWeight: 700, opacity: 0.9, display: 'inline-block', minHeight: '3.25rem' }}>
              {currentText}
              <span className="blinking-cursor" style={{ color: 'var(--accent)', fontWeight: 300 }}>|</span>
            </span>
          </h1>

          <p style={{
            fontSize: '1.2rem',
            color: 'var(--text-secondary)',
            maxWidth: '540px',
            lineHeight: 1.6
          }}>
            I build responsive, scalable, and user-friendly web applications using modern technologies. Passionate about creating efficient solutions with Java, React.js, Node.js, Express.js, and MongoDB.
          </p>

          {/* Social Links */}
          <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.5rem' }}>
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
              <Github size={24} />
            </a>
          </div>

          {/* Action CTAs */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            marginTop: '1.5rem'
          }}>
            <a href="#projects" className="btn btn-gradient">
              View Work
              <ArrowRight size={18} />
            </a>
            
            <a
              href="/resume.pdf"
              download="Umesh_Dunna_Resume.pdf"
              className="btn btn-outline"
            >
              Download CV
              <Download size={18} />
            </a>
          </div>
        </div>

        {/* Right Animated Graphic Column */}
        <div className="animate-float" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative'
        }}>
          {/* Decorative background glow */}
          <div style={{
            position: 'absolute',
            width: '320px',
            height: '320px',
            background: 'var(--accent-gradient)',
            opacity: 0.15,
            filter: 'blur(80px)',
            borderRadius: '50%',
            zIndex: -1
          }}></div>

          {/* Code mock display */}
          <div className="glass" style={{
            width: '100%',
            maxWidth: '450px',
            borderRadius: '20px',
            padding: '1.5rem',
            border: '1px solid var(--border-color)',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            color: 'var(--text-secondary)',
            boxShadow: 'var(--card-shadow)',
            lineHeight: 1.5
          }}>
            {/* Window controls */}
            <div style={{ display: 'flex', gap: '6px', marginBottom: '1.25rem' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }}></div>
            </div>

            {/* Code text content */}
            <div>
              <p><span style={{ color: 'var(--accent-secondary)' }}>const</span> developer = &#123;</p>
              <p style={{ paddingLeft: '1.5rem' }}>name: <span style={{ color: 'var(--accent)' }}>'Umesh Dunna'</span>,</p>
              <p style={{ paddingLeft: '1.5rem' }}>role: <span style={{ color: 'var(--accent)' }}>'Java Full Stack Developer'</span>,</p>
              <p style={{ paddingLeft: '1.5rem' }}>skills: [</p>
              <p style={{ paddingLeft: '3rem' }}><span style={{ color: 'var(--accent)' }}>'Java'</span>, <span style={{ color: 'var(--accent)' }}>'React.js'</span>, <span style={{ color: 'var(--accent)' }}>'Node.js'</span>,</p>
              <p style={{ paddingLeft: '3rem' }}><span style={{ color: 'var(--accent)' }}>'Express.js'</span>, <span style={{ color: 'var(--accent)' }}>'MongoDB'</span>, <span style={{ color: 'var(--accent)' }}>'JavaScript'</span></p>
              <p style={{ paddingLeft: '1.5rem' }}><span style={{ color: 'var(--text-muted)' }}>// ...always loading more</span></p>
              <p style={{ paddingLeft: '1.5rem' }}>],</p>
              <p style={{ paddingLeft: '1.5rem' }}>passionate: <span style={{ color: 'var(--accent-secondary)' }}>true</span></p>
              <p>&#125;;</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          50% { opacity: 0; }
        }
        .blinking-cursor {
          animation: blink 0.75s step-start infinite;
        }
        @media (max-width: 968px) {
          #home {
            min-height: auto !important;
            padding-top: 4rem !important;
            padding-bottom: 4rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Home;
