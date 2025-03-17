import React from 'react';
import { useSystem } from '../context/SystemContext';
import { playSound } from '../utils/sounds';
import { 
  Terminal, 
  FolderOpen, 
  Cpu, 
  Settings, 
  Map, 
  Mail,
  Activity
} from 'lucide-react';
import Terminal as TerminalComponent from './Terminal';
import FileSystem from './FileSystem';
import ProcessManager from './ProcessManager';
import SystemConfig from './SystemConfig';
import MemoryMap from './MemoryMap';
import ContactMe from './ContactMe';
import ActivityLogs from './ActivityLogs';

const Desktop = () => {
  const { apps, openApp } = useSystem();
  
  const handleOpenApp = (app: string) => {
    playSound('CLICK');
    openApp(app as any);
  };
  
  return (
    <div className="desktop-container h-screen w-screen overflow-hidden bg-system-darkgray relative">
      {/* Desktop background */}
      <div className="absolute inset-0 bg-gradient-to-br from-system-darkgray to-system-gray z-0">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>
      
      {/* Desktop icons */}
      <div className="desktop-icons absolute top-4 left-4 space-y-6 z-10">
        <div 
          className="desktop-icon"
          onClick={() => handleOpenApp('terminal')}
          style={{ '--index': 0 } as React.CSSProperties}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-terminal-background rounded-md mb-1">
            <Terminal className="w-8 h-8 text-terminal-accent" />
          </div>
          <span className="text-white drop-shadow-md">Terminal</span>
        </div>
        
        <div 
          className="desktop-icon"
          onClick={() => handleOpenApp('fileExplorer')}
          style={{ '--index': 1 } as React.CSSProperties}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-terminal-background rounded-md mb-1">
            <FolderOpen className="w-8 h-8 text-terminal-warning" />
          </div>
          <span className="text-white drop-shadow-md">Files</span>
        </div>
        
        <div 
          className="desktop-icon"
          onClick={() => handleOpenApp('processManager')}
          style={{ '--index': 2 } as React.CSSProperties}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-terminal-background rounded-md mb-1">
            <Cpu className="w-8 h-8 text-terminal-success" />
          </div>
          <span className="text-white drop-shadow-md">Processes</span>
        </div>
        
        <div 
          className="desktop-icon"
          onClick={() => handleOpenApp('sysConfig')}
          style={{ '--index': 3 } as React.CSSProperties}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-terminal-background rounded-md mb-1">
            <Settings className="w-8 h-8 text-terminal-text" />
          </div>
          <span className="text-white drop-shadow-md">Settings</span>
        </div>
        
        <div 
          className="desktop-icon"
          onClick={() => handleOpenApp('memoryMap')}
          style={{ '--index': 4 } as React.CSSProperties}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-terminal-background rounded-md mb-1">
            <Map className="w-8 h-8 text-terminal-error" />
          </div>
          <span className="text-white drop-shadow-md">Memory</span>
        </div>
        
        <div 
          className="desktop-icon"
          onClick={() => handleOpenApp('contactMe')}
          style={{ '--index': 5 } as React.CSSProperties}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-terminal-background rounded-md mb-1">
            <Mail className="w-8 h-8 text-terminal-muted" />
          </div>
          <span className="text-white drop-shadow-md">Contact</span>
        </div>
        
        <div 
          className="desktop-icon"
          onClick={() => handleOpenApp('activityLogs')}
          style={{ '--index': 6 } as React.CSSProperties}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-terminal-background rounded-md mb-1">
            <Activity className="w-8 h-8 text-terminal-accent" />
          </div>
          <span className="text-white drop-shadow-md">Activity</span>
        </div>
      </div>
      
      {/* Application windows */}
      <div className="app-windows absolute inset-0 flex items-center justify-center z-20">
        {apps.terminal === 'open' && (
          <div className="window-appear" style={{ '--index': 0 } as React.CSSProperties}>
            <TerminalComponent />
          </div>
        )}
        
        {apps.fileExplorer === 'open' && (
          <div className="window-appear" style={{ '--index': 0 } as React.CSSProperties}>
            <FileSystem />
          </div>
        )}
        
        {apps.processManager === 'open' && (
          <div className="window-appear" style={{ '--index': 0 } as React.CSSProperties}>
            <ProcessManager />
          </div>
        )}
        
        {apps.sysConfig === 'open' && (
          <div className="window-appear" style={{ '--index': 0 } as React.CSSProperties}>
            <SystemConfig />
          </div>
        )}
        
        {apps.memoryMap === 'open' && (
          <div className="window-appear" style={{ '--index': 0 } as React.CSSProperties}>
            <MemoryMap />
          </div>
        )}
        
        {apps.contactMe === 'open' && (
          <div className="window-appear" style={{ '--index': 0 } as React.CSSProperties}>
            <ContactMe />
          </div>
        )}
        
        {apps.activityLogs === 'open' && (
          <div className="window-appear" style={{ '--index': 0 } as React.CSSProperties}>
            <ActivityLogs />
          </div>
        )}
      </div>
      
      {/* Taskbar */}
      <div className="taskbar absolute bottom-0 left-0 right-0 h-12 bg-system-gray/80 backdrop-blur-md border-t border-system-lightgray/50 flex items-center px-4 z-30">
        <div className="flex space-x-2">
          {apps.terminal === 'open' && (
            <div className="w-8 h-8 bg-terminal-background rounded-md flex items-center justify-center border-b-2 border-terminal-accent">
              <Terminal className="w-5 h-5 text-terminal-accent" />
            </div>
          )}
          
          {apps.fileExplorer === 'open' && (
            <div className="w-8 h-8 bg-terminal-background rounded-md flex items-center justify-center border-b-2 border-terminal-warning">
              <FolderOpen className="w-5 h-5 text-terminal-warning" />
            </div>
          )}
          
          {apps.processManager === 'open' && (
            <div className="w-8 h-8 bg-terminal-background rounded-md flex items-center justify-center border-b-2 border-terminal-success">
              <Cpu className="w-5 h-5 text-terminal-success" />
            </div>
          )}
          
          {apps.sysConfig === 'open' && (
            <div className="w-8 h-8 bg-terminal-background rounded-md flex items-center justify-center border-b-2 border-terminal-text">
              <Settings className="w-5 h-5 text-terminal-text" />
            </div>
          )}
          
          {apps.memoryMap === 'open' && (
            <div className="w-8 h-8 bg-terminal-background rounded-md flex items-center justify-center border-b-2 border-terminal-error">
              <Map className="w-5 h-5 text-terminal-error" />
            </div>
          )}
          
          {apps.contactMe === 'open' && (
            <div className="w-8 h-8 bg-terminal-background rounded-md flex items-center justify-center border-b-2 border-terminal-muted">
              <Mail className="w-5 h-5 text-terminal-muted" />
            </div>
          )}
          
          {apps.activityLogs === 'open' && (
            <div className="w-8 h-8 bg-terminal-background rounded-md flex items-center justify-center border-b-2 border-terminal-accent">
              <Activity className="w-5 h-5 text-terminal-accent" />
            </div>
          )}
        </div>
        
        <div className="ml-auto text-xs text-terminal-muted">
          ResumeOS v3.5.2 • {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default Desktop;
