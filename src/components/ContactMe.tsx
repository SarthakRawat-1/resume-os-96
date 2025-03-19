
import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { X, Minus, Square, Mail, Github, Linkedin, Twitter, Send } from 'lucide-react';

const ContactMe = () => {
  const [activeTab, setActiveTab] = useState<'links' | 'message'>('links');
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  
  const { closeApp, minimizeApp } = useSystem();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    
    // Simulate sending
    setTimeout(() => {
      setSending(false);
      setSent(true);
      
      // Reset form
      setTimeout(() => {
        setSent(false);
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div className="terminal-window w-full max-w-3xl mx-auto h-full max-h-[80vh] flex flex-col">
      <div className="terminal-header">
        <div className="flex space-x-2">
          <button 
            className="window-button window-close flex items-center justify-center"
            onClick={() => {
              closeApp('contactMe');
            }}
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            className="window-button window-minimize"
            onClick={() => {
              minimizeApp('contactMe');
            }}
          >
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            className="window-button window-maximize"
          >
            <Square className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="terminal-title flex items-center">
          <Mail className="w-4 h-4 mr-2" /> Contact Me
        </div>
        <div className="w-16"></div> {/* Spacer for symmetry */}
      </div>
      
      <div className="bg-terminal-background text-terminal-text flex-1 overflow-auto">
        <div className="flex border-b border-system-lightgray">
          <button 
            className={`px-4 py-2 flex items-center ${activeTab === 'links' ? 'bg-system-lightgray text-terminal-accent' : 'hover:bg-system-lightgray/30'}`}
            onClick={() => {
              setActiveTab('links');
            }}
          >
            <Linkedin className="w-4 h-4 mr-2" /> Social Links
          </button>
          <button 
            className={`px-4 py-2 flex items-center ${activeTab === 'message' ? 'bg-system-lightgray text-terminal-accent' : 'hover:bg-system-lightgray/30'}`}
            onClick={() => {
              setActiveTab('message');
            }}
          >
            <Send className="w-4 h-4 mr-2" /> Send Message
          </button>
        </div>
        
        <div className="p-4">
          {activeTab === 'links' ? (
            <div className="space-y-4">
              <h3 className="text-terminal-accent font-bold">Connect With Me</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a 
                  href="https://github.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-system-lightgray/20 hover:bg-system-lightgray/40 p-4 rounded flex items-center"
                >
                  <Github className="w-8 h-8 mr-4 text-terminal-accent" />
                  <div>
                    <div className="font-bold">GitHub</div>
                    <div className="text-sm text-terminal-muted">View my code repositories</div>
                  </div>
                </a>
                
                <a 
                  href="https://linkedin.com/in/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-system-lightgray/20 hover:bg-system-lightgray/40 p-4 rounded flex items-center"
                >
                  <Linkedin className="w-8 h-8 mr-4 text-terminal-accent" />
                  <div>
                    <div className="font-bold">LinkedIn</div>
                    <div className="text-sm text-terminal-muted">View my professional profile</div>
                  </div>
                </a>
                
                <a 
                  href="https://twitter.com/yourusername" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-system-lightgray/20 hover:bg-system-lightgray/40 p-4 rounded flex items-center"
                >
                  <Twitter className="w-8 h-8 mr-4 text-terminal-accent" />
                  <div>
                    <div className="font-bold">Twitter</div>
                    <div className="text-sm text-terminal-muted">Follow me for updates</div>
                  </div>
                </a>
                
                <a 
                  href="mailto:your.email@example.com" 
                  className="bg-system-lightgray/20 hover:bg-system-lightgray/40 p-4 rounded flex items-center"
                >
                  <Mail className="w-8 h-8 mr-4 text-terminal-accent" />
                  <div>
                    <div className="font-bold">Email</div>
                    <div className="text-sm text-terminal-muted">your.email@example.com</div>
                  </div>
                </a>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-terminal-accent font-bold">Send Me a Message</h3>
              
              {sent ? (
                <div className="bg-terminal-success/20 border border-terminal-success text-terminal-success p-4 rounded animate-fade-in">
                  Message sent successfully! I'll get back to you soon.
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-transparent border border-system-lightgray rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-terminal-accent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-transparent border border-system-lightgray rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-terminal-accent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-transparent border border-system-lightgray rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-terminal-accent"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full bg-transparent border border-system-lightgray rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-terminal-accent"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    disabled={sending}
                    className="bg-terminal-accent text-white px-4 py-2 rounded flex items-center justify-center hover:bg-terminal-accent/80 transition-colors"
                  >
                    {sending ? (
                      <>Sending<span className="animate-pulse">...</span></>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" /> Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactMe;
