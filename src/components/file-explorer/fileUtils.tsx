
import React from 'react';
import { File } from 'lucide-react';

export const fileIcons: Record<string, JSX.Element> = {
  txt: <File className="w-4 h-4 text-terminal-text" />,
  md: <File className="w-4 h-4 text-terminal-accent" />,
  pdf: <File className="w-4 h-4 text-terminal-error" />,
  log: <File className="w-4 h-4 text-terminal-warning" />,
  conf: <File className="w-4 h-4 text-terminal-success" />,
  default: <File className="w-4 h-4" />,
};

export const getFileIcon = (fileName: string) => {
  const extension = fileName.split('.').pop() || 'default';
  return fileIcons[extension] || fileIcons.default;
};
