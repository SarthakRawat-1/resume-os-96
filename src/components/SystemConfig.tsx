
import React from 'react';
import { useSystem } from '../context/SystemContext';
import { X, Minus, Square, Settings, ExternalLink, Mail, Github, Linkedin, MapPin, Clock, Code } from 'lucide-react';

const SystemConfig = () => {
  const { closeApp, minimizeApp } = useSystem();
  
  const configData = {
    personal: {
      NAME: 'John Doe',
      ROLE: 'Systems Engineer',
      LOCATION: 'San Francisco, CA',
      EMAIL: 'john.doe@example.com',
      GITHUB: 'github.com/johndoe',
      LINKEDIN: 'linkedin.com/in/johndoe',
      AVAILABILITY: 'Available for hire',
    },
    preferences: {
      PREFERRED_STACK: ['C/C++', 'Rust', 'Assembly'],
      INTERESTS: ['Kernel Development', 'Embedded Systems', 'Performance Optimization'],
      WORKING_HOURS: '9:00 AM - 6:00 PM PST',
      RESPONSE_TIME: 'Within 24 hours',
    },
    system: {
      VERSION: '3.5.2',
      LAST_UPDATED: '2023-09-15',
      KERNEL: 'Experience v4.2.1',
      ARCHITECTURE: 'Full-Stack x64',
    }
  };

  return (
    <div className="terminal-window w-full max-w-3xl mx-auto h-full max-h-[80vh] flex flex-col">
      <div className="terminal-header">
        <div className="flex space-x-2">
          <button 
            className="window-button window-close flex items-center justify-center"
            onClick={() => closeApp('sysConfig')}
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            className="window-button window-minimize"
            onClick={() => minimizeApp('sysConfig')}
          >
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button className="window-button window-maximize">
            <Square className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="terminal-title flex items-center">
          <Settings className="w-4 h-4 mr-2" /> System Configuration
        </div>
        <div className="w-16"></div> {/* Spacer for symmetry */}
      </div>
      
      <div className="flex-1 overflow-auto p-6">
        <h2 className="text-terminal-accent font-bold text-lg mb-6">/etc/resume.conf</h2>
        
        <div className="grid grid-cols-1 gap-6">
          {/* Personal Information */}
          <div className="glass-card p-4">
            <h3 className="text-terminal-warning font-mono font-bold mb-4 border-b border-system-lightgray pb-2">
              # Personal Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-4">
                <div>
                  <div className="text-terminal-muted font-mono text-sm">NAME=</div>
                  <div className="text-terminal-text font-bold">{configData.personal.NAME}</div>
                </div>
                
                <div>
                  <div className="text-terminal-muted font-mono text-sm">ROLE=</div>
                  <div className="text-terminal-text">{configData.personal.ROLE}</div>
                </div>
                
                <div>
                  <div className="text-terminal-muted font-mono text-sm">LOCATION=</div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-terminal-error" />
                    <span>{configData.personal.LOCATION}</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-terminal-muted font-mono text-sm">AVAILABILITY=</div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-terminal-success" />
                    <span>{configData.personal.AVAILABILITY}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-4">
                <div>
                  <div className="text-terminal-muted font-mono text-sm">EMAIL=</div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-terminal-accent" />
                    <a 
                      href={`mailto:${configData.personal.EMAIL}`}
                      className="text-terminal-accent hover:underline flex items-center"
                    >
                      {configData.personal.EMAIL}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
                
                <div>
                  <div className="text-terminal-muted font-mono text-sm">GITHUB=</div>
                  <div className="flex items-center">
                    <Github className="w-4 h-4 mr-2 text-terminal-text" />
                    <a 
                      href={`https://${configData.personal.GITHUB}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-terminal-accent hover:underline flex items-center"
                    >
                      {configData.personal.GITHUB}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
                
                <div>
                  <div className="text-terminal-muted font-mono text-sm">LINKEDIN=</div>
                  <div className="flex items-center">
                    <Linkedin className="w-4 h-4 mr-2 text-terminal-accent" />
                    <a 
                      href={`https://${configData.personal.LINKEDIN}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-terminal-accent hover:underline flex items-center"
                    >
                      {configData.personal.LINKEDIN}
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Preferences */}
          <div className="glass-card p-4">
            <h3 className="text-terminal-warning font-mono font-bold mb-4 border-b border-system-lightgray pb-2">
              # Preferences
            </h3>
            
            <div className="space-y-4">
              <div>
                <div className="text-terminal-muted font-mono text-sm">PREFERRED_STACK=</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {configData.preferences.PREFERRED_STACK.map((tech, index) => (
                    <div key={index} className="bg-system-darkgray px-3 py-1 rounded-full flex items-center">
                      <Code className="w-3 h-3 mr-2 text-terminal-accent" />
                      <span>{tech}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <div className="text-terminal-muted font-mono text-sm">INTERESTS=</div>
                <div className="flex flex-wrap gap-2 mt-1">
                  {configData.preferences.INTERESTS.map((interest, index) => (
                    <div key={index} className="bg-system-darkgray px-3 py-1 rounded-full">
                      {interest}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-terminal-muted font-mono text-sm">WORKING_HOURS=</div>
                  <div className="text-terminal-text">{configData.preferences.WORKING_HOURS}</div>
                </div>
                
                <div>
                  <div className="text-terminal-muted font-mono text-sm">RESPONSE_TIME=</div>
                  <div className="text-terminal-text">{configData.preferences.RESPONSE_TIME}</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* System Information */}
          <div className="glass-card p-4">
            <h3 className="text-terminal-warning font-mono font-bold mb-4 border-b border-system-lightgray pb-2">
              # System Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-terminal-muted font-mono text-sm">VERSION=</div>
                <div className="text-terminal-text">{configData.system.VERSION}</div>
              </div>
              
              <div>
                <div className="text-terminal-muted font-mono text-sm">LAST_UPDATED=</div>
                <div className="text-terminal-text">{configData.system.LAST_UPDATED}</div>
              </div>
              
              <div>
                <div className="text-terminal-muted font-mono text-sm">KERNEL=</div>
                <div className="text-terminal-text">{configData.system.KERNEL}</div>
              </div>
              
              <div>
                <div className="text-terminal-muted font-mono text-sm">ARCHITECTURE=</div>
                <div className="text-terminal-text">{configData.system.ARCHITECTURE}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemConfig;
