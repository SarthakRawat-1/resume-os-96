
import React, { useState } from 'react';
import { useSystem } from '../context/SystemContext';
import FileExplorerWindow from './file-explorer/FileExplorerWindow';
import FileExplorerContent from './file-explorer/FileExplorerContent';
import { initialFileTree } from './file-explorer/fileTreeData';

const FileSystem = () => {
  const { closeApp, minimizeApp } = useSystem();
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string | null>(null);
  const [fileTree, setFileTree] = useState(initialFileTree);
  
  const toggleDirectory = (id: string) => {
    setFileTree(prevTree => {
      const updateNode = (nodes: any[]): any[] => {
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

  return (
    <FileExplorerWindow 
      closeApp={() => closeApp('fileExplorer')} 
      minimizeApp={() => minimizeApp('fileExplorer')}
    >
      <FileExplorerContent
        fileTree={fileTree}
        toggleDirectory={toggleDirectory}
        openFile={openFile}
        selectedFile={selectedFile}
        fileContent={fileContent}
      />
    </FileExplorerWindow>
  );
};

export default FileSystem;
