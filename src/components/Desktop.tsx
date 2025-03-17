
import React from 'react';
import { useSystem } from '../context/SystemContext';
import Terminal from './Terminal';
import FileSystem from './FileSystem';
import ProcessManager from './ProcessManager';
import SystemConfig from './SystemConfig';
import MemoryMap from './MemoryMap';
import ContactMe from './ContactMe';

import { 
  Terminal as TerminalIcon, 
  Folder, 
  ActivitySquare, 
  Settings, 
  MemoryStick,
  User,
  Mail
} from 'lucide-react';

const Desktop = () => {
  const { apps, openApp } = useSystem();
  
  const icons = [
    { id: 'terminal', name: 'Terminal', icon: <TerminalIcon className="w-10 h-10 mb-2" /> },
    { id: 'fileExplorer', name: 'Files', icon: <Folder className="w-10 h-10 mb-2" /> },
    { id: 'processManager', name: 'Processes', icon: <ActivitySquare className="w-10 h-10 mb-2" /> },
    { id: 'sysConfig', name: 'Config', icon: <Settings className="w-10 h-10 mb-2" /> },
    { id: 'memoryMap', name: 'Memory', icon: <MemoryStick className="w-10 h-10 mb-2" /> },
    { id: 'contactMe', name: 'Contact', icon: <Mail className="w-10 h-10 mb-2" /> },
  ];

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-b from-system-darkgray to-black relative">
      {/* Desktop icons */}
      <div className="absolute top-4 left-4 space-y-6">
        {icons.map((icon, index) => (
          <div 
            key={icon.id}
            className="desktop-icon window-appear"
            style={{ '--index': index } as React.CSSProperties}
            onClick={() => openApp(icon.id as keyof typeof apps)}
          >
            {icon.icon}
            <span>{icon.name}</span>
          </div>
        ))}
      </div>
      
      {/* Clock */}
      <div className="absolute top-4 right-4 text-white/80 text-sm">
        <Clock />
      </div>
      
      {/* Active apps */}
      <div className="flex items-center justify-center min-h-screen p-4">
        {apps.terminal === 'open' && <Terminal />}
        {apps.fileExplorer === 'open' && <FileSystem />}
        {apps.processManager === 'open' && <ProcessManager />}
        {apps.sysConfig === 'open' && <SystemConfig />}
        {apps.memoryMap === 'open' && <MemoryMap />}
        {apps.contactMe === 'open' && <ContactMe />}
        
        {Object.values(apps).every(app => app !== 'open') && (
          <div className="text-center animate-fade-in-up">
            <User className="w-20 h-20 mx-auto mb-4 text-terminal-accent opacity-50" />
            <h1 className="text-2xl font-bold mb-2">Welcome to ResumeOS</h1>
            <p className="text-terminal-muted mb-6">Click on any icon to get started</p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {icons.map((icon, index) => (
                <button 
                  key={icon.id}
                  className="flex items-center px-4 py-2 bg-system-gray/50 hover:bg-system-gray rounded-md transition-colors"
                  onClick={() => openApp(icon.id as keyof typeof apps)}
                >
                  {React.cloneElement(icon.icon, { className: 'w-5 h-5 mr-2' })}
                  <span>{icon.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      
      {/* Dock */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
        <div className="bg-system-gray/30 backdrop-blur-lg rounded-xl px-2 py-1 flex items-center space-x-1 border border-white/10">
          {icons.map((icon, index) => (
            <button 
              key={icon.id}
              className={`p-2 rounded-lg transition-all hover:bg-white/10 ${
                apps[icon.id as keyof typeof apps] === 'open' ? 'bg-white/10' : ''
              }`}
              onClick={() => openApp(icon.id as keyof typeof apps)}
            >
              {React.cloneElement(icon.icon, { className: 'w-6 h-6' })}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// Clock component
const Clock = () => {
  const [time, setTime] = React.useState(new Date());
  
  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="bg-system-gray/30 backdrop-blur-lg px-3 py-1 rounded-md border border-white/10">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
    </div>
  );
};

export default Desktop;
