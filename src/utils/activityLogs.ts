
/**
 * Activity logs service for GitHub and LeetCode
 */

// Interface for GitHub activity 
export interface GitHubActivity {
  id: string;
  type: string;
  repo: string;
  time: string;
  description: string;
}

// Interface for LeetCode activity
export interface LeetCodeActivity {
  id: string;
  problem: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Accepted' | 'Wrong Answer';
  time: string;
  language: string;
}

// Mock GitHub activity data (would be replaced with actual API calls)
const mockGitHubActivity: GitHubActivity[] = [
  {
    id: '1',
    type: 'PushEvent',
    repo: 'resume-os',
    time: new Date().toISOString(),
    description: 'Added sound effects and music player to ResumeOS'
  },
  {
    id: '2',
    type: 'CreateEvent',
    repo: 'low-level-optimizations',
    time: new Date(Date.now() - 3600000).toISOString(),
    description: 'Created a new repository for performance optimization techniques'
  },
  {
    id: '3',
    type: 'PullRequestEvent',
    repo: 'kernel-experiments',
    time: new Date(Date.now() - 7200000).toISOString(),
    description: 'Merged PR: Fixed memory leak in custom allocator'
  }
];

// Mock LeetCode activity data (would be replaced with actual API calls)
const mockLeetCodeActivity: LeetCodeActivity[] = [
  {
    id: '1',
    problem: 'Median of Two Sorted Arrays',
    difficulty: 'Hard',
    status: 'Accepted',
    time: new Date().toISOString(),
    language: 'C++'
  },
  {
    id: '2',
    problem: 'Container With Most Water',
    difficulty: 'Medium',
    status: 'Accepted',
    time: new Date(Date.now() - 86400000).toISOString(),
    language: 'Rust'
  },
  {
    id: '3',
    problem: 'Valid Parentheses',
    difficulty: 'Easy',
    status: 'Accepted',
    time: new Date(Date.now() - 172800000).toISOString(),
    language: 'C'
  }
];

/**
 * Fetch GitHub activity (currently using mock data)
 * In a real implementation, this would use the GitHub API with credentials
 */
export const fetchGitHubActivity = async (): Promise<GitHubActivity[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In a real implementation, we would fetch from the GitHub API:
  // const response = await fetch('https://api.github.com/users/USERNAME/events', {
  //   headers: {
  //     'Authorization': `token ${process.env.GITHUB_TOKEN}`
  //   }
  // });
  // const data = await response.json();
  // return transformGitHubData(data);
  
  return mockGitHubActivity;
};

/**
 * Fetch LeetCode activity (currently using mock data)
 * In a real implementation, this would use the LeetCode API with credentials
 */
export const fetchLeetCodeActivity = async (): Promise<LeetCodeActivity[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // In a real implementation, we would fetch from LeetCode GraphQL API
  // const response = await fetch('https://leetcode.com/graphql', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Cookie': process.env.LEETCODE_COOKIE
  //   },
  //   body: JSON.stringify({
  //     query: '...' // GraphQL query for recent submissions
  //   })
  // });
  // const data = await response.json();
  // return transformLeetCodeData(data);
  
  return mockLeetCodeActivity;
};

/**
 * Format activity for terminal display
 */
export const formatActivityForTerminal = (type: 'github' | 'leetcode'): string => {
  if (type === 'github') {
    return mockGitHubActivity.map(activity => 
      `[${new Date(activity.time).toLocaleTimeString()}] ${activity.type} on ${activity.repo}: ${activity.description}`
    ).join('\n');
  } else {
    return mockLeetCodeActivity.map(activity => 
      `[${new Date(activity.time).toLocaleTimeString()}] Solved "${activity.problem}" (${activity.difficulty}) - ${activity.status} using ${activity.language}`
    ).join('\n');
  }
};
