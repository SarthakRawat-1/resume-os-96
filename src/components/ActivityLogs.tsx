
import React, { useState, useEffect } from 'react';
import { useSystem } from '../context/SystemContext';
import { 
  fetchGitHubActivity, 
  fetchLeetCodeActivity, 
  GitHubActivity, 
  LeetCodeActivity 
} from '../utils/activityLogs';
import { X, Minus, Square, Activity, Github, Code, AlertCircle } from 'lucide-react';

const ActivityLogs = () => {
  const [activeTab, setActiveTab] = useState<'github' | 'leetcode'>('github');
  const [githubActivity, setGithubActivity] = useState<GitHubActivity[]>([]);
  const [leetcodeActivity, setLeetcodeActivity] = useState<LeetCodeActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { closeApp, minimizeApp } = useSystem();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        if (activeTab === 'github') {
          const github = await fetchGitHubActivity();
          setGithubActivity(github);
        } else {
          const leetcode = await fetchLeetCodeActivity();
          setLeetcodeActivity(leetcode);
        }
      } catch (err) {
        console.error('Failed to fetch activity data:', err);
        setError(`Failed to load ${activeTab} activity data. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(loadData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [activeTab]);

  const getDifficultyClass = (difficulty: string) => {
    switch(difficulty) {
      case 'Easy':
        return 'bg-terminal-success/20 text-terminal-success';
      case 'Medium':
        return 'bg-terminal-warning/20 text-terminal-warning';
      default:
        return 'bg-terminal-error/20 text-terminal-error';
    }
  };

  return (
    <div className="terminal-window w-full max-w-3xl mx-auto h-full max-h-[80vh] flex flex-col">
      <div className="terminal-header">
        <div className="flex space-x-2">
          <button 
            className="window-button window-close flex items-center justify-center"
            onClick={() => closeApp('activityLogs')}
          >
            <X className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button 
            className="window-button window-minimize"
            onClick={() => minimizeApp('activityLogs')}
          >
            <Minus className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
          <button className="window-button window-maximize">
            <Square className="w-2 h-2 opacity-0 group-hover:opacity-100" />
          </button>
        </div>
        <div className="terminal-title flex items-center">
          <Activity className="w-4 h-4 mr-2" /> Activity Logs
        </div>
        <div className="w-16"></div> {/* Spacer for symmetry */}
      </div>
      
      <div className="bg-terminal-background text-terminal-text flex-1 overflow-auto">
        <div className="flex border-b border-system-lightgray">
          <button 
            className={`px-4 py-2 flex items-center ${activeTab === 'github' ? 'bg-system-lightgray text-terminal-accent' : 'hover:bg-system-lightgray/30'}`}
            onClick={() => setActiveTab('github')}
          >
            <Github className="w-4 h-4 mr-2" /> GitHub
          </button>
          <button 
            className={`px-4 py-2 flex items-center ${activeTab === 'leetcode' ? 'bg-system-lightgray text-terminal-accent' : 'hover:bg-system-lightgray/30'}`}
            onClick={() => setActiveTab('leetcode')}
          >
            <Code className="w-4 h-4 mr-2" /> LeetCode
          </button>
        </div>
        
        <div className="p-4">
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="text-terminal-accent">Loading activity data...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-32 text-terminal-error">
              <AlertCircle className="w-5 h-5 mr-2" /> {error}
            </div>
          ) : activeTab === 'github' ? (
            <div className="space-y-4">
              <h3 className="text-terminal-accent font-bold text-sm">Recent GitHub Activity</h3>
              {githubActivity.length === 0 ? (
                <div className="text-terminal-muted">No recent GitHub activity found.</div>
              ) : (
                <div className="space-y-2">
                  {githubActivity.map(activity => (
                    <div key={activity.id} className="border border-system-lightgray/30 rounded p-2">
                      <div className="flex justify-between text-xs text-terminal-muted">
                        <span>{activity.type}</span>
                        <span>{new Date(activity.time).toLocaleString()}</span>
                      </div>
                      <div className="mt-1 text-sm">{activity.description}</div>
                      <div className="mt-1 text-xs text-terminal-success">Repository: {activity.repo}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-terminal-accent font-bold text-sm">Recent LeetCode Activity</h3>
              {leetcodeActivity.length === 0 ? (
                <div className="text-terminal-muted">No recent LeetCode activity found.</div>
              ) : (
                <div className="space-y-2">
                  {leetcodeActivity.map(activity => (
                    <div key={activity.id} className="border border-system-lightgray/30 rounded p-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-bold">{activity.problem}</span>
                        <span className={`text-xs px-2 py-1 rounded ${getDifficultyClass(activity.difficulty)}`}>
                          {activity.difficulty}
                        </span>
                      </div>
                      <div className="mt-1 text-xs flex justify-between">
                        <span className={activity.status === 'Accepted' ? 'text-terminal-success' : 'text-terminal-error'}>
                          {activity.status}
                        </span>
                        <span className="text-terminal-muted">{new Date(activity.time).toLocaleString()}</span>
                      </div>
                      <div className="mt-1 text-xs text-terminal-accent">Language: {activity.language}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityLogs;
