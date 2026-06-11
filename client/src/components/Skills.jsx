import React from 'react';
import { Layout, Server, Database, Terminal } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: <Layout size={22} style={{ color: 'var(--accent)' }} />,
      skills: [
        { name: 'HTML5 & CSS3', level: 90 },
        { name: 'JavaScript (ES6+)', level: 85 },
        { name: 'React.js', level: 85 },
        { name: 'Responsive Web Design', level: 90 },
      ],
    },
    {
      title: 'Backend Development',
      icon: <Server size={22} style={{ color: 'var(--accent)' }} />,
      skills: [
        { name: 'Java', level: 85 },
        { name: 'Node.js & Express.js', level: 80 },
        { name: 'REST API Development', level: 85 },
        { name: 'MVC Architecture', level: 80 },
      ],
    },
    {
      title: 'Databases & Tools',
      icon: <Database size={22} style={{ color: 'var(--accent)' }} />,
      skills: [
        { name: 'MongoDB', level: 80 },
        { name: 'MySQL', level: 75 },
        { name: 'Git & GitHub', level: 85 },
        { name: 'Postman API Testing', level: 85 },
      ],
    },
    {
      title: 'Deployment & Development Tools',
      icon: <Terminal size={22} style={{ color: 'var(--accent)' }} />,
      skills: [
        { name: 'Vercel', level: 80 },
        { name: 'Render', level: 80 },
        { name: 'VS Code', level: 90 },
        { name: 'Eclipse IDE', level: 85 },
      ],
    },
  ];

  return (
    <section id="skills" style={{ backgroundColor: 'var(--bg-primary)', transition: 'background-color var(--transition-normal)' }}>
      <div className="container">
        <h2 className="section-title">My Skills</h2>
        <p className="section-subtitle">
          A showcase of my technical skills, tools, and technologies used to build modern full-stack web applications.
        </p>

        <div className="grid-4">
          {skillCategories.map((category, idx) => (
            <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Category Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  backgroundColor: 'rgba(var(--accent-rgb), 0.1)',
                  padding: '0.5rem',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {category.icon}
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{category.title}</h3>
              </div>

              {/* Skills List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {category.skills.map((skill, skillIdx) => (
                  <div key={skillIdx}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem',
                      fontWeight: 500,
                      fontSize: '0.95rem'
                    }}>
                      <span style={{ color: 'var(--text-primary)' }}>{skill.name}</span>
                      <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{skill.level}%</span>
                    </div>
                    {/* Progress Bar Container */}
                    <div style={{
                      width: '100%',
                      height: '8px',
                      backgroundColor: 'var(--bg-tertiary)',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      {/* Active Fill */}
                      <div style={{
                        width: `${skill.level}%`,
                        height: '100%',
                        background: 'var(--accent-gradient)',
                        borderRadius: '4px',
                        transition: 'width 1s ease-in-out'
                      }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
