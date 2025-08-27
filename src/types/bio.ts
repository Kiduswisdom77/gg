export interface EducationItem {
  degree: string;
  institution: string;
  years: string;
  thesis?: string;
}

export interface SocialItem {
  name: string;
  url: string;
  icon: string;
}

export interface BioData {
  name: string;
  title: string;
  company: string;
  location: string;
  email: string;
  bio: string;
  education: EducationItem[];
  researchInterests: string[];
  skills?: string[]; // Optional for backward compatibility
  social: SocialItem[];
}

// For components expecting the old structure
export interface LegacyBioData {
  name: string;
  title: string;
  about: string;
  email: string;
  location: string;
  socials: Array<{
    name: string;
    url: string;
    icon: string;
  }>;
  education: Array<{
    degree: string;
    institution: string;
    period: string;
  }>;
  skills: string[];
}