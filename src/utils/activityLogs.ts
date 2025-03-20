
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

// LeetCode API response interfaces
export interface LeetCodeApiResponse {
  count: number;
  submission: LeetCodeSubmission[];
}

export interface LeetCodeSubmission {
  title: string;
  titleSlug: string;
  timestamp: string;
  statusDisplay: string;
  lang: string;
}

// Interface for LeetCode activity (formatted for our app)
export interface LeetCodeActivity {
  id: string;
  problem: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  status: 'Accepted' | 'Wrong Answer';
  time: string;
  language: string;
}

// Contact information for API setup
export const contactEmail = 'sarthakrawat525@gmail.com';

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

// LeetCode API endpoint
const LEETCODE_API_ENDPOINT = 'https://alfa-leetcode-api.onrender.com/Shogun_the_Great/acSubmission?limit=3';

/**
 * Fetch GitHub activity (currently using mock data)
 * In a real implementation, this would use the GitHub API with credentials
 */
export const fetchGitHubActivity = async (): Promise<GitHubActivity[]> => {
  // Simulating API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return mockGitHubActivity;
};

/**
 * Fetch LeetCode activity from the public API
 */
export const fetchLeetCodeActivity = async (): Promise<LeetCodeActivity[]> => {
  try {
    const response = await fetch(LEETCODE_API_ENDPOINT);
    
    if (!response.ok) {
      throw new Error(`LeetCode API returned ${response.status}`);
    }
    
    const data: LeetCodeApiResponse = await response.json();
    
    // Transform API response to our app's format
    return data.submission.map((submission, index) => {
      // Map timestamp to a date string
      const timeDate = new Date(parseInt(submission.timestamp) * 1000);
      
      // Generate a random difficulty since the API doesn't provide it
      // In a real app, we'd get this from another API call or database
      const difficulties: Array<'Easy' | 'Medium' | 'Hard'> = ['Easy', 'Medium', 'Hard'];
      const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
      
      return {
        id: index.toString(),
        problem: submission.title,
        difficulty: randomDifficulty,
        status: submission.statusDisplay as 'Accepted' | 'Wrong Answer',
        time: timeDate.toISOString(),
        language: submission.lang,
      };
    });
  } catch (error) {
    console.error('Error fetching LeetCode activity:', error);
    return [];
  }
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
    // For LeetCode, we can't use sync formatting with the async API
    // This is a placeholder, in practice you might want to cache the data
    return "Use the ActivityLogs app to view up-to-date LeetCode activity.";
  }
};
