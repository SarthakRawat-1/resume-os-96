
export interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
  type: 'file' | 'directory';
  content?: string;
  isOpen?: boolean;
}
