
import React from 'react';
import { SystemProvider, useSystem } from '../context/SystemContext';
import BootSequence from '../components/BootSequence';
import Desktop from '../components/Desktop';
import { Toaster } from '@/components/ui/sonner';

const Index = () => {
  const [initialized, setInitialized] = React.useState(false);
  
  React.useEffect(() => {
    // Initialize system
    setInitialized(true);
    
    // Log that the application has started
    console.log('ResumeOS initialized');
    console.log('Activity Logs available at: /logs/github_activity.log and /logs/leetcode_activity.log');
    console.log('Contact email: sarthakrawat525@gmail.com');
  }, []);
  
  if (!initialized) {
    return <div>Loading...</div>;
  }
  
  return (
    <SystemProvider>
      <ResumeOSContent />
      <Toaster position="bottom-right" />
    </SystemProvider>
  );
};

const ResumeOSContent = () => {
  const { systemState } = useSystem();
  
  return (
    <div>
      {systemState === 'boot' && <BootSequence />}
      {systemState === 'desktop' && <Desktop />}
    </div>
  );
};

export default Index;
