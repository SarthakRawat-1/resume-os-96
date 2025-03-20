
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

// GitHub API response interfaces
export interface GitHubApiResponse {
  id: string;
  type: string;
  actor: {
    login: string;
  };
  repo: {
    name: string;
    url: string;
  };
  payload: {
    commits?: Array<{
      message: string;
    }>;
    ref_type?: string;
    description?: string | null;
  };
  created_at: string;
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
  status: 'Accepted' | 'Wrong Answer';
  time: string;
  language: string;
}

// Contact information for API setup
export const contactEmail = 'sarthakrawat525@gmail.com';

// API endpoints
const GITHUB_API_ENDPOINT = 'https://api.github.com/users/SarthakRawat-1/events/public?per_page=3';
const LEETCODE_API_ENDPOINT = 'https://alfa-leetcode-api.onrender.com/Shogun_the_Great/acSubmission?limit=3';

/**
 * Fetch GitHub activity from the GitHub API
 */
export const fetchGitHubActivity = async (): Promise<GitHubActivity[]> => {
  try {
    const response = await fetch(GITHUB_API_ENDPOINT);
    
    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status}`);
    }
    
    const data: GitHubApiResponse[] = await response.json();
    
    // Transform API response to our app's format
    return data.map(item => {
      let description = '';
      
      // Generate a description based on event type
      if (item.type === 'PushEvent' && item.payload.commits && item.payload.commits.length > 0) {
        description = `Pushed: ${item.payload.commits[0].message}`;
      } else if (item.type === 'CreateEvent') {
        const refType = item.payload.ref_type || 'repository';
        description = `Created ${refType}`;
      } else if (item.type === 'PullRequestEvent') {
        description = 'Opened or updated a pull request';
      } else {
        description = `${item.type} activity`;
      }
      
      return {
        id: item.id,
        type: item.type,
        repo: item.repo.name.split('/')[1],
        time: item.created_at,
        description
      };
    });
  } catch (error) {
    console.error('Error fetching GitHub activity:', error);
    return [];
  }
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
      
      return {
        id: index.toString(),
        problem: submission.title,
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
    return "Use the ActivityLogs app to view up-to-date GitHub activity.";
  } else {
    return "Use the ActivityLogs app to view up-to-date LeetCode activity.";
  }
};
