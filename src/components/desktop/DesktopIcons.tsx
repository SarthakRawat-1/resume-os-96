
import React from 'react';
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

interface DesktopIconsProps {
  onOpenApp: (app: string) => void;
}

const DesktopIcons = ({ onOpenApp }: DesktopIconsProps) => {
  const iconData = [
    { id: 'terminal', label: 'Terminal', icon: <Terminal className="w-8 h-8 text-terminal-accent" /> },
    { id: 'readme', label: 'README', icon: <BookOpen className="w-8 h-8 text-white" /> },
    { id: 'fileExplorer', label: 'Files', icon: <FolderOpen className="w-8 h-8 text-terminal-warning" /> },
    { id: 'processManager', label: 'Processes', icon: <Cpu className="w-8 h-8 text-terminal-success" /> },
    { id: 'sysConfig', label: 'Settings', icon: <Settings className="w-8 h-8 text-terminal-text" /> },
    { id: 'memoryMap', label: 'Memory', icon: <Map className="w-8 h-8 text-terminal-error" /> },
    { id: 'contactMe', label: 'Contact', icon: <Mail className="w-8 h-8 text-terminal-muted" /> },
    { id: 'activityLogs', label: 'Activity', icon: <Activity className="w-8 h-8 text-terminal-accent" /> },
  ];
  
  return (
    <div className="desktop-icons absolute top-4 left-4 grid grid-cols-2 gap-x-8 gap-y-6 z-10">
      {iconData.map((icon, index) => (
        <div 
          key={icon.id}
          className="desktop-icon cursor-pointer transition-all hover:scale-105"
          onClick={() => onOpenApp(icon.id)}
          style={{ '--index': index } as React.CSSProperties}
        >
          <div className="w-12 h-12 flex items-center justify-center bg-terminal-background rounded-md mb-1">
            {icon.icon}
          </div>
          <span className="text-white drop-shadow-md">{icon.label}</span>
        </div>
      ))}
    </div>
  );
};

export default DesktopIcons;
