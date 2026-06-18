import React, { useState } from 'react';
import { Send, MapPin, Mail, Phone, CheckCircle, AlertTriangle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, success: null, message: '' });

  // Input validator
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        return '';
      case 'email':
        if (!value.trim()) return 'Email is required';
        if (!/^\S+@\S+\.\S+$/.test(value)) return 'Please enter a valid email address';
        return '';
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 3) return 'Subject must be at least 3 characters';
        return '';
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for this field as the user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errorMsg = validateField(name, value);
    setErrors({ ...errors, [name]: errorMsg });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const errorMsg = validateField(key, formData[key]);
      if (errorMsg) {
        newErrors[key] = errorMsg;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Submit form
    setStatus({ loading: true, success: null, message: '' });
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      let json = {};
      const contentType = res.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        json = await res.json();
      } else {
        throw new Error(`Server returned a non-JSON response (Status ${res.status}). Please make sure your backend server is running.`);
      }

      if (res.ok && json.success) {
        setStatus({
          loading: false,
          success: true,
          message: 'Thank you! Your message has been sent successfully. I will get back to you shortly.'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
        setErrors({});
      } else {
        throw new Error(json.message || 'Form submission failed. Please try again.');
      }
    } catch (err) {
      setStatus({ loading: false, success: false, message: err.message });
    }
  };

  return (
    <section id="contact" style={{ backgroundColor: 'var(--bg-primary)', transition: 'background-color var(--transition-normal)' }}>
      <div className="container">
        <h2 className="section-title">Let’s Work Together</h2>
        <p className="section-subtitle">
          Have a project idea, internship opportunity, or collaboration in mind? I’d love to connect and build something impactful together. I usually respond within 24 hours.
        </p>

        <div className="grid-2">
          {/* Left Info Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 700 }}>
              Let's build something <span className="gradient-text">extraordinary</span> together.
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.7 }}>
              Feel free to reach out via the contact form or using the details below. I try to reply to all inquiries within 24 hours.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  color: 'var(--accent)',
                  backgroundColor: 'rgba(var(--accent-rgb), 0.1)',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Mail size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Email Me</h4>
                  <a href="mailto:dunnaumesh2006@gmail.com" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>
                    dunnaumesh2006@gmail.com
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  color: 'var(--accent)',
                  backgroundColor: 'rgba(var(--accent-rgb), 0.1)',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Phone size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Call Me</h4>
                  <a href="tel:+918143211258" style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem' }}>
                    +91 8143211258
                  </a>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  color: 'var(--accent)',
                  backgroundColor: 'rgba(var(--accent-rgb), 0.1)',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Location</h4>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                    Palasa, Andhra Pradesh, India
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Column */}
          <div className="card">
            {status.success === true && (
              <div className="alert alert-success" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle size={18} />
                <span>{status.message}</span>
              </div>
            )}

            {status.success === false && (
              <div className="alert alert-error" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertTriangle size={18} />
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label className="form-label" htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Enter your name"
                  disabled={status.loading}
                />
                {errors.name && <div className="form-error-msg">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="Enter your email"
                  disabled={status.loading}
                />
                {errors.email && <div className="form-error-msg">{errors.email}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors.subject ? 'error' : ''}`}
                  placeholder="Project / Internship / Collaboration"
                  disabled={status.loading}
                />
                {errors.subject && <div className="form-error-msg">{errors.subject}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`form-input ${errors.message ? 'error' : ''}`}
                  placeholder="Write your message here..."
                  rows="5"
                  style={{ resize: 'vertical' }}
                  disabled={status.loading}
                ></textarea>
                {errors.message && <div className="form-error-msg">{errors.message}</div>}
              </div>

              <button
                type="submit"
                className="btn btn-gradient"
                style={{ width: '100%', marginTop: '0.5rem' }}
                disabled={status.loading}
              >
                {status.loading ? (
                  <>
                    <span className="spinner"></span> Sending...
                  </>
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
