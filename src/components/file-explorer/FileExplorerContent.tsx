
import React from 'react';
import { TreeNode } from './fileTreeTypes';
import FileTreeView from './FileTreeView';
import FileContentView from './FileContentView';

interface FileExplorerContentProps {
  fileTree: TreeNode[];
  toggleDirectory: (id: string) => void;
  openFile: (id: string, content: string) => void;
  selectedFile: string | null;
  fileContent: string | null;
}

const FileExplorerContent = ({
  fileTree,
  toggleDirectory,
  openFile,
  selectedFile,
  fileContent
}: FileExplorerContentProps) => {
  return (
    <div className="flex flex-1 overflow-hidden">
      <div className="w-1/3 border-r border-system-lightgray overflow-y-auto p-2">
        <FileTreeView
          nodes={fileTree}
          toggleDirectory={toggleDirectory}
          openFile={openFile}
          selectedFile={selectedFile}
        />
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto bg-terminal-background font-mono text-sm">
        <FileContentView content={fileContent} />
      </div>
    </div>
  );
};

export default FileExplorerContent;
