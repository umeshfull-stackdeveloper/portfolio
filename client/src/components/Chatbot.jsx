import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: "Hi there! I'm Umesh's AI Assistant. How can I help you find information about his experience, skills, or projects today?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    "Tell me about Umesh's skills",
    "What internships has he done?",
    "Show featured projects",
    "How can I contact him?",
    "Download his Resume"
  ];

  const getBotResponse = (input) => {
    const text = input.toLowerCase();
    if (text.includes('skill') || text.includes('tech') || text.includes('languages') || text.includes('stack')) {
      return "Umesh is highly proficient in Java (B.Tech Cyber Security), React.js, Node.js, Express.js, MongoDB, MySQL, REST APIs, Git/GitHub, and DSA. He focuses on clean code practices and responsive web layouts.";
    }
    if (text.includes('internship') || text.includes('experience') || text.includes('work') || text.includes('eduskills') || text.includes('codesoft')) {
      return "Umesh has completed two key web development internships:\n1. EduSkills Web Development Internship\n2. CodeSoft Web Development Internship\n\nHe also holds a 5G Introductory Certification from the Qualcomm Wireless Academy!";
    }
    if (text.includes('project') || text.includes('portfolio') || text.includes('apps')) {
      return "Some of Umesh's top projects are:\n- Personal Portfolio Website (React)\n- Student Management System (Java, MySQL, JDBC)\n- Online Food Ordering System (React, Node, Express, MongoDB)\n- Task Management App (MERN stack)\n\nYou can click on the 'My Projects' section to see more!";
    }
    if (text.includes('contact') || text.includes('email') || text.includes('phone') || text.includes('call') || text.includes('reach') || text.includes('hire')) {
      return "You can reach Umesh directly via:\n- Email: dunnaumesh2006@gmail.com\n- Phone: +91 8143211258\n- Location: Palasa, Andhra Pradesh, India\n\nOr drop a line in the Contact Form at the bottom of the page!";
    }
    if (text.includes('resume') || text.includes('cv') || text.includes('pdf') || text.includes('download')) {
      return "You can download Umesh's latest CV directly from the home landing page using the 'Download CV' button, or by searching 'resume.pdf' in the website's public assets!";
    }
    if (text.includes('hello') || text.includes('hi') || text.includes('hey') || text.includes('greetings')) {
      return "Hello! How can I help you explore Umesh's developer qualifications?";
    }
    return "Thank you for asking! I'm programmed to answer questions about Umesh's developer stack, internships, projects, and contact info. Feel free to ask about his 'skills', 'internships', 'projects', 'resume', or 'how to contact him'.";
  };

  const handleSend = (text) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot thinking and typing
    setTimeout(() => {
      const responseText = getBotResponse(text);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999 }}>
      {/* Floating Trigger Bubble */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--accent-gradient)',
            border: 'none',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 8px 30px rgba(var(--accent-rgb), 0.3)',
            transition: 'transform var(--transition-fast)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          aria-label="Open chat assistant"
        >
          <MessageSquare size={26} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="glass" style={{
          width: '380px',
          height: '500px',
          borderRadius: '20px',
          border: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          animation: 'fadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards'
        }}>
          {/* Header */}
          <div style={{
            background: 'var(--accent-gradient)',
            padding: '1.25rem',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 10px #10b981'
              }}></div>
              <div>
                <h4 style={{ fontWeight: 700, fontSize: '0.95rem', margin: 0 }}>Umesh's Assistant</h4>
                <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>Recruiter Support Bot</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#ffffff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center'
              }}
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div style={{
            flexGrow: 1,
            padding: '1.25rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            backgroundColor: 'var(--bg-secondary)',
            transition: 'background-color var(--transition-normal)'
          }}>
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '80%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '2px'
                }}
              >
                <div style={{
                  padding: '0.75rem 1rem',
                  borderRadius: msg.sender === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                  backgroundColor: msg.sender === 'user' ? 'var(--accent)' : 'var(--bg-tertiary)',
                  color: msg.sender === 'user' ? '#ffffff' : 'var(--text-primary)',
                  fontSize: '0.88rem',
                  lineHeight: 1.4,
                  whiteSpace: 'pre-line',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.02)'
                }}>
                  {msg.text}
                </div>
                <span style={{
                  fontSize: '0.65rem',
                  color: 'var(--text-muted)',
                  alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                  margin: '2px 4px 0 4px'
                }}>
                  {msg.time}
                </span>
              </div>
            ))}

            {isTyping && (
              <div style={{ alignSelf: 'flex-start', display: 'flex', gap: '4px', padding: '0.5rem 1rem', borderRadius: '18px', backgroundColor: 'var(--bg-tertiary)' }}>
                <span className="typing-dot" style={{ animationDelay: '0ms' }}></span>
                <span className="typing-dot" style={{ animationDelay: '200ms' }}></span>
                <span className="typing-dot" style={{ animationDelay: '400ms' }}></span>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Click Questions */}
          <div style={{
            padding: '0.75rem',
            display: 'flex',
            gap: '0.5rem',
            overflowX: 'auto',
            backgroundColor: 'var(--bg-primary)',
            borderTop: '1px solid var(--border-color)',
            scrollbarWidth: 'none',
            whiteSpace: 'nowrap'
          }}>
            {quickQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--accent)',
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent)';
                  e.currentTarget.style.backgroundColor = 'rgba(var(--accent-rgb), 0.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-color)';
                  e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
                }}
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Panel */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(inputValue);
            }}
            style={{
              display: 'flex',
              padding: '0.75rem',
              backgroundColor: 'var(--bg-secondary)',
              borderTop: '1px solid var(--border-color)',
              gap: '0.5rem'
            }}
          >
            <input
              type="text"
              placeholder="Ask me something..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
              style={{
                flexGrow: 1,
                padding: '0.5rem 1rem',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
            <button
              type="submit"
              disabled={isTyping}
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: 'var(--accent)',
                border: 'none',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      {/* Typing animation styling inside React JSX */}
      <style>{`
        .typing-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--text-muted);
          display: inline-block;
          animation: chatBounce 1.4s infinite ease-in-out both;
        }
        @keyframes chatBounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
