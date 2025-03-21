
import React from 'react';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

const SocialLinksTab = () => {
  return (
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
          href="mailto:sarthakrawat525@gmail.com" 
          className="bg-system-lightgray/20 hover:bg-system-lightgray/40 p-4 rounded flex items-center"
        >
          <Mail className="w-8 h-8 mr-4 text-terminal-accent" />
          <div>
            <div className="font-bold">Email</div>
            <div className="text-sm text-terminal-muted">sarthakrawat525@gmail.com</div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default SocialLinksTab;
