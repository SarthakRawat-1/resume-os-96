
/**
 * Activity logs service for GitHub and LeetCode
 */
import { supabase } from "../integrations/supabase/client";

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

// Contact information for API setup
export const contactEmail = 'sarthakrawat525@gmail.com';

/**
 * Fetch GitHub activity from Supabase
 */
export const fetchGitHubActivity = async (): Promise<GitHubActivity[]> => {
  try {
    const { data, error } = await supabase
      .from('github_activity')
      .select('*')
      .order('time', { ascending: false });
    
    if (error) {
      console.error('Error fetching GitHub activity:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch GitHub activity:', error);
    return [];
  }
};

/**
 * Fetch LeetCode activity from Supabase
 */
export const fetchLeetCodeActivity = async (): Promise<LeetCodeActivity[]> => {
  try {
    const { data, error } = await supabase
      .from('leetcode_activity')
      .select('*')
      .order('time', { ascending: false });
    
    if (error) {
      console.error('Error fetching LeetCode activity:', error);
      throw error;
    }
    
    return data || [];
  } catch (error) {
    console.error('Failed to fetch LeetCode activity:', error);
    return [];
  }
};

/**
 * Format activity for terminal display
 */
export const formatActivityForTerminal = async (type: 'github' | 'leetcode'): Promise<string> => {
  try {
    if (type === 'github') {
      const activities = await fetchGitHubActivity();
      return activities.map(activity => 
        `[${new Date(activity.time).toLocaleTimeString()}] ${activity.type} on ${activity.repo}: ${activity.description}`
      ).join('\n');
    } else {
      const activities = await fetchLeetCodeActivity();
      return activities.map(activity => 
        `[${new Date(activity.time).toLocaleTimeString()}] Solved "${activity.problem}" (${activity.difficulty}) - ${activity.status} using ${activity.language}`
      ).join('\n');
    }
  } catch (error) {
    console.error(`Error formatting ${type} activity:`, error);
    return `Error retrieving ${type} activity data`;
  }
};
