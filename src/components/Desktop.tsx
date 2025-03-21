
import React from 'react';
import { useSystem } from '../context/SystemContext';
import DesktopIcons from './desktop/DesktopIcons';
import ApplicationWindows from './desktop/ApplicationWindows';
import Taskbar from './desktop/Taskbar';

const Desktop = () => {
  const { openApp } = useSystem();
  
  const handleOpenApp = (app: string) => {
    console.log(`Attempting to open app: ${app}`);
    openApp(app as any);
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
      
      {/* Desktop icons */}
      <DesktopIcons onOpenApp={handleOpenApp} />
      
      {/* Application windows */}
      <ApplicationWindows />
      
      {/* Taskbar */}
      <Taskbar />
    </div>
  );
};

export default Desktop;
