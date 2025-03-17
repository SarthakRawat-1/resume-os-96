
import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { X, Minus, Square, Folder, File, FolderOpen, ChevronRight, ChevronDown } from 'lucide-react';

const fileIcons: Record<string, JSX.Element> = {
  txt: <File className="w-4 h-4 text-terminal-text" />,
  md: <File className="w-4 h-4 text-terminal-accent" />,
  pdf: <File className="w-4 h-4 text-terminal-error" />,
  log: <File className="w-4 h-4 text-terminal-warning" />,
  conf: <File className="w-4 h-4 text-terminal-success" />,
  default: <File className="w-4 h-4" />,
};

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  type: 'file' | 'directory';
  content?: string;
  isOpen?: boolean;
}

const FileSystem = () => {
  const { closeApp, minimizeApp } = useSystem();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  
  // Sample file structure (in a real app, this would come from context)
  const [fileTree, setFileTree] = useState<TreeNode[]>([
    {
      id: 'home',
      name: 'home',
      type: 'directory',
      isOpen: true,
      children: [
        {
          id: 'user',
          name: 'user',
          type: 'directory',
          isOpen: true,
          children: [
            {
              id: 'about.txt',
              name: 'about.txt',
              type: 'file',
              content: 'I am a passionate software developer specializing in low-level systems programming and optimization.'
            },
            {
              id: 'contact.txt',
              name: 'contact.txt',
              type: 'file',
              content: 'Email: user@example.com\nGitHub: github.com/username\nLinkedIn: linkedin.com/in/username'
            },
            {
              id: 'skills.txt',
              name: 'skills.txt',
              type: 'file',
              content: '- C/C++ Programming\n- Systems Architecture\n- Kernel Development\n- Performance Optimization\n- Embedded Systems'
            }
          ]
        }
      ]
    },
    {
      id: 'projects',
      name: 'projects',
      type: 'directory',
      isOpen: false,
      children: [
        {
          id: 'project1.md',
          name: 'project1.md',
          type: 'file',
          content: '# Custom Operating System\nDeveloped a minimalist OS kernel with a focus on performance and security.'
        },
        {
          id: 'project2.md',
          name: 'project2.md',
          type: 'file',
          content: '# Memory Manager\nImplemented an efficient memory allocation system that reduced fragmentation by 40%.'
        },
        {
          id: 'project3.md',
          name: 'project3.md',
          type: 'file',
          content: '# Low-level Graphics Library\nCreated a hardware-accelerated graphics library for resource-constrained systems.'
        }
      ]
    },
    {
      id: 'docs',
      name: 'docs',
      type: 'directory',
      isOpen: false,
      children: [
        {
          id: 'education.pdf',
          name: 'education.pdf',
          type: 'file',
          content: 'Bachelor of Science in Computer Engineering\nMaster of Science in Computer Science'
        },
        {
          id: 'certifications.pdf',
          name: 'certifications.pdf',
          type: 'file',
          content: '- AWS Certified Solutions Architect\n- Linux Professional Institute Certification\n- CompTIA Security+'
        },
        {
          id: 'resume.pdf',
          name: 'resume.pdf',
          type: 'file',
          content: 'A comprehensive resume detailing my experience, skills, and achievements.'
        }
      ]
    },
    {
      id: 'logs',
      name: 'logs',
      type: 'directory',
      isOpen: false,
      children: [
        {
          id: 'experience.log',
          name: 'experience.log',
          type: 'file',
          content: '[2020-2023] Senior Systems Engineer at Tech Corp\n[2018-2020] Software Developer at Startup Inc\n[2016-2018] Junior Developer at Code Solutions'
        },
        {
          id: 'achievements.log',
          name: 'achievements.log',
          type: 'file',
          content: '- Reduced system boot time by 30%\n- Optimized memory usage by 25%\n- Contributed to open-source kernel projects\n- Published research on real-time systems'
        }
      ]
    },
    {
      id: 'etc',
      name: 'etc',
      type: 'directory',
      isOpen: false,
      children: [
        {
          id: 'resume.conf',
          name: 'resume.conf',
          type: 'file',
          content: 'NAME=John Doe\nROLE=Systems Engineer\nLOCATION=San Francisco, CA\nAVAILABILITY=Available for hire\nPREFERRED_STACK=C/C++, Rust, Assembly\nINTERESTS=Kernel Development, Embedded Systems, Performance Optimization'
        },
        {
          id: 'changelog.md',
          name: 'changelog.md',
          type: 'file',
          content: '## v3.5.2 (2023)\n- Added expertise in Rust programming\n- Improved system architecture skills\n- Advanced knowledge of RTOS concepts\n\n## v3.0.0 (2022)\n- Mastered kernel development\n- Enhanced debugging capabilities\n- Added cloud infrastructure knowledge\n\n## v2.0.0 (2020)\n- Upgraded programming skills\n- Added experience with distributed systems\n- Improved algorithm optimization techniques'
        }
      ]
    }
  ]);
  
  const toggleDirectory = (id: string) => {
    setFileTree(prevTree => {
      const updateNode = (nodes: TreeNode[]): TreeNode[] => {
        return nodes.map(node => {
          if (node.id === id) {
            return { ...node, isOpen: !node.isOpen };
          }
          if (node.children) {
            return { ...node, children: updateNode(node.children) };
          }
          return node;
        });
      };
      
      return updateNode(prevTree);
    });
  };
  
  const openFile = (id: string, content: string) => {
    setSelectedFile(id);
    setFileContent(content);
  };
  
  const renderTree = (nodes: TreeNode[], level = 0) => {
    return nodes.map(node => (
      <div key={node.id} style={{ paddingLeft: `${level * 16}px` }}>
        {node.type === 'directory' ? (
          <div 
            className="file-item group"
            onClick={() => toggleDirectory(node.id)}
          >
            <span className="mr-1">
              {node.isOpen ? 
                <ChevronDown className="inline w-4 h-4 text-terminal-muted" /> : 
                <ChevronRight className="inline w-4 h-4 text-terminal-muted" />
              }
            </span>
            {node.isOpen ? 
              <FolderOpen className="inline w-4 h-4 text-terminal-warning mr-2" /> : 
              <Folder className="inline w-4 h-4 text-terminal-warning mr-2" />
            }
            <span>{node.name}</span>
          </div>
        ) : (
          <div 
            className={`file-item group ${selectedFile === node.id ? 'bg-system-lightgray/30' : ''}`}
            onClick={() => openFile(node.id, node.content || '')}
          >
            <span className="mr-6"></span>
            {fileIcons[node.name.split('.').pop() || 'default'] || fileIcons.default}
            <span className="ml-2">{node.name}</span>
          </div>
        )}
        
        {node.type === 'directory' && node.isOpen && node.children && (
          renderTree(node.children, level + 1)
        )}
      </div>
    ));
  };

  return (
    <div className="terminal-window w-full max-w-4xl mx-auto h-full max-h-[80vh] flex flex-col">
      <div className="terminal-header">
        <div className="flex space-x-2">
          <button 
            className="window-button window-close flex items-center justify-center"
            onClick={() => closeApp('fileExplorer')}
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            className="window-button window-minimize"
            onClick={() => minimizeApp('fileExplorer')}
          >
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button className="window-button window-maximize">
            <Square className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="terminal-title flex items-center">
          <Folder className="w-4 h-4 mr-2" /> File Explorer
        </div>
        <div className="w-16"></div> {/* Spacer for symmetry */}
      </div>
      
      <div className="flex flex-1 overflow-hidden">
        {/* File tree sidebar */}
        <div className="w-1/3 border-r border-system-lightgray overflow-y-auto p-2">
          {renderTree(fileTree)}
        </div>
        
        {/* File content area */}
        <div className="flex-1 p-4 overflow-y-auto bg-terminal-background font-mono text-sm">
          {fileContent ? (
            <pre className="whitespace-pre-wrap">{fileContent}</pre>
          ) : (
            <div className="text-terminal-muted flex items-center justify-center h-full">
              Select a file to view its contents
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileSystem;
