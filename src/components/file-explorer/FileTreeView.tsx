
import React from 'react';
import { Folder, FolderOpen, ChevronDown, ChevronRight, File } from 'lucide-react';
import { TreeNode } from './fileTreeTypes';
import { getFileIcon } from './fileUtils';

interface FileTreeViewProps {
  nodes: TreeNode[];
  toggleDirectory: (id: string) => void;
  openFile: (id: string, content: string) => void;
  selectedFile: string | null;
  level?: number;
}

const FileTreeView = ({
  nodes,
  toggleDirectory,
  openFile,
  selectedFile,
  level = 0
}: FileTreeViewProps) => {
  return (
    <>
      {nodes.map(node => (
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
              {getFileIcon(node.name)}
              <span className="ml-2">{node.name}</span>
            </div>
          )}
          
          {node.type === 'directory' && node.isOpen && node.children && (
            <FileTreeView
              nodes={node.children}
              toggleDirectory={toggleDirectory}
              openFile={openFile}
              selectedFile={selectedFile}
              level={level + 1}
            />
          )}
        </div>
      ))}
    </>
  );
};

export default FileTreeView;
