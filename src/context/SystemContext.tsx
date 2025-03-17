
import React, { createContext, useContext, useState, useEffect } from 'react';

type SystemState = 'boot' | 'login' | 'desktop';
type AppState = 'closed' | 'minimized' | 'open';

interface Apps {
  terminal: AppState;
  fileExplorer: AppState;
  processManager: AppState;
  sysConfig: AppState;
  memoryMap: AppState;
}

interface SystemContextType {
  systemState: SystemState;
  setSystemState: React.Dispatch<React.SetStateAction<SystemState>>;
  bootProgress: number;
  bootMessages: string[];
  currentDirectory: string;
  commandHistory: string[];
  apps: Apps;
  openApp: (app: keyof Apps) => void;
  closeApp: (app: keyof Apps) => void;
  minimizeApp: (app: keyof Apps) => void;
  executeCommand: (command: string) => string;
}

const SystemContext = createContext<SystemContextType | undefined>(undefined);

export const SystemProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [systemState, setSystemState] = useState<SystemState>('boot');
  const [bootProgress, setBootProgress] = useState(0);
  const [bootMessages, setBootMessages] = useState<string[]>([]);
  const [currentDirectory, setCurrentDirectory] = useState('/home/user');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [apps, setApps] = useState<Apps>({
    terminal: 'closed',
    fileExplorer: 'closed',
    processManager: 'closed',
    sysConfig: 'closed',
    memoryMap: 'closed',
  });

  // Virtual file system structure
  const fileSystem = {
    '/': {
      type: 'dir',
      content: ['home', 'projects', 'docs', 'logs', 'etc'],
    },
    '/home': {
      type: 'dir',
      content: ['user'],
    },
    '/home/user': {
      type: 'dir',
      content: ['about.txt', 'contact.txt', 'skills.txt'],
    },
    '/projects': {
      type: 'dir',
      content: ['project1.md', 'project2.md', 'project3.md'],
    },
    '/docs': {
      type: 'dir',
      content: ['education.pdf', 'certifications.pdf', 'resume.pdf'],
    },
    '/logs': {
      type: 'dir',
      content: ['experience.log', 'achievements.log'],
    },
    '/etc': {
      type: 'dir',
      content: ['resume.conf', 'changelog.md'],
    },
    '/home/user/about.txt': {
      type: 'file',
      content: 'I am a passionate software developer specializing in low-level systems programming and optimization.',
    },
    '/home/user/contact.txt': {
      type: 'file',
      content: 'Email: user@example.com\nGitHub: github.com/username\nLinkedIn: linkedin.com/in/username',
    },
    '/home/user/skills.txt': {
      type: 'file',
      content: '- C/C++ Programming\n- Systems Architecture\n- Kernel Development\n- Performance Optimization\n- Embedded Systems',
    },
    '/projects/project1.md': {
      type: 'file',
      content: '# Custom Operating System\nDeveloped a minimalist OS kernel with a focus on performance and security.',
    },
    '/projects/project2.md': {
      type: 'file',
      content: '# Memory Manager\nImplemented an efficient memory allocation system that reduced fragmentation by 40%.',
    },
    '/projects/project3.md': {
      type: 'file',
      content: '# Low-level Graphics Library\nCreated a hardware-accelerated graphics library for resource-constrained systems.',
    },
    '/docs/education.pdf': {
      type: 'file',
      content: 'Bachelor of Science in Computer Engineering\nMaster of Science in Computer Science',
    },
    '/docs/certifications.pdf': {
      type: 'file',
      content: '- AWS Certified Solutions Architect\n- Linux Professional Institute Certification\n- CompTIA Security+',
    },
    '/docs/resume.pdf': {
      type: 'file',
      content: 'A comprehensive resume detailing my experience, skills, and achievements.',
    },
    '/logs/experience.log': {
      type: 'file',
      content: '[2020-2023] Senior Systems Engineer at Tech Corp\n[2018-2020] Software Developer at Startup Inc\n[2016-2018] Junior Developer at Code Solutions',
    },
    '/logs/achievements.log': {
      type: 'file',
      content: '- Reduced system boot time by 30%\n- Optimized memory usage by 25%\n- Contributed to open-source kernel projects\n- Published research on real-time systems',
    },
    '/etc/resume.conf': {
      type: 'file',
      content: 'NAME=John Doe\nROLE=Systems Engineer\nLOCATION=San Francisco, CA\nAVAILABILITY=Available for hire\nPREFERRED_STACK=C/C++, Rust, Assembly\nINTERESTS=Kernel Development, Embedded Systems, Performance Optimization',
    },
    '/etc/changelog.md': {
      type: 'file',
      content: '## v3.5.2 (2023)\n- Added expertise in Rust programming\n- Improved system architecture skills\n- Advanced knowledge of RTOS concepts\n\n## v3.0.0 (2022)\n- Mastered kernel development\n- Enhanced debugging capabilities\n- Added cloud infrastructure knowledge\n\n## v2.0.0 (2020)\n- Upgraded programming skills\n- Added experience with distributed systems\n- Improved algorithm optimization techniques',
    },
  };

  // Boot sequence simulation
  useEffect(() => {
    if (systemState === 'boot') {
      const bootSequence = [
        'Initializing system...',
        'Detecting hardware components...',
        'CPU detected: Overclocked Performance Core',
        'Memory check: Abundant & Optimized',
        'Loading kernel modules...',
        'Mounting virtual file systems...',
        'Initializing network interfaces...',
        'Loading user profile: Developer',
        'Starting system services...',
        'System check: All modules online',
        'Boot sequence completed successfully',
        'Welcome to ResumeOS v3.5.2',
      ];

      const bootInterval = setInterval(() => {
        const progressIncrement = 100 / bootSequence.length;
        
        setBootProgress(prev => {
          const newProgress = Math.min(prev + progressIncrement, 100);
          
          if (newProgress >= 100) {
            clearInterval(bootInterval);
            setTimeout(() => setSystemState('desktop'), 1000);
          }
          
          return newProgress;
        });
        
        setBootMessages(prev => {
          const nextIndex = prev.length;
          if (nextIndex < bootSequence.length) {
            return [...prev, bootSequence[nextIndex]];
          }
          return prev;
        });
      }, 400);

      return () => clearInterval(bootInterval);
    }
  }, [systemState]);

  const openApp = (app: keyof Apps) => {
    setApps(prev => ({
      ...prev,
      [app]: 'open',
    }));
  };

  const closeApp = (app: keyof Apps) => {
    setApps(prev => ({
      ...prev,
      [app]: 'closed',
    }));
  };

  const minimizeApp = (app: keyof Apps) => {
    setApps(prev => ({
      ...prev,
      [app]: 'minimized',
    }));
  };

  // Simple command execution
  const executeCommand = (command: string): string => {
    setCommandHistory(prev => [...prev, command]);
    
    const parts = command.trim().split(' ');
    const cmd = parts[0];
    const args = parts.slice(1);
    
    switch (cmd) {
      case 'ls':
        const path = args[0] || currentDirectory;
        const dir = fileSystem[path];
        if (!dir || dir.type !== 'dir') {
          return `ls: cannot access '${path}': No such directory`;
        }
        return dir.content.join('\n');
        
      case 'cd':
        if (!args[0]) {
          setCurrentDirectory('/home/user');
          return '';
        }
        
        let newPath = args[0];
        if (!newPath.startsWith('/')) {
          newPath = `${currentDirectory}/${newPath}`.replace(/\/\.\//g, '/').replace(/\/[^\/]+\/\.\.\//g, '/');
        }
        
        if (fileSystem[newPath] && fileSystem[newPath].type === 'dir') {
          setCurrentDirectory(newPath);
          return '';
        } else {
          return `cd: no such directory: ${args[0]}`;
        }
        
      case 'cat':
        const filePath = args[0] && args[0].startsWith('/') ? args[0] : `${currentDirectory}/${args[0]}`;
        const file = fileSystem[filePath];
        
        if (!file) {
          return `cat: ${args[0]}: No such file or directory`;
        }
        
        if (file.type === 'dir') {
          return `cat: ${args[0]}: Is a directory`;
        }
        
        return file.content;
        
      case 'pwd':
        return currentDirectory;
        
      case 'help':
        return 'Available commands:\n- ls [path]: List directory contents\n- cd [path]: Change directory\n- cat [file]: Display file contents\n- pwd: Print working directory\n- clear: Clear the terminal\n- help: Display this help message';
        
      case 'clear':
        return 'CLEAR';
        
      default:
        return `command not found: ${cmd}`;
    }
  };

  return (
    <SystemContext.Provider
      value={{
        systemState,
        setSystemState,
        bootProgress,
        bootMessages,
        currentDirectory,
        commandHistory,
        apps,
        openApp,
        closeApp,
        minimizeApp,
        executeCommand,
      }}
    >
      {children}
    </SystemContext.Provider>
  );
};

export const useSystem = () => {
  const context = useContext(SystemContext);
  if (!context) {
    throw new Error('useSystem must be used within a SystemProvider');
  }
  return context;
};
