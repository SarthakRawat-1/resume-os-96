
import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { X, Minus, Square, Mail, Github, Linkedin, Twitter, Send, ExternalLink, ArrowRight } from 'lucide-react';

const ContactMe = () => {
  const { closeApp, minimizeApp } = useSystem();
  const [activeTab, setActiveTab] = useState('social');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<null | 'sending' | 'success' | 'error'>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate sending email
    setTimeout(() => {
      setFormStatus('success');
      // Reset form after success
      setTimeout(() => {
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        setFormStatus(null);
      }, 3000);
    }, 1500);
  };

  const socialLinks = [
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      url: 'mailto:user@example.com',
      username: 'user@example.com',
    },
    {
      name: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      url: 'https://github.com/username',
      username: 'github.com/username',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      url: 'https://linkedin.com/in/username',
      username: 'linkedin.com/in/username',
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      url: 'https://twitter.com/username',
      username: 'twitter.com/username',
    },
  ];

  return (
    <div className="terminal-window w-full max-w-3xl mx-auto h-full max-h-[80vh] flex flex-col">
      <div className="terminal-header">
        <div className="flex space-x-2">
          <button 
            className="window-button window-close flex items-center justify-center"
            onClick={() => closeApp('contactMe')}
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            className="window-button window-minimize"
            onClick={() => minimizeApp('contactMe')}
          >
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button className="window-button window-maximize">
            <Square className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="terminal-title flex items-center">
          <Mail className="w-4 h-4 mr-2" /> Contact Me
        </div>
        <div className="w-16"></div> {/* Spacer for symmetry */}
      </div>
      
      <div className="flex-1 overflow-auto p-6">
        <div className="mb-6 flex border-b border-system-lightgray">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'social' ? 'text-terminal-accent border-b-2 border-terminal-accent' : 'text-terminal-muted'}`}
            onClick={() => setActiveTab('social')}
          >
            Social Links
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'email' ? 'text-terminal-accent border-b-2 border-terminal-accent' : 'text-terminal-muted'}`}
            onClick={() => setActiveTab('email')}
          >
            Send Message
          </button>
        </div>
        
        {activeTab === 'social' && (
          <div className="space-y-8 animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Connect With Me</h2>
            
            <div className="grid gap-4 sm:grid-cols-2">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-4 flex items-center space-x-4 transition-all hover:bg-system-gray/40 group"
                >
                  <div className="w-12 h-12 rounded-full bg-system-gray/30 flex items-center justify-center text-terminal-accent">
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{link.name}</div>
                    <div className="text-sm text-terminal-muted flex items-center">
                      {link.username}
                      <ExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-terminal-muted opacity-0 group-hover:opacity-100 group-hover:transform group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>
            
            <div className="glass-card p-4 mt-6">
              <div className="text-sm text-terminal-muted">
                <p className="mb-2">💡 <strong>Terminal Tip:</strong> You can also access contact information via the terminal!</p>
                <div className="bg-terminal-background font-mono p-2 rounded">
                  <span className="text-terminal-success">$</span> cat /home/user/contact.txt
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'email' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-bold mb-4">Send Me a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-system-gray/20 border border-system-lightgray/50 rounded-md focus:outline-none focus:ring-1 focus:ring-terminal-accent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Your Email</label>
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-system-gray/20 border border-system-lightgray/50 rounded-md focus:outline-none focus:ring-1 focus:ring-terminal-accent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formState.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 bg-system-gray/20 border border-system-lightgray/50 rounded-md focus:outline-none focus:ring-1 focus:ring-terminal-accent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-3 py-2 bg-system-gray/20 border border-system-lightgray/50 rounded-md focus:outline-none focus:ring-1 focus:ring-terminal-accent"
                />
              </div>
              
              <button
                type="submit"
                disabled={formStatus === 'sending'}
                className="px-4 py-2 bg-terminal-accent text-white rounded-md flex items-center justify-center transition-colors hover:bg-terminal-accent/80 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {formStatus === 'sending' ? (
                  <span className="flex items-center">
                    <span className="animate-spin mr-2">⏳</span> Sending...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="w-4 h-4 mr-2" /> Send Message
                  </span>
                )}
              </button>
              
              {formStatus === 'success' && (
                <div className="p-3 bg-terminal-success/20 border border-terminal-success/30 rounded-md text-terminal-success">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="p-3 bg-terminal-error/20 border border-terminal-error/30 rounded-md text-terminal-error">
                  There was an error sending your message. Please try again.
                </div>
              )}
            </form>
            
            <div className="mt-6 text-sm text-terminal-muted">
              <p>Note: This is a demo contact form. In a real application, this would be connected to a backend service.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactMe;
