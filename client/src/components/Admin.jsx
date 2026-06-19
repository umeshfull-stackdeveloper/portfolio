import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Key, Eye, Check, AlertCircle, X, Shield } from 'lucide-react';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL?.replace(/\/$/, '');
  console.log("API_URL =", API_URL);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  // Status feedback states
  const [authError, setAuthError] = useState('');
  const [status, setStatus] = useState({ success: null, message: '' });

  // Form states for Create/Edit
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    technologies: '',
    githubLink: '',
    liveLink: '',
    featured: false
  });

  const [formErrors, setFormErrors] = useState({});

  // Fetch all projects for admin grid
  const fetchAdminProjects = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/projects`);
      const json = await res.json();
      if (json.success) {
        setProjects(json.data);
      }
    } catch (err) {
      console.error('Error fetching admin projects:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchAdminProjects();
    }
  }, [isAuthenticated]);

  // Auth Handler
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!API_URL) {
      setAuthError("API URL not configured (.env missing)");
      return;
    }

    console.log("API URL =", API_URL);

    if (!password) {
      setAuthError('Please enter the administrator password.');
      return;
    }

    setAuthLoading(true);
    setAuthError('');

    console.log("PASSWORD:", password);
    console.log("FINAL API_URL =", API_URL);

    try {
      const res = await fetch(`${API_URL}/api/admin/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password: password.trim()
        })
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setIsAuthenticated(true);
        setAuthError('');
      } else {
        setAuthError(json.message || 'Invalid administrator password.');
      }

    } catch (err) {
      console.log("LOGIN ERROR:", err);
      setAuthError(err.message || "Something went wrong");
    } finally {
      setAuthLoading(false);
    }
  };

  // Form Field Validation
  const validateForm = () => {
    const errors = {};
    if (!formData.title.trim()) errors.title = 'Title is required';
    if (!formData.description.trim()) errors.description = 'Description is required';
    if (!formData.image.trim()) errors.image = 'Image URL is required';
    if (!formData.technologies.trim()) errors.technologies = 'Technologies are required (comma separated)';
    return errors;
  };

  // Open Form for Adding
  const handleAddOpen = () => {
    setEditingId(null);
    setFormData({
      title: '',
      description: '',
      image: '',
      technologies: '',
      githubLink: '',
      liveLink: '',
      featured: false
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  // Open Form for Editing
  const handleEditOpen = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      image: project.image,
      technologies: project.technologies.join(', '),
      githubLink: project.githubLink || '',
      liveLink: project.liveLink || '',
      featured: project.featured || false
    });
    setFormErrors({});
    setIsFormOpen(true);
  };

  // Handle Form Inputs
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
  };

  // Save / Update Project Submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setActionLoading(true);
    setStatus({ success: null, message: '' });

    // Format technologies into array
    const techsArray = formData.technologies
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const payload = {
      ...formData,
      technologies: techsArray
    };

    try {
      const url = editingId
        ? `${import.meta.env.VITE_API_URL}/api/projects/${editingId}`
        : `${import.meta.env.VITE_API_URL}/api/projects`;;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Password': password
        },
        body: JSON.stringify(payload)
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setStatus({
          success: true,
          message: editingId ? 'Project updated successfully!' : 'Project created successfully!'
        });
        setIsFormOpen(false);
        fetchAdminProjects();
      } else {
        throw new Error(json.message || 'Authorization failed. Please double check password.');
      }
    } catch (err) {
      setStatus({ success: false, message: err.message });
      // If unauthorized, log back out
      if (err.message.toLowerCase().includes('unauthorized') || err.message.toLowerCase().includes('password')) {
        setIsAuthenticated(false);
        setPassword('');
        setAuthError('Unauthorized. Your admin session has expired or password was incorrect.');
      }
    } finally {
      setActionLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;

    setActionLoading(true);
    setStatus({ success: null, message: '' });

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/projects/${id}`,
        {
          method: 'DELETE',
          headers: {
            'X-Admin-Password': password
          }
        }
      );

      const json = await res.json();

      if (res.ok && json.success) {
        setStatus({ success: true, message: 'Project deleted successfully!' });
        fetchAdminProjects();
      } else {
        throw new Error(json.message || 'Delete operation failed.');
      }
    } catch (err) {
      setStatus({ success: false, message: err.message });
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ FIX 2 GOES HERE
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
    setProjects([]);
    setStatus({ success: null, message: '' });
    setAuthError('');
  };

  return (
    <section id="admin" style={{ backgroundColor: 'var(--bg-secondary)', transition: 'background-color var(--transition-normal)' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h2 className="section-title" style={{ textAlign: 'left', margin: 0, paddingBottom: '0.5rem' }}>
              Admin Panel
            </h2>
            <p style={{ color: 'var(--text-muted)' }}>Configure and edit the active project listings.</p>
          </div>

          {isAuthenticated && (
            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
              Exit Admin
            </button>
          )}
        </div>

        {/* Auth Checkpoint */}
        {!isAuthenticated ? (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
            <div className="card" style={{ width: '100%', maxWidth: '420px', padding: '2rem' }}>
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <Shield size={36} style={{ color: 'var(--accent)', marginBottom: '0.75rem' }} />
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Administrator Portal</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                  Provide the password to log in and unlock project management tools.
                </p>
              </div>

              {authError && (
                <div className="alert alert-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', padding: '0.75rem' }}>
                  <AlertCircle size={16} />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin}>
                <div className="form-group">
                  <label className="form-label" htmlFor="admin-pass">Access Code</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="password"
                      id="admin-pass"
                      className="form-input"
                      style={{ paddingLeft: '2.5rem' }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                    <Key size={16} style={{ position: 'absolute', left: '12px', top: '55%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                  </div>
                </div>

                <button type="submit" className="btn btn-gradient" style={{ width: '100%' }} disabled={authLoading}>
                  {authLoading ? 'Verifying...' : 'Log In'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Logged In Dashboard View */
          <div>
            {status.message && (
              <div className={`alert ${status.success ? 'alert-success' : 'alert-error'}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {status.success ? <Check size={18} /> : <AlertCircle size={18} />}
                <span>{status.message}</span>
              </div>
            )}

            {/* Dashboard Header Bar */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              backgroundColor: 'var(--bg-tertiary)',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              border: '1px solid var(--border-color)',
              marginBottom: '2rem'
            }}>
              <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                Active Projects Count: <span style={{ color: 'var(--accent)' }}>{projects.length}</span>
              </span>

              <button onClick={handleAddOpen} className="btn btn-gradient" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                <Plus size={16} /> Add New Project
              </button>
            </div>

            {/* Project Entry Form Modal/Overlay */}
            {isFormOpen && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(5px)',
                zIndex: 2000,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '1rem'
              }}>
                <div className="card" style={{
                  width: '100%',
                  maxWidth: '600px',
                  maxHeight: '90vh',
                  overflowY: 'auto',
                  position: 'relative',
                  backgroundColor: 'var(--bg-secondary)'
                }}>
                  {/* Close trigger */}
                  <button onClick={() => setIsFormOpen(false)} style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-secondary)'
                  }}>
                    <X size={20} />
                  </button>

                  <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                    {editingId ? 'Edit Project' : 'Create New Project'}
                  </h3>

                  <form onSubmit={handleFormSubmit}>
                    <div className="form-group">
                      <label className="form-label" htmlFor="p-title">Project Title</label>
                      <input
                        type="text"
                        id="p-title"
                        name="title"
                        className={`form-input ${formErrors.title ? 'error' : ''}`}
                        value={formData.title}
                        onChange={handleInputChange}
                        placeholder="E.g., Modern Web App"
                      />
                      {formErrors.title && <div className="form-error-msg">{formErrors.title}</div>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="p-desc">Description</label>
                      <textarea
                        id="p-desc"
                        name="description"
                        className={`form-input ${formErrors.description ? 'error' : ''}`}
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe features and goals of this project..."
                        rows="3"
                      ></textarea>
                      {formErrors.description && <div className="form-error-msg">{formErrors.description}</div>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="p-image">Image URL</label>
                      <input
                        type="text"
                        id="p-image"
                        name="image"
                        className={`form-input ${formErrors.image ? 'error' : ''}`}
                        value={formData.image}
                        onChange={handleInputChange}
                        placeholder="https://images.unsplash.com/photo-..."
                      />
                      {formErrors.image && <div className="form-error-msg">{formErrors.image}</div>}
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor="p-tech">Technologies (comma separated)</label>
                      <input
                        type="text"
                        id="p-tech"
                        name="technologies"
                        className={`form-input ${formErrors.technologies ? 'error' : ''}`}
                        value={formData.technologies}
                        onChange={handleInputChange}
                        placeholder="React.js, Node.js, Express, MongoDB"
                      />
                      {formErrors.technologies && <div className="form-error-msg">{formErrors.technologies}</div>}
                    </div>

                    <div className="grid-2" style={{ gap: '1rem', gridTemplateColumns: '1fr 1fr', marginBottom: '1.25rem' }}>
                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" htmlFor="p-git">GitHub URL</label>
                        <input
                          type="text"
                          id="p-git"
                          name="githubLink"
                          className="form-input"
                          value={formData.githubLink}
                          onChange={handleInputChange}
                          placeholder="https://github.com/..."
                        />
                      </div>

                      <div className="form-group" style={{ marginBottom: 0 }}>
                        <label className="form-label" htmlFor="p-live">Live Demo URL</label>
                        <input
                          type="text"
                          id="p-live"
                          name="liveLink"
                          className="form-input"
                          value={formData.liveLink}
                          onChange={handleInputChange}
                          placeholder="https://example.com"
                        />
                      </div>
                    </div>

                    {/* Featured Checkbox */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.5rem' }}>
                      <input
                        type="checkbox"
                        id="p-feat"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        style={{ width: '16px', height: '16px', cursor: 'pointer' }}
                      />
                      <label htmlFor="p-feat" style={{ fontWeight: 500, cursor: 'pointer', fontSize: '0.92rem' }}>
                        Highlight on home portfolio as a featured project
                      </label>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                      <button type="button" onClick={() => setIsFormOpen(false)} className="btn btn-outline" style={{ padding: '0.6rem 1.5rem' }}>
                        Cancel
                      </button>

                      <button type="submit" className="btn btn-gradient" style={{ padding: '0.6rem 1.5rem' }} disabled={actionLoading}>
                        {actionLoading ? 'Saving...' : 'Save Project'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Admin Project Grid Table */}
            {loading ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <span className="spinner"></span> Loading dashboard projects...
              </div>
            ) : projects.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                <h3>No projects uploaded to database yet.</h3>
                <p>Click "Add New Project" above to create your first portfolio card entry.</p>
              </div>
            ) : (
              <div className="glass" style={{
                borderRadius: '16px',
                border: '1px solid var(--border-color)',
                overflowX: 'auto',
                boxShadow: 'var(--card-shadow)'
              }}>
                <table style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  textAlign: 'left',
                  fontSize: '0.95rem'
                }}>
                  <thead>
                    <tr style={{ backgroundColor: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Visual</th>
                      <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Title</th>
                      <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Technologies</th>
                      <th style={{ padding: '1rem 1.5rem', fontWeight: 600 }}>Featured</th>
                      <th style={{ padding: '1rem 1.5rem', fontWeight: 600, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map((project) => (
                      <tr key={project._id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background-color var(--transition-fast)' }}>
                        <td style={{ padding: '0.75rem 1.5rem' }}>
                          <img
                            src={project.image}
                            alt={project.title}
                            style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '4px' }}
                          />
                        </td>
                        <td style={{ padding: '0.75rem 1.5rem', fontWeight: 600, color: 'var(--text-primary)' }}>{project.title}</td>
                        <td style={{ padding: '0.75rem 1.5rem', color: 'var(--text-secondary)' }}>
                          {project.technologies.slice(0, 3).join(', ')}
                          {project.technologies.length > 3 && '...'}
                        </td>
                        <td style={{ padding: '0.75rem 1.5rem' }}>
                          {project.featured ? (
                            <span style={{
                              color: 'var(--success)',
                              backgroundColor: 'rgba(16, 185, 129, 0.12)',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              padding: '0.15rem 0.5rem',
                              borderRadius: '4px'
                            }}>
                              Yes
                            </span>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>No</span>
                          )}
                        </td>
                        <td style={{ padding: '0.75rem 1.5rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => handleEditOpen(project)}
                              style={{
                                border: 'none',
                                background: 'var(--bg-tertiary)',
                                cursor: 'pointer',
                                color: 'var(--text-secondary)',
                                padding: '0.4rem',
                                borderRadius: '6px'
                              }}
                              title="Edit Project"
                            >
                              <Edit2 size={16} />
                            </button>

                            <button
                              onClick={() => handleDelete(project._id)}
                              style={{
                                border: 'none',
                                background: 'rgba(239, 68, 68, 0.1)',
                                cursor: 'pointer',
                                color: 'var(--error)',
                                padding: '0.4rem',
                                borderRadius: '6px'
                              }}
                              title="Delete Project"
                              disabled={actionLoading}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Admin;
