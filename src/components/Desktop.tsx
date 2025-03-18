
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
  Activity,
  BookOpen
} from 'lucide-react';
import TerminalComponent from './Terminal';
import FileSystem from './FileSystem';
import ProcessManager from './ProcessManager';
import SystemConfig from './SystemConfig';
import MemoryMap from './MemoryMap';
import ContactMe from './ContactMe';
import ActivityLogs from './ActivityLogs';
import ReadmeViewer from './ReadmeViewer';

const Desktop = () => {
  const { apps, openApp } = useSystem();
  
  const handleOpenApp = (app: string) => {
    console.log(`Attempting to open app: ${app}`);
    playSound('CLICK');
    openApp(app as any);
  };
  
  return (
    <div className="desktop-container h-screen w-screen overflow-hidden bg-system-darkgray relative">
      {/* Desktop background */}
      <div className="absolute inset-0 bg-gradient-to-br from-system-darkgray to-system-gray z-0 min-h-full">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Shogun text in background - Adjusted position with py-16 to move it closer to center */}
        <div className="absolute flex items-center justify-center w-full h-full pointer-events-none py-16">
          <h1 className="text-[20vw] font-bold text-white/5 select-none tracking-widest">
            SHOGUN
          </h1>
        </div>
      </div>
      
      {/* Desktop icons in a grid format */}
      <div className="desktop-icons absolute top-4 left-4 grid grid-cols-2 gap-x-8 gap-y-6 z-10">
        <div 
          className="desktop-icon cursor-pointer transition-all hover:scale-105"
          onClick={() => handleOpenApp('terminal')}
          style={{ '--index': 0 } as React.CSSProperties}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-terminal-background rounded-md mb-1">
            <Terminal className="w-8 h-8 text-terminal-accent" />
          </div>
          <span className="text-white drop-shadow-md">Terminal</span>
        </div>
        
        <div 
          className="desktop-icon cursor-pointer transition-all hover:scale-105"
          onClick={() => handleOpenApp('readme')}
          style={{ '--index': 1 } as React.CSSProperties}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-terminal-background rounded-md mb-1">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <span className="text-white drop-shadow-md">README</span>
        </div>
        
        <div 
          className="desktop-icon cursor-pointer transition-all hover:scale-105"
          onClick={() => handleOpenApp('fileExplorer')}
          style={{ '--index': 2 } as React.CSSProperties}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-terminal-background rounded-md mb-1">
            <FolderOpen className="w-8 h-8 text-terminal-warning" />
          </div>
          <span className="text-white drop-shadow-md">Files</span>
        </div>
        
        <div 
          className="desktop-icon cursor-pointer transition-all hover:scale-105"
          onClick={() => handleOpenApp('processManager')}
          style={{ '--index': 3 } as React.CSSProperties}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-terminal-background rounded-md mb-1">
            <Cpu className="w-8 h-8 text-terminal-success" />
          </div>
          <span className="text-white drop-shadow-md">Processes</span>
        </div>
        
        <div 
          className="desktop-icon cursor-pointer transition-all hover:scale-105"
          onClick={() => handleOpenApp('sysConfig')}
          style={{ '--index': 4 } as React.CSSProperties}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-terminal-background rounded-md mb-1">
            <Settings className="w-8 h-8 text-terminal-text" />
          </div>
          <span className="text-white drop-shadow-md">Settings</span>
        </div>
        
        <div 
          className="desktop-icon cursor-pointer transition-all hover:scale-105"
          onClick={() => handleOpenApp('memoryMap')}
          style={{ '--index': 5 } as React.CSSProperties}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-terminal-background rounded-md mb-1">
            <Map className="w-8 h-8 text-terminal-error" />
          </div>
          <span className="text-white drop-shadow-md">Memory</span>
        </div>
        
        <div 
          className="desktop-icon cursor-pointer transition-all hover:scale-105"
          onClick={() => handleOpenApp('contactMe')}
          style={{ '--index': 6 } as React.CSSProperties}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-terminal-background rounded-md mb-1">
            <Mail className="w-8 h-8 text-terminal-muted" />
          </div>
          <span className="text-white drop-shadow-md">Contact</span>
        </div>
        
        <div 
          className="desktop-icon cursor-pointer transition-all hover:scale-105"
          onClick={() => handleOpenApp('activityLogs')}
          style={{ '--index': 7 } as React.CSSProperties}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-terminal-background rounded-md mb-1">
            <Activity className="w-8 h-8 text-terminal-accent" />
          </div>
          <span className="text-white drop-shadow-md">Activity</span>
        </div>
      </div>
      
      {/* Application windows - Modified to be full screen */}
      <div className="app-windows">
        {apps.terminal === 'open' && (
          <div className="fixed inset-0 flex items-center justify-center z-20 bg-system-darkgray/90 backdrop-blur-sm">
            <div className="w-full h-full p-4 flex items-center justify-center">
              <TerminalComponent />
            </div>
          </div>
        )}
        
        {apps.fileExplorer === 'open' && (
          <div className="fixed inset-0 flex items-center justify-center z-20 bg-system-darkgray/90 backdrop-blur-sm">
            <div className="w-full h-full p-4 flex items-center justify-center">
              <FileSystem />
            </div>
          </div>
        )}
        
        {apps.processManager === 'open' && (
          <div className="fixed inset-0 flex items-center justify-center z-20 bg-system-darkgray/90 backdrop-blur-sm">
            <div className="w-full h-full p-4 flex items-center justify-center">
              <ProcessManager />
            </div>
          </div>
        )}
        
        {apps.sysConfig === 'open' && (
          <div className="fixed inset-0 flex items-center justify-center z-20 bg-system-darkgray/90 backdrop-blur-sm">
            <div className="w-full h-full p-4 flex items-center justify-center">
              <SystemConfig />
            </div>
          </div>
        )}
        
        {apps.memoryMap === 'open' && (
          <div className="fixed inset-0 flex items-center justify-center z-20 bg-system-darkgray/90 backdrop-blur-sm">
            <div className="w-full h-full p-4 flex items-center justify-center">
              <MemoryMap />
            </div>
          </div>
        )}
        
        {apps.contactMe === 'open' && (
          <div className="fixed inset-0 flex items-center justify-center z-20 bg-system-darkgray/90 backdrop-blur-sm">
            <div className="w-full h-full p-4 flex items-center justify-center">
              <ContactMe />
            </div>
          </div>
        )}
        
        {apps.activityLogs === 'open' && (
          <div className="fixed inset-0 flex items-center justify-center z-20 bg-system-darkgray/90 backdrop-blur-sm">
            <div className="w-full h-full p-4 flex items-center justify-center">
              <ActivityLogs />
            </div>
          </div>
        )}
        
        {apps.readme === 'open' && (
          <div className="fixed inset-0 flex items-center justify-center z-20 bg-system-darkgray/90 backdrop-blur-sm">
            <div className="w-full h-full p-4 flex items-center justify-center">
              <ReadmeViewer />
            </div>
          </div>
        )}
      </div>
      
      {/* Taskbar */}
      <div className="taskbar fixed bottom-0 left-0 right-0 h-12 bg-system-gray/80 backdrop-blur-md border-t border-system-lightgray/50 flex items-center px-4 z-30">
        <div className="flex space-x-2">
          {apps.terminal === 'open' && (
            <div className="w-8 h-8 bg-terminal-background rounded-md flex items-center justify-center border-b-2 border-terminal-accent">
              <Terminal className="w-5 h-5 text-terminal-accent" />
            </div>
          )}
          
          {apps.readme === 'open' && (
            <div className="w-8 h-8 bg-terminal-background rounded-md flex items-center justify-center border-b-2 border-white">
              <BookOpen className="w-5 h-5 text-white" />
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
