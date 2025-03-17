
import React, { useState, useRef, useEffect } from 'react';
import { useSystem } from '../context/SystemContext';
import { X, Minus, Square, Terminal as TerminalIcon } from 'lucide-react';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [outputs, setOutputs] = useState<{type: 'command' | 'output', content: string}[]>([
    { type: 'output', content: 'Welcome to ResumeOS Terminal. Type "help" for available commands.' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputsRef = useRef<HTMLDivElement>(null);
  
  const { currentDirectory, executeCommand, closeApp, minimizeApp } = useSystem();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add command to outputs
    setOutputs(prev => [
      ...prev, 
      { type: 'command', content: `${currentDirectory} $ ${input}` }
    ]);

    // Execute command and get result
    const result = executeCommand(input);
    
    // Handle clear command
    if (result === 'CLEAR') {
      setOutputs([]);
    } else if (result) {
      // Add result to outputs
      setOutputs(prev => [
        ...prev, 
        { type: 'output', content: result }
      ]);
    }

    // Clear input
    setInput('');
  };

  // Auto scroll to bottom when outputs change
  useEffect(() => {
    if (outputsRef.current) {
      outputsRef.current.scrollTop = outputsRef.current.scrollHeight;
    }
  }, [outputs]);

  // Focus input when terminal mounted
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="terminal-window w-full max-w-3xl mx-auto h-full max-h-[80vh] flex flex-col">
      <div className="terminal-header">
        <div className="flex space-x-2">
          <button 
            className="window-button window-close flex items-center justify-center"
            onClick={() => closeApp('terminal')}
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            className="window-button window-minimize"
            onClick={() => minimizeApp('terminal')}
          >
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button className="window-button window-maximize">
            <Square className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="terminal-title flex items-center">
          <TerminalIcon className="w-4 h-4 mr-2" /> Terminal
        </div>
        <div className="w-16"></div> {/* Spacer for symmetry */}
      </div>
      
      <div 
        ref={outputsRef}
        className="terminal-body flex-1 overflow-auto"
      >
        {outputs.map((output, index) => (
          <div key={index} className={output.type === 'command' ? 'terminal-command' : 'terminal-output'}>
            {output.content.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex mt-2">
          <span className="terminal-prompt mr-2">{currentDirectory} $</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent outline-none border-none terminal-command cursor text-terminal-text"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
