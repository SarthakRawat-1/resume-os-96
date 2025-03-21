
import React from 'react';
import { useSystem } from '../../context/SystemContext';
import { X, Minus, Square, Mail, Linkedin, Send } from 'lucide-react';

interface ContactWindowProps {
  children: React.ReactNode;
  activeTab: 'links' | 'message';
  setActiveTab: (tab: 'links' | 'message') => void;
}

const ContactWindow = ({ children, activeTab, setActiveTab }: ContactWindowProps) => {
  const { closeApp, minimizeApp } = useSystem();

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
          {children}
        </div>
      </div>
    </div>
  );
};

export default ContactWindow;
