import { BioData } from '@/types/bio';
import { Project } from '@/types/project';
import { Publication } from '@/types/publication';
import { BlogPost } from './blog';

// Import raw JSON data
import bioRaw from '@/data/bio.json';
import projectsRaw from '@/data/projects.json';
import publicationsRaw from '@/data/publications.json';

// Type guards for validation
function isBioData(data: unknown): data is BioData {
  return (
    typeof data === 'object' &&
    data !== null &&
    'name' in data &&
    'title' in data &&
    'email' in data &&
    'bio' in data &&
    'education' in data &&
    Array.isArray((data as any).education) &&
    'social' in data &&
    Array.isArray((data as any).social)
  );
}

function isProject(data: unknown): data is Project {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'title' in data &&
    'description' in data &&
    'technologies' in data &&
    Array.isArray((data as any).technologies) &&
    'featured' in data
  );
}

function isProjectArray(data: unknown): data is Project[] {
  return Array.isArray(data) && data.every(isProject);
}

function isPublication(data: unknown): data is Publication {
  return (
    typeof data === 'object' &&
    data !== null &&
    'id' in data &&
    'title' in data &&
    'authors' in data &&
    'year' in data
  );
}

function isPublicationArray(data: unknown): data is Publication[] {
  return Array.isArray(data) && data.every(isPublication);
}

// Data transformation functions
function transformProject(project: any): Project {
  return {
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.image,
    technologies: project.technologies || [],
    githubUrl: project.githubUrl || null,
    liveUrl: project.liveUrl || null,
    featured: project.featured || false,
    period: project.period || '',
    status: project.status || '',
    links: project.links || []
  };
}

function transformPublication(pub: any): Publication {
  return {
    id: pub.id,
    title: pub.title,
    authors: pub.authors,
    journal: pub.journal || '',
    year: pub.year,
    volume: pub.volume,
    issue: pub.issue,
    pages: pub.pages,
    doi: pub.doi,
    abstract: pub.abstract,
    pdfUrl: pub.pdfUrl,
    citation: pub.citation
  };
}

// Cached data instances
let cachedBio: BioData | null = null;
let cachedProjects: Project[] | null = null;
let cachedPublications: Publication[] | null = null;

// Data access functions
export function getBioData(): BioData {
  if (cachedBio) return cachedBio;

  if (!isBioData(bioRaw)) {
    console.warn('Bio data validation failed, using fallback');
    cachedBio = {
      name: 'Ghiorghis Haile',
      title: 'Software Developer & Researcher',
      company: '',
      location: 'Addis Ababa, Ethiopia',
      email: 'contact@example.com',
      bio: 'Professional portfolio',
      education: [],
      researchInterests: [],
      skills: [],
      social: []
    };
  } else {
    cachedBio = {
      ...bioRaw,
      skills: bioRaw.skills || [],
      researchInterests: bioRaw.researchInterests || [],
      company: bioRaw.company || ''
    };
  }

  return cachedBio;
}

export function getProjects(): Project[] {
  if (cachedProjects) return cachedProjects;

  if (!isProjectArray(projectsRaw)) {
    console.warn('Projects data validation failed, using fallback');
    cachedProjects = [];
  } else {
    cachedProjects = projectsRaw.map(transformProject);
  }

  return cachedProjects;
}

export function getFeaturedProjects(): Project[] {
  const projects = getProjects();
  return projects.filter(project => project.featured);
}

export function getProjectById(id: string | number): Project | null {
  const projects = getProjects();
  return projects.find(project => project.id === id) || null;
}

export function getProjectsByTechnology(technology: string): Project[] {
  const projects = getProjects();
  return projects.filter(project => 
    project.technologies.some(tech => 
      tech.toLowerCase().includes(technology.toLowerCase())
    )
  );
}

export function getPublications(): Publication[] {
  if (cachedPublications) return cachedPublications;

  if (!isPublicationArray(publicationsRaw)) {
    console.warn('Publications data validation failed, using fallback');
    cachedPublications = [];
  } else {
    cachedPublications = publicationsRaw.map(transformPublication);
  }

  return cachedPublications;
}

export function getPublicationsByYear(year: number): Publication[] {
  const publications = getPublications();
  return publications.filter(pub => pub.year === year);
}

export function getRecentPublications(limit: number = 5): Publication[] {
  const publications = getPublications();
  return publications
    .sort((a, b) => b.year - a.year)
    .slice(0, limit);
}

export function searchPublications(query: string): Publication[] {
  const publications = getPublications();
  const lowerQuery = query.toLowerCase();
  
  return publications.filter(pub => 
    pub.title.toLowerCase().includes(lowerQuery) ||
    pub.authors.toLowerCase().includes(lowerQuery) ||
    pub.journal.toLowerCase().includes(lowerQuery) ||
    (pub.abstract && pub.abstract.toLowerCase().includes(lowerQuery))
  );
}

// Utility functions for data manipulation
export function getTechnologies(): string[] {
  const projects = getProjects();
  const technologies = new Set<string>();
  
  projects.forEach(project => {
    project.technologies.forEach(tech => {
      technologies.add(tech);
    });
  });
  
  return Array.from(technologies).sort();
}

export function getProjectCountByTechnology(): Map<string, number> {
  const projects = getProjects();
  const countMap = new Map<string, number>();
  
  projects.forEach(project => {
    project.technologies.forEach(tech => {
      countMap.set(tech, (countMap.get(tech) || 0) + 1);
    });
  });
  
  return countMap;
}

export function getPublicationYears(): number[] {
  const publications = getPublications();
  const years = new Set<number>();
  
  publications.forEach(pub => {
    years.add(pub.year);
  });
  
  return Array.from(years).sort((a, b) => b - a);
}

// Data export functions (for debugging or external use)
export function exportProjectsAsCSV(): string {
  const projects = getProjects();
  const headers = ['ID', 'Title', 'Technologies', 'Featured', 'Status'];
  const rows = projects.map(project => [
    project.id.toString(),
    `"${project.title.replace(/"/g, '""')}"`,
    `"${project.technologies.join(', ')}"`,
    project.featured ? 'Yes' : 'No',
    project.status || 'N/A'
  ]);
  
  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}

export function exportPublicationsAsBibTeX(): string {
  const publications = getPublications();
  return publications.map(pub => {
    const entry = [
      `@article{${pub.doi?.replace(/[^a-zA-Z0-9]/g, '_') || `pub_${pub.id}`},`,
      `  title = {${pub.title}},`,
      `  author = {${pub.authors}},`,
      `  journal = {${pub.journal}},`,
      `  year = {${pub.year}},`
    ];
    
    if (pub.volume) entry.push(`  volume = {${pub.volume}},`);
    if (pub.issue) entry.push(`  number = {${pub.issue}},`);
    if (pub.pages) entry.push(`  pages = {${pub.pages}},`);
    if (pub.doi) entry.push(`  doi = {${pub.doi}},`);
    
    // Remove trailing comma from last line
    const lastIndex = entry.length - 1;
    entry[lastIndex] = entry[lastIndex].replace(/,$/, '');
    
    entry.push('}');
    return entry.join('\n');
  }).join('\n\n');
}

// Data validation and health check
export function validateData(): {
  bio: boolean;
  projects: boolean;
  publications: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  
  try {
    if (!isBioData(bioRaw)) {
      errors.push('Bio data structure is invalid');
    }
  } catch (error) {
    errors.push(`Bio data validation error: ${error}`);
  }
  
  try {
    if (!isProjectArray(projectsRaw)) {
      errors.push('Projects data structure is invalid');
    }
  } catch (error) {
    errors.push(`Projects data validation error: ${error}`);
  }
  
  try {
    if (!isPublicationArray(publicationsRaw)) {
      errors.push('Publications data structure is invalid');
    }
  } catch (error) {
    errors.push(`Publications data validation error: ${error}`);
  }
  
  return {
    bio: isBioData(bioRaw),
    projects: isProjectArray(projectsRaw),
    publications: isPublicationArray(publicationsRaw),
    errors
  };
}

// Data refresh function (useful for development)
export function refreshData(): void {
  cachedBio = null;
  cachedProjects = null;
  cachedPublications = null;
}

// Default export for convenience
const data = {
  getBioData,
  getProjects,
  getFeaturedProjects,
  getProjectById,
  getProjectsByTechnology,
  getPublications,
  getPublicationsByYear,
  getRecentPublications,
  searchPublications,
  getTechnologies,
  getProjectCountByTechnology,
  getPublicationYears,
  exportProjectsAsCSV,
  exportPublicationsAsBibTeX,
  validateData,
  refreshData
};

export default data;