export interface Project {
  id: string;
  title: string;
  description: string;
  location?: string;
  category?: string;
  images: string[];
  isActive: boolean;
  createdAt: string;
}
