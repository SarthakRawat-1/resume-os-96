
import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import { X, Minus, Square, MemoryStick, Search, Info } from 'lucide-react';

const MemoryMap = () => {
  const { closeApp, minimizeApp } = useSystem();
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  
  const memorySections = [
    {
      name: 'Text Segment',
      size: '0x2800',
      address: '0x0000 - 0x2800',
      color: 'bg-terminal-accent',
      description: 'Core Technical Skills & Expertise',
      items: [
        { 
          name: 'Systems Programming',
          address: '0x0100',
          size: '0x0600',
          description: 'Expertise in building low-level system components with a focus on performance and resource optimization.'
        },
        { 
          name: 'Embedded Development',
          address: '0x0700',
          size: '0x0500',
          description: 'Experience creating software for resource-constrained environments, optimizing for memory and CPU limitations.'
        },
        { 
          name: 'Kernel Internals',
          address: '0x0C00',
          size: '0x0800',
          description: 'Deep understanding of operating system kernels, including process management, memory systems, and device drivers.'
        },
        { 
          name: 'Compiler Design',
          address: '0x1400',
          size: '0x0700',
          description: 'Knowledge of compiler architecture including lexical analysis, parsing, code generation, and optimization techniques.'
        },
        { 
          name: 'Assembly Optimization',
          address: '0x1B00',
          size: '0x0500',
          description: 'Ability to write and optimize assembly code for critical performance sections in applications.'
        },
        { 
          name: 'Networking Protocols',
          address: '0x2000',
          size: '0x0800',
          description: 'Implementation of low-level networking protocols and optimization of network stacks.'
        },
      ]
    },
    {
      name: 'Data Segment',
      size: '0x2000',
      address: '0x4000 - 0x6000',
      color: 'bg-terminal-success',
      description: 'Work Experience & Education',
      items: [
        { 
          name: 'Senior Systems Engineer',
          address: '0x4000',
          size: '0x0800',
          description: 'Tech Corp (2020-2023)\nLed kernel development team for real-time operating system.\nOptimized boot sequence reducing startup time by 30%.\nImplemented memory protection mechanisms that improved system stability.'
        },
        { 
          name: 'Software Developer',
          address: '0x4800',
          size: '0x0600',
          description: 'Startup Inc (2018-2020)\nDeveloped embedded firmware for IoT devices.\nCreated efficient communication protocols for resource-constrained devices.\nOptimized power consumption algorithms extending battery life by 25%.'
        },
        { 
          name: 'Junior Developer',
          address: '0x4E00',
          size: '0x0500',
          description: 'Code Solutions (2016-2018)\nContributed to system-level libraries and tooling.\nImplemented performance monitoring subsystems.\nReworked memory allocator reducing fragmentation by 40%.'
        },
        { 
          name: 'Master of Science',
          address: '0x5300',
          size: '0x0700',
          description: 'Computer Science\nSpecialization: Systems and Architecture\nThesis: "Optimizing Memory Access Patterns in Real-time Systems"\nGraduation: 2016 with Honors'
        },
        { 
          name: 'Bachelor of Science',
          address: '0x5A00',
          size: '0x0600',
          description: 'Computer Engineering\nFocus: Embedded Systems and Digital Design\nRelevant Coursework: Operating Systems, Computer Architecture, Embedded Programming\nGraduation: 2014'
        },
      ]
    },
    {
      name: 'BSS Segment',
      size: '0x1800',
      address: '0x8000 - 0x9800',
      color: 'bg-terminal-warning',
      description: 'Personal Projects & Interests',
      items: [
        { 
          name: 'Custom OS Kernel',
          address: '0x8000',
          size: '0x0600',
          description: 'Personal project developing a minimalist operating system kernel from scratch. Implemented essential services like process scheduling, memory management, and a basic device driver framework.'
        },
        { 
          name: 'Performance Profiler',
          address: '0x8600',
          size: '0x0500',
          description: 'Created a low-overhead performance profiling tool for C/C++ applications that provides fine-grained insights into memory access patterns and CPU usage.'
        },
        { 
          name: 'Hardware Hacking',
          address: '0x8B00',
          size: '0x0400',
          description: 'Hobby projects involving modifying consumer electronics, building custom circuit boards, and programming microcontrollers for home automation systems.'
        },
        { 
          name: 'Open Source Contributions',
          address: '0x8F00',
          size: '0x0500',
          description: 'Active contributor to various open-source projects including Linux kernel modules, performance monitoring tools, and embedded libraries.'
        },
        { 
          name: 'Technical Writing',
          address: '0x9400',
          size: '0x0400',
          description: 'Author of technical articles on system internals, optimization techniques, and low-level programming best practices.'
        },
      ]
    },
    {
      name: 'Stack',
      size: '0x1000',
      address: '0xF000 - 0x10000',
      color: 'bg-terminal-error',
      description: 'Current Focus & Learning',
      items: [
        { 
          name: 'Rust for Systems',
          address: '0xF000',
          size: '0x0400',
          description: 'Currently exploring Rust programming language for memory-safe systems programming, with a focus on replacing traditional C components with safer alternatives.'
        },
        { 
          name: 'GPU Computing',
          address: '0xF400',
          size: '0x0300',
          description: 'Learning GPU architecture and GPGPU programming models for massively parallel computing applications.'
        },
        { 
          name: 'RISC-V Architecture',
          address: '0xF700',
          size: '0x0300',
          description: 'Studying RISC-V ISA and experimenting with open-source implementations for future embedded projects.'
        },
        { 
          name: 'Formal Verification',
          address: '0xFA00',
          size: '0x0300',
          description: 'Exploring techniques for formal verification of critical system components to mathematically prove correctness properties.'
        },
        { 
          name: 'Security Hardening',
          address: '0xFD00',
          size: '0x0300',
          description: 'Researching advanced techniques for hardening systems against exploits and side-channel attacks.'
        },
      ]
    },
  ];

  const handleSectionClick = (name: string) => {
    setSelectedSection(name === selectedSection ? null : name);
  };
  
  return (
    <div className="terminal-window w-full max-w-4xl mx-auto h-full max-h-[80vh] flex flex-col">
      <div className="terminal-header">
        <div className="flex space-x-2">
          <button 
            className="window-button window-close flex items-center justify-center"
            onClick={() => closeApp('memoryMap')}
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            className="window-button window-minimize"
            onClick={() => minimizeApp('memoryMap')}
          >
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button className="window-button window-maximize">
            <Square className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="terminal-title flex items-center">
          <MemoryStick className="w-4 h-4 mr-2" /> Memory Map
        </div>
        <div className="w-16"></div> {/* Spacer for symmetry */}
      </div>
      
      <div className="p-6 overflow-auto">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-terminal-accent font-bold text-lg">Virtual Memory Layout</h2>
          <div className="text-sm text-terminal-muted flex items-center">
            <Info className="w-4 h-4 mr-2" />
            <span>Click on memory regions to explore</span>
          </div>
        </div>
        
        <div className="flex space-x-1 h-20 mb-6">
          {memorySections.map((section, index) => (
            <div 
              key={index}
              className={`${section.color} rounded-md flex-1 flex items-center justify-center cursor-pointer transition-all duration-200 ease-in-out hover:opacity-90 relative ${
                selectedSection === section.name ? 'glow-border' : ''
              }`}
              onClick={() => handleSectionClick(section.name)}
            >
              <div className="text-center text-xs font-medium">
                <div className="font-bold">{section.name}</div>
                <div className="opacity-80">{section.address}</div>
              </div>
            </div>
          ))}
          
          {/* Gaps in memory representation */}
          <div className="w-4 bg-terminal-muted/20 rounded-md" />
          <div className="w-6 bg-terminal-muted/20 rounded-md" />
        </div>
        
        {selectedSection && (
          <div className="glass-card p-4 animate-fade-in-up">
            <div className="mb-4">
              <h3 className="text-lg font-bold mb-1">
                {memorySections.find(s => s.name === selectedSection)?.name}
              </h3>
              <div className="text-terminal-muted text-sm">
                {memorySections.find(s => s.name === selectedSection)?.description}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {memorySections
                .find(s => s.name === selectedSection)
                ?.items.map((item, index) => (
                  <div 
                    key={index}
                    className="glass-card p-3 grid-item"
                    style={{ '--index': index } as React.CSSProperties}
                  >
                    <div className="mb-2 flex justify-between">
                      <span className="font-bold">{item.name}</span>
                      <span className="text-terminal-muted text-xs">{item.address} ({item.size})</span>
                    </div>
                    <p className="text-sm whitespace-pre-line">{item.description}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
        
        {!selectedSection && (
          <div className="glass-card p-6 text-center text-terminal-muted">
            <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Select a memory segment above to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryMap;
