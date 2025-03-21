
import React from 'react';

interface FileContentViewProps {
  content: string | null;
}

const FileContentView = ({ content }: FileContentViewProps) => {
  if (!content) {
    return (
      <div className="text-terminal-muted flex items-center justify-center h-full">
        Select a file to view its contents
      </div>
    );
  }

  return (
    <div className="whitespace-pre-wrap">
      {renderMarkdownContent(content)}
    </div>
  );
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

export default FileContentView;
