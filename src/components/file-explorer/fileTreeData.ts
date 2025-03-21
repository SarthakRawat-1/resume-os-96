
import { TreeNode } from './fileTreeTypes';

export const initialFileTree: TreeNode[] = [
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
];
