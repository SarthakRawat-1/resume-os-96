import React, { createContext, useContext, useState, useEffect } from 'react';
import { initSounds } from '../utils/sounds';
import { toast } from 'sonner';

type SystemState = 'boot' | 'login' | 'desktop';
type AppState = 'closed' | 'minimized' | 'open';

interface Apps {
  terminal: AppState;
  fileExplorer: AppState;
  processManager: AppState;
  sysConfig: AppState;
  memoryMap: AppState;
  contactMe: AppState;
  activityLogs: AppState;
  readme: AppState;
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
    activityLogs: 'closed',
    readme: 'closed',
  });

  useEffect(() => {
    initSounds();
  }, []);

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
      content: ['experience.log', 'achievements.log', 'github_activity.log', 'leetcode_activity.log'],
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
      content: 'Email: sarthakrawat525@gmail.com\nGitHub: github.com/username\nLinkedIn: linkedin.com/in/username\nTwitter: twitter.com/username',
    },
    '/home/user/skills.txt': {
      type: 'file',
      content: 'Programming Languages: C++, Rust, Python, JavaScript/TypeScript\nFrameworks: React, Express, NextJS\nTools: Docker, Kubernetes, Git\nSpecialties: Low-level optimization, System design, Performance tuning',
    },
    '/logs/github_activity.log': {
      type: 'file',
      content: `# GitHub Activity Log

[${new Date().toISOString()}] PushEvent on resume-os: Added sound effects and music player to ResumeOS
[${new Date(Date.now() - 3600000).toISOString()}] CreateEvent on low-level-optimizations: Created a new repository for performance optimization techniques
[${new Date(Date.now() - 7200000).toISOString()}] PullRequestEvent on kernel-experiments: Merged PR: Fixed memory leak in custom allocator

NOTE: These are mock entries. Real data will be fetched from GitHub API once backend integration is complete.
Contact: sarthakrawat525@gmail.com for API setup.`,
    },
    '/logs/leetcode_activity.log': {
      type: 'file',
      content: `# LeetCode Activity Log

[${new Date().toISOString()}] Solved "Median of Two Sorted Arrays" (Hard) - Accepted using C++
[${new Date(Date.now() - 86400000).toISOString()}] Solved "Container With Most Water" (Medium) - Accepted using Rust
[${new Date(Date.now() - 172800000).toISOString()}] Solved "Valid Parentheses" (Easy) - Accepted using C

NOTE: These are mock entries. Real data will be fetched from LeetCode API once backend integration is complete.
Contact: sarthakrawat525@gmail.com for API setup.`,
    },
  };

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
        'Loading user profile: Shogun',
        'Starting system services...',
        'System check: All modules online',
        'Boot sequence completed successfully',
        'Welcome to ShogunOS v3.5.2',
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
    console.log(`Opening app: ${app}`);
    
    setApps(prevApps => {
      const newApps = { ...prevApps };
      newApps[app] = 'open';
      console.log("New apps state:", newApps);
      return newApps;
    });
  };

  const closeApp = (app: keyof Apps) => {
    console.log(`Closing app: ${app}`);
    
    setApps(prevApps => {
      const newApps = { ...prevApps };
      newApps[app] = 'closed';
      return newApps;
    });
  };

  const minimizeApp = (app: keyof Apps) => {
    console.log(`Minimizing app: ${app}`);
    
    setApps(prevApps => {
      const newApps = { ...prevApps };
      newApps[app] = 'minimized';
      return newApps;
    });
  };

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
        return 'Available commands:\n- ls [path]: List directory contents\n- cat [file]: Display file contents\n- pwd: Print working directory\n- clear: Clear the terminal\n- sudo [command]: Run command with elevated privileges\n- hacker_mode: Enable hacker aesthetic\n- github_activity: Display recent GitHub activity\n- leetcode_activity: Display recent LeetCode activity\n- help: Display this help message';
        
      case 'clear':
        return 'CLEAR';
        
      case 'sudo':
        if (args[0] === 'elevate') {
          return '🔒 Elevated privileges granted.\nWelcome to the secret developer mode. This is where I keep my most interesting projects and personal notes.\n\nAs a systems engineer, I\'ve always been fascinated by the inner workings of computers. My passion is optimizing and re-engineering systems that others consider "good enough."\n\nIf you\'re interested in discussing any opportunities or collaborations, please contact me directly using the ContactMe app on the desktop.';
        }
        return 'sudo: You need to be root to perform this action. Just kidding, this is just a resume website!';
        
      case 'hacker_mode':
        return '🖥️ Hacker mode activated.\nMatrix-style theme enabled. Welcome to the matrix, Neo.';
        
      case 'rm':
        if (args[0] === '-rf' && args[1] === '/') {
          return 'KERNEL_PANIC\n\n🚫 Critical system error detected!\nSystem files deletion attempted\n\n...Just kidding! Your resume data is safe. This is just a fun easter egg. I\'d never let you delete my resume that easily! 😉\n\nSystem recovered successfully.';
        }
        return `rm: Cannot remove '${args.join(' ')}': Permission denied`;
        
      case 'github_activity':
        const githubFile = fileSystem['/logs/github_activity.log'];
        return githubFile.content;
        
      case 'leetcode_activity':
        const leetcodeFile = fileSystem['/logs/leetcode_activity.log'];
        return leetcodeFile.content;
        
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
        executeCommand
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
