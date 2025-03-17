
import React from 'react';
import { SystemProvider, useSystem } from '../context/SystemContext';
import BootSequence from '../components/BootSequence';
import Desktop from '../components/Desktop';

const Index = () => {
  const [initialized, setInitialized] = React.useState(false);
  
  React.useEffect(() => {
    // Initialize system
    setInitialized(true);
  }, []);
  
  if (!initialized) {
    return <div>Loading...</div>;
  }
  
  return (
    <SystemProvider>
      <ResumeOS />
    </SystemProvider>
  );
};

const ResumeOS = () => {
  const { systemState } = useSystem();
  
  if (systemState === 'boot') {
    return <BootSequence />;
  }
  
  if (systemState === 'desktop') {
    return <Desktop />;
  }
  
  return <div>Loading...</div>;
};

export default Index;
