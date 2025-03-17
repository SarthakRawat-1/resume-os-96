
import React from 'react';
import { useSystem } from '../context/SystemContext';

const BootSequence = () => {
  const { bootProgress, bootMessages } = useSystem();

  return (
    <div className="min-h-screen bg-gradient-to-br from-system-darkgray to-black flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-3xl mx-auto terminal-body">
        <div className="mb-8">
          <div className="text-center mb-6">
            <h1 className="text-5xl font-bold text-terminal-success mb-2 tracking-wider">ShogunOS</h1>
            <p className="text-terminal-muted font-light">Version 3.5.2</p>
          </div>
          
          <div className="mb-10">
            <div className="progress-bar h-3 mb-3 rounded-full overflow-hidden bg-system-lightgray/20 backdrop-blur-sm">
              <div 
                className="progress-value transition-all duration-300 ease-out bg-gradient-to-r from-terminal-success to-terminal-accent rounded-full" 
                style={{ width: `${bootProgress}%` }}
              />
            </div>
            <div className="text-right text-sm text-terminal-success font-mono">
              {Math.round(bootProgress)}%
            </div>
          </div>
        </div>
        
        <div className="font-mono text-sm bg-terminal-background/40 rounded-lg p-4 backdrop-blur-md border border-terminal-muted/20">
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
                <span className="text-terminal-text">{message}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BootSequence;
