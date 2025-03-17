
import React from 'react';
import { useSystem } from '../context/SystemContext';
import { X, Minus, Square, BookOpen } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";

const ReadmeViewer = () => {
  const { closeApp, minimizeApp } = useSystem();
  
  const readmeContent = `
# Welcome to Sarthak Rawat's Digital Resume

## About ResumeOS

ResumeOS is an interactive way to explore my skills, projects, and experiences. This OS-like interface provides a unique and engaging way to learn about me and my work.

## Application Guide

Here's what each application does:

### 📟 Terminal
Access a command-line interface to navigate the system. Try commands like:
- \`ls\` - List files in current directory
- \`cd\` - Change directory
- \`cat [filename]\` - View file contents
- \`github_activity\` - See my GitHub activity
- \`leetcode_activity\` - View my LeetCode progress
- \`help\` - See all available commands

### 📁 Files
Browse through a file explorer to see documents about my experience, projects, and skills.

### 💻 Processes
View system processes and resource utilization (represents my technical skills).

### ⚙️ Settings
Configure system settings and preferences (represents my adaptability).

### 🗺️ Memory
Visualize memory usage (represents my knowledge areas and expertise).

### 📧 Contact
Find my contact information and get in touch with me directly.
- Email: sarthakrawat525@gmail.com
- GitHub: github.com/username
- LinkedIn: linkedin.com/in/username

### 📊 Activity
View my recent GitHub contributions and LeetCode problem-solving activity.

## Get Started

Click on any app icon to open it and explore more about my skills and background. Feel free to reach out via the Contact app if you'd like to connect!

Thank you for visiting my interactive resume!
`;

  return (
    <div className="terminal-window w-full max-w-4xl mx-auto h-full max-h-[80vh] flex flex-col">
      <div className="terminal-header">
        <div className="flex space-x-2">
          <button 
            className="window-button window-close flex items-center justify-center"
            onClick={() => closeApp('readme')}
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            className="window-button window-minimize"
            onClick={() => minimizeApp('readme')}
          >
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button className="window-button window-maximize">
            <Square className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="terminal-title flex items-center">
          <BookOpen className="w-4 h-4 mr-2" /> README.md
        </div>
        <div className="w-16"></div>
      </div>
      
      <ScrollArea className="flex-1 bg-terminal-background p-6">
        <div className="markdown-content prose prose-invert max-w-none">
          {readmeContent.split('\n').map((line, index) => {
            if (line.startsWith('# ')) {
              return <h1 key={index} className="text-2xl font-bold mt-4 mb-6 text-terminal-accent">{line.substring(2)}</h1>;
            } else if (line.startsWith('## ')) {
              return <h2 key={index} className="text-xl font-bold mt-6 mb-4 text-terminal-warning">{line.substring(3)}</h2>;
            } else if (line.startsWith('### ')) {
              return <h3 key={index} className="text-lg font-bold mt-4 mb-2 text-terminal-success">{line.substring(4)}</h3>;
            } else if (line.startsWith('- ')) {
              return <li key={index} className="ml-6 text-terminal-text">{line.substring(2)}</li>;
            } else if (line.startsWith('    - ')) {
              return <li key={index} className="ml-12 text-terminal-muted">{line.substring(6)}</li>;
            } else if (line.trim() === '') {
              return <br key={index} />;
            } else {
              return <p key={index} className="my-2 text-terminal-text">{line}</p>;
            }
          })}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ReadmeViewer;
