
import React from 'react';
import { X, Minus, Square, Folder } from 'lucide-react';

interface FileExplorerWindowProps {
  children: React.ReactNode;
  closeApp: () => void;
  minimizeApp: () => void;
}

const FileExplorerWindow = ({ children, closeApp, minimizeApp }: FileExplorerWindowProps) => {
  return (
    <div className="terminal-window w-full max-w-4xl mx-auto h-full max-h-[80vh] flex flex-col">
      <div className="terminal-header">
        <div className="flex space-x-2">
          <button 
            className="window-button window-close flex items-center justify-center"
            onClick={closeApp}
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            className="window-button window-minimize"
            onClick={minimizeApp}
          >
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button className="window-button window-maximize">
            <Square className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="terminal-title flex items-center">
          <Folder className="w-4 h-4 mr-2" /> File Explorer
        </div>
        <div className="w-16"></div> {/* Spacer for symmetry */}
      </div>
      
      {children}
    </div>
  );
};

export default FileExplorerWindow;
