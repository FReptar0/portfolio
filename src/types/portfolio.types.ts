export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: 'frontend' | 'backend' | 'fullstack' | 'devops';
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  metrics?: string;
  githubStars?: string;
  status: 'completed' | 'in-progress' | 'planned';
  year: number;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  technologies: string[];
  logo?: string;
  companyUrl?: string;
}

export interface Skill {
  name: string;
  proficiency: number; // 0-100
  years: number;
  icon: string;
  category: 'frontend' | 'backend' | 'devops' | 'architecture';
}

export interface SkillCategory {
  name: string;
  description: string;
  skills: Skill[];
}

export interface ProcessStep {
  title: string;
  description: string;
  icon: string;
  order: number;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface ContactForm {
  name: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
  budget?: string;
  timeline?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface AnimationVariant {
  hidden: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotate?: number;
  };
  visible: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotate?: number;
    transition?: {
      duration?: number;
      delay?: number;
      ease?: string | number[];
      stagger?: number;
    };
  };
}

export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
  };
  fonts: {
    sans: string[];
    mono: string[];
  };
}

export interface NavItem {
  name: string;
  href: string;
  external?: boolean;
}

export interface Stats {
  years: string;
  projects: string;
  teams: string;
}

export interface TerminalCommand {
  command: string;
  status: 'success' | 'error' | 'loading';
  delay?: number;
}