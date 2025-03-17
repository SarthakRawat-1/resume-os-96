
import React from 'react';
import { useSystem } from '../context/SystemContext';
import { X, Minus, Square, ActivitySquare, Cpu, Maximize2, MemoryStick } from 'lucide-react';

// Skills as processes data structure
const processes = [
  {
    pid: 1001,
    name: 'C/C++ Programming',
    status: 'Running',
    cpu: 92,
    memory: 86,
    runtime: '7y 3m',
    description: 'Expertise in systems programming with performance optimization',
  },
  {
    pid: 1002,
    name: 'Kernel Development',
    status: 'Running',
    cpu: 88,
    memory: 78,
    runtime: '4y 8m',
    description: 'Experience with Linux kernel modules and drivers',
  },
  {
    pid: 1003,
    name: 'Systems Architecture',
    status: 'Running',
    cpu: 85,
    memory: 90,
    runtime: '5y 2m',
    description: 'Design and implementation of complex system architectures',
  },
  {
    pid: 1004,
    name: 'Embedded Systems',
    status: 'Running',
    cpu: 82,
    memory: 75,
    runtime: '6y 1m',
    description: 'Development for resource-constrained environments',
  },
  {
    pid: 1005,
    name: 'Rust Programming',
    status: 'Running',
    cpu: 78,
    memory: 72,
    runtime: '2y 4m',
    description: 'Memory-safe systems programming with performance focus',
  },
  {
    pid: 1006,
    name: 'Assembly Language',
    status: 'Sleeping',
    cpu: 90,
    memory: 60,
    runtime: '8y 7m',
    description: 'Low-level programming for performance-critical components',
  },
  {
    pid: 1007,
    name: 'Networking Protocols',
    status: 'Running',
    cpu: 75,
    memory: 70,
    runtime: '5y 9m',
    description: 'Implementation and optimization of network stacks',
  },
  {
    pid: 1008,
    name: 'Real-time Systems',
    status: 'Running',
    cpu: 85,
    memory: 82,
    runtime: '4y 5m',
    description: 'Development with hard real-time constraints',
  },
];

const ProcessManager = () => {
  const { closeApp, minimizeApp } = useSystem();
  const [selectedProcess, setSelectedProcess] = React.useState<number | null>(null);

  return (
    <div className="terminal-window w-full max-w-4xl mx-auto h-full max-h-[80vh] flex flex-col">
      <div className="terminal-header">
        <div className="flex space-x-2">
          <button 
            className="window-button window-close flex items-center justify-center"
            onClick={() => closeApp('processManager')}
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            className="window-button window-minimize"
            onClick={() => minimizeApp('processManager')}
          >
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button className="window-button window-maximize">
            <Square className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="terminal-title flex items-center">
          <ActivitySquare className="w-4 h-4 mr-2" /> Process Manager
        </div>
        <div className="w-16"></div> {/* Spacer for symmetry */}
      </div>
      
      <div className="overflow-auto p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-terminal-accent font-bold">Skills & Expertise</h2>
          <div className="text-terminal-muted text-sm">
            <span className="mr-4">Total processes: {processes.length}</span>
            <span>Active: {processes.filter(p => p.status === 'Running').length}</span>
          </div>
        </div>
        
        <div className="terminal-body p-0">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-system-lightgray text-left">
                <th className="py-2 px-3">PID</th>
                <th className="py-2 px-3">Name</th>
                <th className="py-2 px-3">Status</th>
                <th className="py-2 px-3">CPU %</th>
                <th className="py-2 px-3">Memory %</th>
                <th className="py-2 px-3">Runtime</th>
              </tr>
            </thead>
            <tbody>
              {processes.map((process) => (
                <tr 
                  key={process.pid}
                  className={`border-b border-system-lightgray/30 hover:bg-system-lightgray/20 cursor-pointer transition-colors ${selectedProcess === process.pid ? 'bg-system-lightgray/30' : ''}`}
                  onClick={() => setSelectedProcess(process.pid === selectedProcess ? null : process.pid)}
                >
                  <td className="py-2 px-3">{process.pid}</td>
                  <td className="py-2 px-3">{process.name}</td>
                  <td className="py-2 px-3">
                    <span className={`inline-block w-2 h-2 rounded-full mr-2 ${process.status === 'Running' ? 'bg-terminal-success' : 'bg-terminal-warning'}`}></span>
                    {process.status}
                  </td>
                  <td className="py-2 px-3">
                    <div className="w-24 bg-system-lightgray/20 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-terminal-accent rounded-full"
                        style={{ width: `${process.cpu}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <div className="w-24 bg-system-lightgray/20 h-2 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-terminal-success rounded-full"
                        style={{ width: `${process.memory}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="py-2 px-3">{process.runtime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {selectedProcess && (
          <div className="mt-4 bg-system-gray p-4 rounded-md border border-system-lightgray text-sm">
            <h3 className="text-terminal-accent font-bold mb-2">Process Details</h3>
            {(() => {
              const process = processes.find(p => p.pid === selectedProcess);
              if (!process) return null;
              
              return (
                <div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="mb-3">
                        <div className="text-terminal-muted mb-1">Process Name</div>
                        <div className="font-medium">{process.name}</div>
                      </div>
                      <div className="mb-3">
                        <div className="text-terminal-muted mb-1">Status</div>
                        <div className="font-medium flex items-center">
                          <span className={`inline-block w-2 h-2 rounded-full mr-2 ${process.status === 'Running' ? 'bg-terminal-success' : 'bg-terminal-warning'}`}></span>
                          {process.status}
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="text-terminal-muted mb-1">Runtime</div>
                        <div className="font-medium">{process.runtime}</div>
                      </div>
                    </div>
                    <div>
                      <div className="mb-3">
                        <div className="text-terminal-muted mb-1">CPU Usage</div>
                        <div className="flex items-center">
                          <Cpu className="w-4 h-4 mr-2 text-terminal-accent" />
                          <div className="w-full bg-system-lightgray/20 h-3 rounded-full overflow-hidden mr-2">
                            <div 
                              className="h-full bg-terminal-accent rounded-full"
                              style={{ width: `${process.cpu}%` }}
                            ></div>
                          </div>
                          <span>{process.cpu}%</span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="text-terminal-muted mb-1">Memory Usage</div>
                        <div className="flex items-center">
                          <MemoryStick className="w-4 h-4 mr-2 text-terminal-success" />
                          <div className="w-full bg-system-lightgray/20 h-3 rounded-full overflow-hidden mr-2">
                            <div 
                              className="h-full bg-terminal-success rounded-full"
                              style={{ width: `${process.memory}%` }}
                            ></div>
                          </div>
                          <span>{process.memory}%</span>
                        </div>
                      </div>
                      <div className="mb-3">
                        <div className="text-terminal-muted mb-1">Process ID</div>
                        <div className="font-medium">{process.pid}</div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="text-terminal-muted mb-1">Description</div>
                    <div className="text-sm">{process.description}</div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcessManager;
