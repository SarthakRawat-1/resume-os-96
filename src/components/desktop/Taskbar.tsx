
import React from 'react';
import { useSystem } from '../../context/SystemContext';
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

const Taskbar = () => {
  const { apps } = useSystem();
  
  const taskbarItems = [
    { id: 'terminal', isOpen: apps.terminal === 'open', icon: <Terminal className="w-5 h-5 text-terminal-accent" />, color: 'border-terminal-accent' },
    { id: 'readme', isOpen: apps.readme === 'open', icon: <BookOpen className="w-5 h-5 text-white" />, color: 'border-white' },
    { id: 'fileExplorer', isOpen: apps.fileExplorer === 'open', icon: <FolderOpen className="w-5 h-5 text-terminal-warning" />, color: 'border-terminal-warning' },
    { id: 'processManager', isOpen: apps.processManager === 'open', icon: <Cpu className="w-5 h-5 text-terminal-success" />, color: 'border-terminal-success' },
    { id: 'sysConfig', isOpen: apps.sysConfig === 'open', icon: <Settings className="w-5 h-5 text-terminal-text" />, color: 'border-terminal-text' },
    { id: 'memoryMap', isOpen: apps.memoryMap === 'open', icon: <Map className="w-5 h-5 text-terminal-error" />, color: 'border-terminal-error' },
    { id: 'contactMe', isOpen: apps.contactMe === 'open', icon: <Mail className="w-5 h-5 text-terminal-muted" />, color: 'border-terminal-muted' },
    { id: 'activityLogs', isOpen: apps.activityLogs === 'open', icon: <Activity className="w-5 h-5 text-terminal-accent" />, color: 'border-terminal-accent' },
  ];
  
  return (
    <div className="taskbar fixed bottom-0 left-0 right-0 h-12 bg-system-gray/80 backdrop-blur-md border-t border-system-lightgray/50 flex items-center px-4 z-30">
      <div className="flex space-x-2">
        {taskbarItems.map(item => (
          item.isOpen && (
            <div 
              key={item.id}
              className={`w-8 h-8 bg-terminal-background rounded-md flex items-center justify-center border-b-2 ${item.color}`}
            >
              {item.icon}
            </div>
          )
        ))}
      </div>
      
      <div className="ml-auto text-xs text-terminal-muted">
        ResumeOS v3.5.2 • {new Date().toLocaleTimeString()}
      </div>
    </div>
  );
};

export default Taskbar;
