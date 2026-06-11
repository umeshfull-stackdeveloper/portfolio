import React from 'react';
import { Award, Briefcase, GraduationCap } from 'lucide-react';

const About = () => {
  return (
    <section id="about" style={{ backgroundColor: 'var(--bg-secondary)', transition: 'background-color var(--transition-normal)' }}>
      <div className="container">
        <h2 className="section-title">About Me</h2>
        <p className="section-subtitle">
          Explore my education, technical skills, internships, certifications, and project experience as an aspiring Java Full Stack Developer.
        </p>

        <div className="grid-2">
          {/* Left Text Bio Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700 }}>
              Building modern web applications with <span className="gradient-text">innovation</span> and <span className="gradient-text">continuous learning</span>
            </h3>
            
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              I am an aspiring Java Full Stack Developer passionate about developing scalable, responsive, and user-friendly web applications. I enjoy working with Java, React.js, Node.js, Express.js, and MongoDB to create efficient solutions that address real-world challenges. Through internships, certifications, and hands-on projects, I continuously enhance my technical and problem-solving skills.
            </p>

            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent)' }}>3+</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase' }}>Internships</span>
              </div>
              <div style={{ borderLeft: '1px solid var(--border-color)', margin: '0 0.5rem' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent)' }}>10+</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase' }}>Projects Completed</span>
              </div>
              <div style={{ borderLeft: '1px solid var(--border-color)', margin: '0 0.5rem' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent)' }}>5+</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase' }}>Certifications</span>
              </div>
              <div style={{ borderLeft: '1px solid var(--border-color)', margin: '0 0.5rem' }}></div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent)' }}>2027</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase' }}>Graduate</span>
              </div>
            </div>
          </div>

          {/* Right Highlight Cards Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Experience Card */}
            <div className="card" style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem' }}>
              <div style={{
                color: 'var(--accent)',
                backgroundColor: 'rgba(var(--accent-rgb), 0.1)',
                padding: '0.75rem',
                borderRadius: '12px',
                height: 'fit-content'
              }}>
                <Briefcase size={24} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.25rem' }}>Internships & Certifications</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>EduSkills Internship</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      Worked on web development projects and gained hands-on experience in modern web technologies.
                    </p>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>CodeSoft Internship</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      Developed responsive web applications and improved frontend and backend development skills.
                    </p>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Qualcomm Wireless Academy Certification</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      Completed 5G Introductory-Level Certification and learned wireless communication fundamentals.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Education Card */}
            <div className="card" style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem' }}>
              <div style={{
                color: 'var(--accent)',
                backgroundColor: 'rgba(var(--accent-rgb), 0.1)',
                padding: '0.75rem',
                borderRadius: '12px',
                height: 'fit-content'
              }}>
                <GraduationCap size={24} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', width: '100%' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.25rem' }}>Education</h4>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Kakinada Institute of Engineering & Technology</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                      B.Tech in CS & Eng (Cyber Security) | Expected 2027
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CGPA: 7.58</p>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Sri Chaitanya Junior College</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                      Intermediate (MPC) | Passed 2023
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CGPA: 8.66</p>
                  </div>
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.5rem' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>Bhashyam Public School</p>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 500 }}>
                      SSC (10th Class) | Passed 2021
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>CGPA: 10.0</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Core Values Card */}
            <div className="card" style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem' }}>
              <div style={{
                color: 'var(--accent)',
                backgroundColor: 'rgba(var(--accent-rgb), 0.1)',
                padding: '0.75rem',
                borderRadius: '12px',
                height: 'fit-content'
              }}>
                <Award size={24} />
              </div>
              <div style={{ width: '100%' }}>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.75rem' }}>Core Strengths</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {[
                    'Java Development',
                    'Full Stack Web Development',
                    'React.js',
                    'Node.js',
                    'Express.js',
                    'MongoDB',
                    'REST API Development',
                    'Responsive Web Design',
                    'Database Management',
                    'Git & GitHub',
                    'DSA & Problem Solving',
                    'Clean Code Practices'
                  ].map((strength, index) => (
                    <span key={index} style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      color: 'var(--text-secondary)',
                      backgroundColor: 'var(--bg-tertiary)',
                      border: '1px solid var(--border-color)',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '20px',
                      transition: 'all var(--transition-fast)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--accent)';
                      e.currentTarget.style.borderColor = 'var(--accent)';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
