
import React from 'react';
import { useSystem } from '../context/SystemContext';

const BootSequence = () => {
  const { bootProgress, bootMessages } = useSystem();

  return (
    <div className="min-h-screen bg-terminal-background flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-3xl mx-auto terminal-body">
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-terminal-accent mb-2">ResumeOS</h1>
            <p className="text-terminal-muted">Version 3.5.2</p>
          </div>
          
          <div className="mb-8">
            <div className="progress-bar mb-2">
              <div 
                className="progress-value transition-all duration-300 ease-out" 
                style={{ width: `${bootProgress}%` }}
              />
            </div>
            <div className="text-right text-sm text-terminal-muted">
              {Math.round(bootProgress)}%
            </div>
          </div>
        </div>
        
        <div className="font-mono text-sm">
          {bootMessages.map((message, index) => (
            <div 
              key={index}
              className="boot-message mb-1"
              style={{ '--index': index } as React.CSSProperties}
            >
              {message.includes('CPU detected:') || 
               message.includes('Memory check:') || 
               message.includes('All modules online') ? (
                <span className="text-terminal-success">{message}</span>
              ) : message.includes('Welcome to') ? (
                <span className="text-terminal-accent font-bold">{message}</span>
              ) : (
                message
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BootSequence;
