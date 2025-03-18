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
          content: `# Custom Operating System

Developed a minimalist OS kernel with a focus on performance and security.

## Key Features
- Custom bootloader and kernel
- Memory management subsystem
- Process scheduling
- Basic device drivers

## Technologies
- C/C++
- Assembly
- QEMU for testing

## Links
- [GitHub Repository](https://github.com/username/custom-os)
- [Documentation](https://docs.custom-os.example.com)
- [Demo Video](https://youtube.com/watch?v=demo-video-id)`
        },
        {
          id: 'project2.md',
          name: 'project2.md',
          type: 'file',
          content: `# Memory Manager

Implemented an efficient memory allocation system that reduced fragmentation by 40%.

## Problem Solved
Created a specialized allocator for embedded systems with tight memory constraints.

## Approach
- Custom slab allocator implementation
- Memory pool design for fixed-size allocations
- Defragmentation algorithm

## Results
- 40% reduction in memory fragmentation
- 25% performance improvement for allocation/deallocation operations

## Links
- [GitHub Repository](https://github.com/username/memory-manager)
- [Technical Paper](https://example.com/memory-paper.pdf)
- [Benchmarks](https://example.com/memory-benchmarks)`
        },
        {
          id: 'project3.md',
          name: 'project3.md',
          type: 'file',
          content: `# Low-level Graphics Library

Created a hardware-accelerated graphics library for resource-constrained systems.

## Overview
A lightweight graphics rendering pipeline designed for embedded systems with minimal GPU support.

## Features
- Hardware acceleration via custom shaders
- Optimized rendering algorithms for 2D/3D primitives
- Support for multiple display interfaces

## Performance
- 60+ FPS on embedded hardware
- Memory footprint under 100KB

## Links
- [GitHub Repository](https://github.com/username/graphics-lib)
- [API Documentation](https://docs.graphics-lib.example.com)
- [Demo Projects](https://github.com/username/graphics-lib-demos)`
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
  
  const renderMarkdownContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.match(/\[.*?\]\(.*?\)/)) {
        const parts = [];
        let lastIndex = 0;
        const linkRegex = /\[(.*?)\]\((.*?)\)/g;
        let match;
        
        while ((match = linkRegex.exec(line)) !== null) {
          if (match.index > lastIndex) {
            parts.push(line.substring(lastIndex, match.index));
          }
          
          const linkText = match[1];
          const linkUrl = match[2];
          parts.push(
            <a 
              key={`${index}-${match.index}`}
              href={linkUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-terminal-accent hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                window.open(linkUrl, '_blank', 'noopener,noreferrer');
              }}
            >
              {linkText}
            </a>
          );
          
          lastIndex = match.index + match[0].length;
        }
        
        if (lastIndex < line.length) {
          parts.push(line.substring(lastIndex));
        }
        
        return <div key={index}>{parts}</div>;
      }
      
      if (line.startsWith('# ')) {
        return <h1 key={index} className="text-xl font-bold mt-4 mb-3 text-terminal-accent">{line.substring(2)}</h1>;
      } else if (line.startsWith('## ')) {
        return <h2 key={index} className="text-lg font-bold mt-3 mb-2 text-terminal-warning">{line.substring(3)}</h2>;
      } else if (line.startsWith('### ')) {
        return <h3 key={index} className="text-md font-bold mt-2 mb-1 text-terminal-success">{line.substring(4)}</h3>;
      }
      
      if (line.startsWith('- ')) {
        return <li key={index} className="ml-4 text-terminal-text">{line.substring(2)}</li>;
      }
      
      if (line.trim() === '') {
        return <br key={index} />;
      }
      
      return <p key={index} className="text-terminal-text">{line}</p>;
    });
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
        <div className="w-1/3 border-r border-system-lightgray overflow-y-auto p-2">
          {renderTree(fileTree)}
        </div>
        
        <div className="flex-1 p-4 overflow-y-auto bg-terminal-background font-mono text-sm">
          {fileContent ? (
            <div className="whitespace-pre-wrap">
              {renderMarkdownContent(fileContent)}
            </div>
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
