
import React, { useState, useRef, useEffect } from 'react';
import { useSystem } from '../context/SystemContext';
import { X, Minus, Square, Terminal as TerminalIcon } from 'lucide-react';
import { fetchLeetCodeActivity, fetchGitHubActivity } from '../utils/activityLogs';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [outputs, setOutputs] = useState<{type: 'command' | 'output', content: string}[]>([
    { type: 'output', content: 'Welcome to ResumeOS Terminal. Type "help" for available commands.' }
  ]);
  const [hackerMode, setHackerMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputsRef = useRef<HTMLDivElement>(null);
  
  const { currentDirectory, executeCommand, closeApp, minimizeApp } = useSystem();

  // Handle input change without sound
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add command to outputs
    setOutputs(prev => [
      ...prev, 
      { type: 'command', content: `visitor@terminal.shogun.os:${currentDirectory} $ ${input}` }
    ]);

    // Check for special terminal-specific commands
    if (input.trim() === 'hacker_mode') {
      setHackerMode(true);
      setOutputs(prev => [
        ...prev, 
        { type: 'output', content: '🖥️ Hacker mode activated.\nMatrix-style theme enabled. Welcome to the matrix, Neo.' }
      ]);
      setInput('');
      return;
    }

    // Activity logs commands
    if (input.trim() === 'github_activity') {
      setOutputs(prev => [
        ...prev, 
        { type: 'output', content: 'Fetching GitHub activity...' }
      ]);

      try {
        const githubData = await fetchGitHubActivity();
        const formattedOutput = githubData.map(activity => 
          `[${new Date(activity.time).toLocaleTimeString()}] ${activity.type} on ${activity.repo}: ${activity.description}`
        ).join('\n');

        setOutputs(prev => [
          ...prev.slice(0, -1), // Remove the "Fetching..." message
          { type: 'output', content: `Recent GitHub Activity:\n${formattedOutput || 'No activity found.'}` }
        ]);
      } catch (error) {
        setOutputs(prev => [
          ...prev.slice(0, -1), // Remove the "Fetching..." message
          { type: 'output', content: 'Error fetching GitHub activity. Please try again later.' }
        ]);
      }
      
      setInput('');
      return;
    }

    if (input.trim() === 'leetcode_activity') {
      setOutputs(prev => [
        ...prev, 
        { type: 'output', content: 'Fetching LeetCode activity...' }
      ]);

      try {
        const leetcodeData = await fetchLeetCodeActivity();
        const formattedOutput = leetcodeData.map(activity => 
          `[${new Date(activity.time).toLocaleTimeString()}] Solved "${activity.problem}" - ${activity.status} using ${activity.language}`
        ).join('\n');

        setOutputs(prev => [
          ...prev.slice(0, -1), // Remove the "Fetching..." message
          { type: 'output', content: `Recent LeetCode Activity:\n${formattedOutput || 'No activity found.'}` }
        ]);
      } catch (error) {
        setOutputs(prev => [
          ...prev.slice(0, -1), // Remove the "Fetching..." message
          { type: 'output', content: 'Error fetching LeetCode activity. Please try again later.' }
        ]);
      }
      
      setInput('');
      return;
    }

    // Execute standard system command and get result
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

  const formatPrompt = () => {
    return (
      <span className="terminal-prompt">
        <span className="text-terminal-success">visitor</span>
        <span className="text-terminal-text">@</span>
        <span className="text-terminal-accent">terminal.shogun.os</span>
        <span className="text-terminal-text">:</span>
        <span className="text-terminal-warning">{currentDirectory}</span>
        <span className="text-terminal-text"> $</span>
      </span>
    );
  };

  return (
    <div className={`terminal-window w-full max-w-3xl mx-auto h-full max-h-[80vh] flex flex-col ${hackerMode ? 'hacker-mode' : ''}`}>
      <div className="terminal-header">
        <div className="flex space-x-2">
          <button 
            className="window-button window-close flex items-center justify-center"
            onClick={() => {
              closeApp('terminal');
            }}
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            className="window-button window-minimize"
            onClick={() => {
              minimizeApp('terminal');
            }}
          >
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            className="window-button window-maximize"
          >
            <Square className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="terminal-title flex items-center">
          <TerminalIcon className="w-4 h-4 mr-2" /> Terminal {hackerMode && '(Hacker Mode)'}
        </div>
        <div className="w-16"></div> {/* Spacer for symmetry */}
      </div>
      
      <div 
        ref={outputsRef}
        className={`terminal-body flex-1 overflow-auto ${hackerMode ? 'bg-black text-green-500' : ''}`}
      >
        {outputs.map((output, index) => (
          <div key={index} className={output.type === 'command' ? 'terminal-command' : 'terminal-output'}>
            {output.type === 'command' ? (
              <div className={hackerMode ? 'text-green-500' : ''}>
                <span className={hackerMode ? 'text-green-500' : 'text-terminal-success'}>visitor</span>
                <span className={hackerMode ? 'text-green-500' : 'text-terminal-text'}>@</span>
                <span className={hackerMode ? 'text-green-500' : 'text-terminal-accent'}>terminal.shogun.os</span>
                <span className={hackerMode ? 'text-green-500' : 'text-terminal-text'}>:</span>
                <span className={hackerMode ? 'text-green-500' : 'text-terminal-warning'}>{output.content.split(' $ ')[0].split(':')[1]}</span>
                <span className={hackerMode ? 'text-green-500' : 'text-terminal-text'}> $ </span>
                <span>{output.content.split(' $ ')[1]}</span>
              </div>
            ) : (
              output.content.split('\n').map((line, i) => (
                <div key={i} className={hackerMode ? 'text-green-500' : ''}>{line}</div>
              ))
            )}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex mt-2">
          {formatPrompt()}
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            className={`flex-1 bg-transparent outline-none border-none terminal-command cursor ml-2 ${hackerMode ? 'text-green-500' : ''}`}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;
