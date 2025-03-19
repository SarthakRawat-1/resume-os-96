
import React from 'react';
import { useSystem } from '../context/SystemContext';
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
    openApp(app as any);
  };
  
  // Helper function to apply the appropriate animation classes based on app state
  const getAnimationClasses = (appState: string) => {
    if (appState === 'open') {
      return {
        overlay: 'animate-overlay-show',
        window: 'animate-window-appear'
      };
    } else if (appState === 'closing') {
      return {
        overlay: 'animate-overlay-hide',
        window: 'animate-window-disappear'
      };
    }
    return {
      overlay: '',
      window: ''
    };
  };
  
  return (
    <div className="desktop-container h-screen w-screen overflow-hidden bg-system-darkgray relative">
      {/* Desktop background */}
      <div className="absolute inset-0 bg-gradient-to-br from-system-darkgray to-system-gray z-0 min-h-full">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        
        {/* Shogun text in background */}
        <div className="absolute flex items-center justify-center w-full h-full pointer-events-none py-12">
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
      
      {/* Application windows - Modified with animations */}
      <div className="app-windows">
        {(apps.terminal === 'open' || apps.terminal === 'closing') && (
          <div className={`fixed inset-0 flex items-center justify-center z-20 bg-system-darkgray/90 backdrop-blur-sm ${getAnimationClasses(apps.terminal).overlay}`}>
            <div className={`w-full h-full p-4 flex items-center justify-center ${getAnimationClasses(apps.terminal).window}`}>
              <TerminalComponent />
            </div>
          </div>
        )}
        
        {(apps.fileExplorer === 'open' || apps.fileExplorer === 'closing') && (
          <div className={`fixed inset-0 flex items-center justify-center z-20 bg-system-darkgray/90 backdrop-blur-sm ${getAnimationClasses(apps.fileExplorer).overlay}`}>
            <div className={`w-full h-full p-4 flex items-center justify-center ${getAnimationClasses(apps.fileExplorer).window}`}>
              <FileSystem />
            </div>
          </div>
        )}
        
        {(apps.processManager === 'open' || apps.processManager === 'closing') && (
          <div className={`fixed inset-0 flex items-center justify-center z-20 bg-system-darkgray/90 backdrop-blur-sm ${getAnimationClasses(apps.processManager).overlay}`}>
            <div className={`w-full h-full p-4 flex items-center justify-center ${getAnimationClasses(apps.processManager).window}`}>
              <ProcessManager />
            </div>
          </div>
        )}
        
        {(apps.sysConfig === 'open' || apps.sysConfig === 'closing') && (
          <div className={`fixed inset-0 flex items-center justify-center z-20 bg-system-darkgray/90 backdrop-blur-sm ${getAnimationClasses(apps.sysConfig).overlay}`}>
            <div className={`w-full h-full p-4 flex items-center justify-center ${getAnimationClasses(apps.sysConfig).window}`}>
              <SystemConfig />
            </div>
          </div>
        )}
        
        {(apps.memoryMap === 'open' || apps.memoryMap === 'closing') && (
          <div className={`fixed inset-0 flex items-center justify-center z-20 bg-system-darkgray/90 backdrop-blur-sm ${getAnimationClasses(apps.memoryMap).overlay}`}>
            <div className={`w-full h-full p-4 flex items-center justify-center ${getAnimationClasses(apps.memoryMap).window}`}>
              <MemoryMap />
            </div>
          </div>
        )}
        
        {(apps.contactMe === 'open' || apps.contactMe === 'closing') && (
          <div className={`fixed inset-0 flex items-center justify-center z-20 bg-system-darkgray/90 backdrop-blur-sm ${getAnimationClasses(apps.contactMe).overlay}`}>
            <div className={`w-full h-full p-4 flex items-center justify-center ${getAnimationClasses(apps.contactMe).window}`}>
              <ContactMe />
            </div>
          </div>
        )}
        
        {(apps.activityLogs === 'open' || apps.activityLogs === 'closing') && (
          <div className={`fixed inset-0 flex items-center justify-center z-20 bg-system-darkgray/90 backdrop-blur-sm ${getAnimationClasses(apps.activityLogs).overlay}`}>
            <div className={`w-full h-full p-4 flex items-center justify-center ${getAnimationClasses(apps.activityLogs).window}`}>
              <ActivityLogs />
            </div>
          </div>
        )}
        
        {(apps.readme === 'open' || apps.readme === 'closing') && (
          <div className={`fixed inset-0 flex items-center justify-center z-20 bg-system-darkgray/90 backdrop-blur-sm ${getAnimationClasses(apps.readme).overlay}`}>
            <div className={`w-full h-full p-4 flex items-center justify-center ${getAnimationClasses(apps.readme).window}`}>
              <ReadmeViewer />
            </div>
          </div>
        )}
      </div>
      
      {/* Taskbar */}
      <div className="taskbar fixed bottom-0 left-0 right-0 h-12 bg-system-gray/80 backdrop-blur-md border-t border-system-lightgray/50 flex items-center px-4 z-30">
        <div className="flex space-x-2">
          {apps.terminal === 'open' && (
            <div className="w-8 h-8 bg-terminal-background rounded-md flex items-center justify-center border-b-2 border-terminal-accent animate-fade-in-up" style={{ animationDelay: '50ms' }}>
              <Terminal className="w-5 h-5 text-terminal-accent" />
            </div>
          )}
          
          {apps.readme === 'open' && (
            <div className="w-8 h-8 bg-terminal-background rounded-md flex items-center justify-center border-b-2 border-white animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <BookOpen className="w-5 h-5 text-white" />
            </div>
          )}
          
          {apps.fileExplorer === 'open' && (
            <div className="w-8 h-8 bg-terminal-background rounded-md flex items-center justify-center border-b-2 border-terminal-warning animate-fade-in-up" style={{ animationDelay: '150ms' }}>
              <FolderOpen className="w-5 h-5 text-terminal-warning" />
            </div>
          )}
          
          {apps.processManager === 'open' && (
            <div className="w-8 h-8 bg-terminal-background rounded-md flex items-center justify-center border-b-2 border-terminal-success animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <Cpu className="w-5 h-5 text-terminal-success" />
            </div>
          )}
          
          {apps.sysConfig === 'open' && (
            <div className="w-8 h-8 bg-terminal-background rounded-md flex items-center justify-center border-b-2 border-terminal-text animate-fade-in-up" style={{ animationDelay: '250ms' }}>
              <Settings className="w-5 h-5 text-terminal-text" />
            </div>
          )}
          
          {apps.memoryMap === 'open' && (
            <div className="w-8 h-8 bg-terminal-background rounded-md flex items-center justify-center border-b-2 border-terminal-error animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <Map className="w-5 h-5 text-terminal-error" />
            </div>
          )}
          
          {apps.contactMe === 'open' && (
            <div className="w-8 h-8 bg-terminal-background rounded-md flex items-center justify-center border-b-2 border-terminal-muted animate-fade-in-up" style={{ animationDelay: '350ms' }}>
              <Mail className="w-5 h-5 text-terminal-muted" />
            </div>
          )}
          
          {apps.activityLogs === 'open' && (
            <div className="w-8 h-8 bg-terminal-background rounded-md flex items-center justify-center border-b-2 border-terminal-accent animate-fade-in-up" style={{ animationDelay: '400ms' }}>
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
