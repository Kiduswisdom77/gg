export interface ProjectLink {
  name: string;
  url: string;
}

export interface Project {
  id: string | number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string | null;
  liveUrl?: string | null;
  featured: boolean;
  period?: string;
  status?: string;
  links?: ProjectLink[];
}