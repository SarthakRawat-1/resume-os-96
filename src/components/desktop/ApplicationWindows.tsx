
import React from 'react';
import { useSystem } from '../../context/SystemContext';
import TerminalComponent from '../Terminal';
import FileSystem from '../FileSystem';
import ProcessManager from '../ProcessManager';
import SystemConfig from '../SystemConfig';
import MemoryMap from '../MemoryMap';
import ContactMe from '../ContactMe';
import ActivityLogs from '../ActivityLogs';
import ReadmeViewer from '../ReadmeViewer';

const ApplicationWindows = () => {
  const { apps } = useSystem();
  
  return (
    <div className="app-windows">
      {apps.terminal === 'open' && (
        <AppWindow>
          <TerminalComponent />
        </AppWindow>
      )}
      
      {apps.fileExplorer === 'open' && (
        <AppWindow>
          <FileSystem />
        </AppWindow>
      )}
      
      {apps.processManager === 'open' && (
        <AppWindow>
          <ProcessManager />
        </AppWindow>
      )}
      
      {apps.sysConfig === 'open' && (
        <AppWindow>
          <SystemConfig />
        </AppWindow>
      )}
      
      {apps.memoryMap === 'open' && (
        <AppWindow>
          <MemoryMap />
        </AppWindow>
      )}
      
      {apps.contactMe === 'open' && (
        <AppWindow>
          <ContactMe />
        </AppWindow>
      )}
      
      {apps.activityLogs === 'open' && (
        <AppWindow>
          <ActivityLogs />
        </AppWindow>
      )}
      
      {apps.readme === 'open' && (
        <AppWindow>
          <ReadmeViewer />
        </AppWindow>
      )}
    </div>
  );
};

interface AppWindowProps {
  children: React.ReactNode;
}

const AppWindow = ({ children }: AppWindowProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-20 bg-system-darkgray/90 backdrop-blur-sm">
      <div className="w-full h-full p-4 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default ApplicationWindows;
