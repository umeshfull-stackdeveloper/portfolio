import React, { useState, useEffect } from 'react';
import { ExternalLink, Info, RefreshCw, LayoutGrid, Sliders, ChevronLeft, ChevronRight } from 'lucide-react';
import { Github } from './BrandIcons';

const FALLBACK_PROJECTS = [
  {
    _id: 'proj-1',
    title: 'Personal Portfolio Website',
    description: 'Designed and developed a responsive portfolio website to showcase my skills, projects, internships, certifications, and contact information. Implemented a modern UI with smooth navigation and mobile-friendly design.',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'React.js'],
    githubLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    liveLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    featured: true
  },
  {
    _id: 'proj-2',
    title: 'Student Management System',
    description: 'Built a full-stack application to manage student records, including adding, updating, deleting, and searching student information with database integration.',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    technologies: ['Java', 'MySQL', 'JDBC'],
    githubLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    liveLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    featured: true
  },
  {
    _id: 'proj-3',
    title: 'Task Management Application',
    description: 'Developed a task tracking system that allows users to create, update, organize, and manage daily tasks with a responsive user interface.',
    image: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=800&q=80',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    githubLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    liveLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    featured: false
  },
  {
    _id: 'proj-4',
    title: 'Weather Information App',
    description: 'Created a web application that fetches real-time weather data using APIs and displays weather conditions in a clean and user-friendly interface.',
    image: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?auto=format&fit=crop&w=800&q=80',
    technologies: ['JavaScript', 'REST API', 'HTML5', 'CSS3'],
    githubLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    liveLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    featured: false
  },
  {
    _id: 'proj-5',
    title: 'Online Food Ordering System',
    description: 'Developed a full-stack food ordering platform where users can browse menus, add items to cart, place orders, and manage their accounts.',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    githubLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    liveLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    featured: true
  },
  {
    _id: 'proj-6',
    title: 'Employee Management System',
    description: 'Built a web application to manage employee records, departments, salaries, and attendance with CRUD operations and database integration.',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80',
    technologies: ['Java', 'MySQL', 'JDBC'],
    githubLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    liveLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    featured: false
  },
  {
    _id: 'proj-7',
    title: 'Library Management System',
    description: 'Created a system to manage books, issue and return records, and member details with an efficient database structure.',
    image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=800&q=80',
    technologies: ['Java', 'MySQL'],
    githubLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    liveLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    featured: false
  },
  {
    _id: 'proj-8',
    title: 'Expense Tracker Application',
    description: 'Designed a personal finance tracker that helps users record expenses, categorize transactions, and monitor spending habits.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=800&q=80',
    technologies: ['React.js', 'Node.js', 'MongoDB'],
    githubLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    liveLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    featured: false
  },
  {
    _id: 'proj-9',
    title: 'Blog Management Platform',
    description: 'Developed a blogging application where users can create, edit, delete, and manage posts with authentication and database storage.',
    image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB'],
    githubLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    liveLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    featured: false
  },
  {
    _id: 'proj-10',
    title: 'Quiz Application',
    description: 'Built an interactive quiz platform with multiple categories, score tracking, timer functionality, and performance analysis.',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80',
    technologies: ['JavaScript', 'HTML5', 'CSS3'],
    githubLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    liveLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    featured: false
  },
  {
    _id: 'proj-11',
    title: 'URL Shortener',
    description: 'Created a URL shortening service that generates compact links and tracks click statistics.',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80',
    technologies: ['Node.js', 'Express.js', 'MongoDB'],
    githubLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    liveLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    featured: false
  },
  {
    _id: 'proj-12',
    title: 'Online Examination System',
    description: 'Developed a web-based examination platform with student login, question management, automated evaluation, and result generation.',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    technologies: ['Java', 'MySQL', 'JDBC'],
    githubLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    liveLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    featured: false
  },
  {
    _id: 'proj-13',
    title: 'Chat Application',
    description: 'Implemented a real-time messaging application with user authentication and instant communication features.',
    image: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?auto=format&fit=crop&w=800&q=80',
    technologies: ['React.js', 'Node.js', 'Socket.io', 'MongoDB'],
    githubLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    liveLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    featured: false
  },
  {
    _id: 'proj-14',
    title: 'Movie Recommendation App',
    description: 'Built an application that displays movie information, ratings, and recommendations using third-party APIs.',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    technologies: ['React.js', 'REST API', 'JavaScript'],
    githubLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    liveLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    featured: false
  },
  {
    _id: 'proj-15',
    title: 'Hospital Management System',
    description: 'Developed a system to manage patient records, appointments, doctors, and billing information efficiently.',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
    technologies: ['Java', 'MySQL'],
    githubLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    liveLink: 'https://github.com/umeshfull-stackdeveloper?tab=repositories',
    featured: false
  }
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [usingMock, setUsingMock] = useState(false);
  const [filter, setFilter] = useState('All');
  const [viewMode, setViewMode] = useState('carousel');
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);
  const [tiltStyles, setTiltStyles] = useState({});

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerView(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerView(2);
      } else {
        setCardsPerView(3);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setCarouselIndex(0);
  }, [filter]);

  const handleMouseMove = (e, id) => {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const x = e.clientX - box.left;
    const y = e.clientY - box.top;
    const width = box.width;
    const height = box.height;
    const px = (x / width) - 0.5;
    const py = (y / height) - 0.5;
    const tiltY = px * 16;
    const tiltX = -py * 16;

    setTiltStyles(prev => ({
      ...prev,
      [id]: {
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.03, 1.03, 1.03) translateY(-8px)`,
        boxShadow: '0 20px 40px -15px rgba(99, 102, 241, 0.25)',
        borderColor: 'var(--accent)',
        transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out',
        zIndex: 5
      }
    }));
  };

  const handleMouseLeave = (id) => {
    setTiltStyles(prev => ({
      ...prev,
      [id]: {
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1) translateY(0px)',
        transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
      }
    }));
    setTimeout(() => {
      setTiltStyles(prev => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
    }, 500);
  };

  const renderCardContent = (project) => (
    <>
      {/* Project Visual Image */}
      <div style={{
        height: '200px',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <img
          src={project.image}
          alt={project.title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform var(--transition-normal)'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1.0)'}
        />
        {project.featured && (
          <span style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: 'var(--accent-gradient)',
            color: '#ffffff',
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)'
          }}>
            Featured
          </span>
        )}
      </div>

      {/* Text Body */}
      <div style={{
        padding: '1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        flexGrow: 1
      }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{project.title}</h3>
        <p style={{
          fontSize: '0.92rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.5,
          flexGrow: 1
        }}>
          {project.description}
        </p>

        {/* Tech Badges */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '6px',
          margin: '0.5rem 0'
        }}>
          {project.technologies.map((tech, i) => (
            <span key={i} style={{
              fontSize: '0.75rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              backgroundColor: 'var(--bg-tertiary)',
              padding: '0.2rem 0.6rem',
              borderRadius: '4px',
              border: '1px solid var(--border-color)'
            }}>
              {tech}
            </span>
          ))}
        </div>

        {/* Action Links */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          borderTop: '1px solid var(--border-color)',
          paddingTop: '1rem',
          marginTop: '0.5rem'
        }}>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <Github size={16} /> Code
            </a>
          )}

          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                fontSize: '0.85rem',
                fontWeight: 600,
                transition: 'color var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}
            >
              <ExternalLink size={16} /> Demo
            </a>
          )}
        </div>
      </div>
    </>
  );

  const sectionRef = React.useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch from API (assumes proxy or matching host on same domain / local port 5000)
      const res = await fetch('/api/projects');
      if (!res.ok) {
        throw new Error(`Server returned code: ${res.status}`);
      }
      const json = await res.json();
      if (json.success && json.data && json.data.length > 0) {
        setProjects(json.data);
        setUsingMock(false);
      } else {
        // If DB has 0 items, load fallbacks to prevent empty screen
        setProjects(FALLBACK_PROJECTS);
        setUsingMock(true);
      }
    } catch (err) {
      console.warn('API fetch failed. Using fallback portfolio data.', err.message);
      setProjects(FALLBACK_PROJECTS);
      setUsingMock(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Filter logic
  const getFilteredProjects = () => {
    if (filter === 'All') return projects;
    if (filter === 'Featured') return projects.filter(p => p.featured);
    return projects.filter(p =>
      p.technologies.some(tech => {
        const cleanTech = tech.toLowerCase().trim();
        const cleanFilter = filter.toLowerCase().trim();
        if (cleanTech === cleanFilter) return true;
        const regex = new RegExp(`\\b${cleanFilter}\\b`, 'i');
        return regex.test(cleanTech);
      })
    );
  };

  const filtered = getFilteredProjects();
  const maxIndex = Math.max(0, filtered.length - cardsPerView);

  return (
    <section ref={sectionRef} id="projects" style={{ backgroundColor: 'var(--bg-secondary)', transition: 'background-color var(--transition-normal)' }}>
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <p className="section-subtitle">
          A collection of web applications and software projects showcasing my skills in Java, React.js, Node.js, MongoDB, REST APIs, and full-stack development.
        </p>

        {/* Filter Badges */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.75rem',
          flexWrap: 'wrap',
          marginBottom: '1.5rem'
        }}>
          {['All', 'Featured', 'Java', 'React.js', 'Node.js', 'MongoDB'].map((tech) => (
            <button
              key={tech}
              onClick={() => setFilter(tech)}
              className="btn"
              style={{
                padding: '0.45rem 1.25rem',
                fontSize: '0.85rem',
                backgroundColor: filter === tech ? 'var(--accent)' : 'var(--bg-tertiary)',
                color: filter === tech ? '#ffffff' : 'var(--text-secondary)',
                border: '1px solid var(--border-color)',
                boxShadow: filter === tech ? '0 4px 10px rgba(var(--accent-rgb), 0.2)' : 'none'
              }}
            >
              {tech}
            </button>
          ))}
        </div>

        {/* View Toggle and Carousel Pagination Toolbar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
          width: '100%',
          borderTop: '1px dashed var(--border-color)',
          paddingTop: '1.5rem'
        }}>
          {/* View Mode Toggle Buttons */}
          <div style={{
            display: 'flex',
            backgroundColor: 'var(--bg-tertiary)',
            padding: '4px',
            borderRadius: '8px',
            border: '1px solid var(--border-color)'
          }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.5rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: viewMode === 'grid' ? 'var(--accent)' : 'transparent',
                color: viewMode === 'grid' ? '#ffffff' : 'var(--text-secondary)',
                transition: 'all 0.3s ease'
              }}
            >
              <LayoutGrid size={16} /> Grid View
            </button>
            <button
              onClick={() => setViewMode('carousel')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.5rem 1rem',
                fontSize: '0.85rem',
                fontWeight: 600,
                borderRadius: '6px',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: viewMode === 'carousel' ? 'var(--accent)' : 'transparent',
                color: viewMode === 'carousel' ? '#ffffff' : 'var(--text-secondary)',
                transition: 'all 0.3s ease'
              }}
            >
              <Sliders size={16} /> Carousel View
            </button>
          </div>

          {/* Carousel Arrows */}
          {viewMode === 'carousel' && filtered.length > cardsPerView && (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => setCarouselIndex(prev => Math.max(0, prev - 1))}
                disabled={carouselIndex === 0}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: carouselIndex === 0 ? 'var(--text-muted)' : 'var(--text-primary)',
                  cursor: carouselIndex === 0 ? 'not-allowed' : 'pointer',
                  opacity: carouselIndex === 0 ? 0.5 : 1,
                  transition: 'all 0.3s ease'
                }}
                className="carousel-arrow"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCarouselIndex(prev => Math.min(maxIndex, prev + 1))}
                disabled={carouselIndex >= maxIndex}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  border: '1px solid var(--border-color)',
                  backgroundColor: 'var(--bg-tertiary)',
                  color: carouselIndex >= maxIndex ? 'var(--text-muted)' : 'var(--text-primary)',
                  cursor: carouselIndex >= maxIndex ? 'not-allowed' : 'pointer',
                  opacity: carouselIndex >= maxIndex ? 0.5 : 1,
                  transition: 'all 0.3s ease'
                }}
                className="carousel-arrow"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>

        {/* Loaders */}
        {loading ? (
          <div className="grid-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="card" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ height: '200px', backgroundColor: 'var(--bg-tertiary)', position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
                    animation: 'shimmer 1.5s infinite'
                  }}></div>
                </div>
                <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <div style={{ height: '20px', width: '60%', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px' }}></div>
                  <div style={{ height: '14px', width: '100%', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px' }}></div>
                  <div style={{ height: '14px', width: '90%', backgroundColor: 'var(--bg-tertiary)', borderRadius: '4px' }}></div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '0.5rem' }}>
                    <div style={{ height: '24px', width: '50px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '12px' }}></div>
                    <div style={{ height: '24px', width: '50px', backgroundColor: 'var(--bg-tertiary)', borderRadius: '12px' }}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Projects Content */
          <>
            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                <h3>No projects found matching the filter selection.</h3>
              </div>
            ) : viewMode === 'grid' ? (
              /* Grid Layout */
              <div className="grid-3">
                {filtered.map((project, index) => (
                  <article
                    key={project._id}
                    className={`card ${index % 2 === 0 ? 'project-card-left' : 'project-card-right'} ${isVisible ? 'visible' : ''}`}
                    style={{
                      padding: '0',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                      transitionDelay: isVisible ? `${index * 80}ms` : '0ms',
                      ...tiltStyles[project._id]
                    }}
                    onMouseMove={(e) => handleMouseMove(e, project._id)}
                    onMouseLeave={() => handleMouseLeave(project._id)}
                  >
                    {renderCardContent(project)}
                  </article>
                ))}
              </div>
            ) : (
              /* Carousel Layout */
              <div style={{ position: 'relative', overflow: 'hidden', width: '100%', padding: '1rem 0' }}>
                <div style={{
                  display: 'flex',
                  gap: '1.5rem',
                  transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: `translateX(calc(-${carouselIndex} * (100% + 1.5rem) / ${cardsPerView}))`,
                  width: '100%'
                }}>
                  {filtered.map((project) => (
                    <article
                      key={project._id}
                      className="card"
                      style={{
                        flex: `0 0 calc((100% - ${(cardsPerView - 1) * 1.5}rem) / ${cardsPerView})`,
                        padding: '0',
                        overflow: 'hidden',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        boxSizing: 'border-box',
                        transition: 'transform 0.1s ease-out, box-shadow 0.1s ease-out, border-color 0.1s ease-out',
                        ...tiltStyles[project._id]
                      }}
                      onMouseMove={(e) => handleMouseMove(e, project._id)}
                      onMouseLeave={() => handleMouseLeave(project._id)}
                    >
                      {renderCardContent(project)}
                    </article>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Shimmer layout helper */}
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .project-card-left {
          opacity: 0;
          transform: translateX(-80px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .project-card-right {
          opacity: 0;
          transform: translateX(80px);
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease, border-color 0.3s ease;
        }
        .project-card-left.visible, .project-card-right.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .project-card-left.visible:hover, .project-card-right.visible:hover {
          transform: translateY(-8px) scale(1.03) !important;
          border-color: var(--accent);
          box-shadow: 0 20px 40px -15px rgba(var(--accent-rgb), 0.15);
        }
        .carousel-arrow:not(:disabled):hover {
          background-color: var(--accent) !important;
          color: #ffffff !important;
          border-color: var(--accent) !important;
          transform: scale(1.05);
        }
      `}</style>
    </section>
  );
};

export default Projects;
