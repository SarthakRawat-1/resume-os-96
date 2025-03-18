
import React, { useState, useRef, useEffect } from 'react';
import { useSystem } from '../context/SystemContext';
import { X, Minus, Square, Terminal as TerminalIcon } from 'lucide-react';
import { playSound, toggleMusic, setMusicVolume, stopMusic } from '../utils/sounds';
import { formatActivityForTerminal } from '../utils/activityLogs';

const Terminal = () => {
  const [input, setInput] = useState('');
  const [outputs, setOutputs] = useState<{type: 'command' | 'output', content: string}[]>([
    { type: 'output', content: 'Welcome to ResumeOS Terminal. Type "help" for available commands.' }
  ]);
  const [hackerMode, setHackerMode] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputsRef = useRef<HTMLDivElement>(null);
  
  const { currentDirectory, executeCommand, closeApp, minimizeApp, currentTheme } = useSystem();

  // Play typing sound on input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    if (e.target.value.length > input.length) {
      playSound('TYPING');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
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
      playSound('SUCCESS');
      setInput('');
      return;
    }

    if (input.trim() === 'play_music') {
      const result = toggleMusic();
      setOutputs(prev => [
        ...prev, 
        { type: 'output', content: `🎵 ${result.status === 'playing' ? 'Now playing' : 'Failed to play'}: "Bits & Bytes" - A chiptune soundtrack\n\nControls:\n- pause: Pause playback\n- stop: Stop playback\n- volume [0-10]: Adjust volume` }
      ]);
      setInput('');
      return;
    }

    if (input.trim() === 'pause') {
      const result = toggleMusic();
      setOutputs(prev => [
        ...prev, 
        { type: 'output', content: `Music ${result.status}` }
      ]);
      setInput('');
      return;
    }

    if (input.trim() === 'stop') {
      const result = stopMusic();
      setOutputs(prev => [
        ...prev, 
        { type: 'output', content: `Music ${result.status}` }
      ]);
      setInput('');
      return;
    }

    if (input.trim().startsWith('volume ')) {
      const level = parseInt(input.trim().split(' ')[1]);
      if (!isNaN(level) && level >= 0 && level <= 10) {
        const result = setMusicVolume(level);
        setOutputs(prev => [
          ...prev, 
          { type: 'output', content: result.status }
        ]);
      } else {
        setOutputs(prev => [
          ...prev, 
          { type: 'output', content: 'Invalid volume level. Use a number between 0 and 10.' }
        ]);
        playSound('ERROR');
      }
      setInput('');
      return;
    }

    // Activity logs commands
    if (input.trim() === 'github_activity') {
      setOutputs(prev => [
        ...prev, 
        { type: 'output', content: `Recent GitHub Activity:\n${formatActivityForTerminal('github')}` }
      ]);
      setInput('');
      return;
    }

    if (input.trim() === 'leetcode_activity') {
      setOutputs(prev => [
        ...prev, 
        { type: 'output', content: `Recent LeetCode Activity:\n${formatActivityForTerminal('leetcode')}` }
      ]);
      setInput('');
      return;
    }

    // Execute standard system command and get result
    const result = executeCommand(input);
    
    // Handle clear command
    if (result === 'CLEAR') {
      setOutputs([]);
    } else if (result) {
      // Check for error messages
      if (result.includes('not found') || result.includes('cannot') || result.includes('permission denied')) {
        playSound('ERROR');
      }

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
    <div className={`terminal-window w-full max-w-5xl mx-auto h-full max-h-[90vh] flex flex-col ${hackerMode ? 'hacker-mode' : ''}`} data-theme={currentTheme}>
      <div className="terminal-header">
        <div className="flex space-x-2">
          <button 
            className="window-button window-close flex items-center justify-center"
            onClick={() => {
              playSound('CLICK');
              closeApp('terminal');
            }}
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            className="window-button window-minimize"
            onClick={() => {
              playSound('CLICK');
              minimizeApp('terminal');
            }}
          >
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            className="window-button window-maximize"
            onClick={() => playSound('CLICK')}
          >
            <Square className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="terminal-title flex items-center">
          <TerminalIcon className="w-4 h-4 mr-2" /> Terminal {hackerMode && '(Hacker Mode)'} - Theme: {currentTheme}
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
