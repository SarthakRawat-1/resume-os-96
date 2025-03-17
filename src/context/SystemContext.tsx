
import React, { createContext, useContext, useState, useEffect } from 'react';

type SystemState = 'boot' | 'login' | 'desktop';
type AppState = 'closed' | 'minimized' | 'open';

interface Apps {
  terminal: AppState;
  fileExplorer: AppState;
  processManager: AppState;
  sysConfig: AppState;
  memoryMap: AppState;
  contactMe: AppState;
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
    contactMe: 'closed',
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
      content: ['about.txt', 'contact.txt', 'skills.txt', 'whoami.txt', 'resume.txt'],
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
      content: ['resume.conf', 'changelog.md', 'easter_eggs.txt'],
    },
    '/home/user/about.txt': {
      type: 'file',
      content: 'I am a passionate software developer specializing in low-level systems programming and optimization.',
    },
    '/home/user/contact.txt': {
      type: 'file',
      content: 'Email: user@example.com\nGitHub: github.com/username\nLinkedIn: linkedin.com/in/username\nTwitter: twitter.com/username',
    },
    '/home/user/skills.txt': {
      type: 'file',
      content: '- C/C++ Programming\n- Systems Architecture\n- Kernel Development\n- Performance Optimization\n- Embedded Systems',
    },
    '/home/user/whoami.txt': {
      type: 'file',
      content: 'John Doe - Senior Systems Engineer\n\nI\'m a passionate low-level programmer with expertise in operating systems, embedded development, and performance optimization. With over 7 years of experience, I specialize in making computers run faster, more efficiently, and more reliably.',
    },
    '/home/user/resume.txt': {
      type: 'file',
      content: '# JOHN DOE\nSenior Systems Engineer\n\n## EXPERIENCE\n- 2020-2023: Senior Systems Engineer at Tech Corp\n- 2018-2020: Software Developer at Startup Inc\n- 2016-2018: Junior Developer at Code Solutions\n\n## EDUCATION\n- Master of Science in Computer Science\n- Bachelor of Science in Computer Engineering\n\n## SKILLS\n- Systems Programming (C/C++, Rust)\n- Kernel Development\n- Performance Optimization\n- Embedded Systems\n- Low-level Debugging\n\n## CONTACT\nEmail: john.doe@example.com\nGitHub: github.com/johndoe\nLinkedIn: linkedin.com/in/johndoe',
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
    '/etc/easter_eggs.txt': {
      type: 'file',
      content: 'Congratulations! You found a hidden file.\n\nTry these secret commands in the terminal:\n- sudo elevate\n- hacker_mode\n- play_music\n- rm -rf /\n\nEach one has a special surprise!',
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

  // Modified to close all other apps when opening a new one
  const openApp = (app: keyof Apps) => {
    setApps(prev => {
      // Create a new state with all apps closed
      const newState = Object.keys(prev).reduce((acc, key) => {
        acc[key as keyof Apps] = 'closed';
        return acc;
      }, {} as Apps);
      
      // Open only the requested app
      newState[app] = 'open';
      return newState;
    });
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

  // Enhanced command execution with more interactive commands
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
        
      case 'whoami':
        const whoamiFile = fileSystem['/home/user/whoami.txt'];
        return whoamiFile.content;
        
      case 'help':
        return 'Available commands:\n- ls [path]: List directory contents\n- cd [path]: Change directory\n- cat [file]: Display file contents\n- pwd: Print working directory\n- clear: Clear the terminal\n- whoami: Display user information\n- sudo [command]: Run command with elevated privileges\n- hacker_mode: Enable hacker aesthetic\n- play_music: Play background music\n- help: Display this help message';
        
      case 'clear':
        return 'CLEAR';
        
      case 'sudo':
        if (args[0] === 'elevate') {
          return '🔒 Elevated privileges granted.\nWelcome to the secret developer mode. This is where I keep my most interesting projects and personal notes.\n\nAs a systems engineer, I\'ve always been fascinated by the inner workings of computers. My passion is optimizing and re-engineering systems that others consider "good enough."\n\nIf you\'re interested in discussing any opportunities or collaborations, please contact me directly using the ContactMe app on the desktop.';
        }
        return 'sudo: You need to be root to perform this action. Just kidding, this is just a resume website!';
        
      case 'hacker_mode':
        // In real implementation, this would trigger a CSS class change
        return '🖥️ Hacker mode activated.\nMatrix-style theme enabled. Welcome to the matrix, Neo.';
        
      case 'play_music':
        // In real implementation, this would trigger audio playback
        return '🎵 Now playing: "Bits & Bytes" - A chiptune soundtrack\n\nControls:\n- pause: Pause playback\n- stop: Stop playback\n- volume [0-10]: Adjust volume';
        
      case 'rm':
        if (args[0] === '-rf' && args[1] === '/') {
          return 'KERNEL_PANIC\n\n🚫 Critical system error detected!\nSystem files deletion attempted\n\n...Just kidding! Your resume data is safe. This is just a fun easter egg. I\'d never let you delete my resume that easily! 😉\n\nSystem recovered successfully.';
        }
        return `rm: Cannot remove '${args.join(' ')}': Permission denied`;
        
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
