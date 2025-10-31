import { SkillCategory, ProcessStep } from '@/types/portfolio.types';

export const skillCategories: SkillCategory[] = [
  {
    name: 'Frontend',
    description: 'Interfaces modernas y experiencias de usuario excepcionales',
    skills: [
      {
        name: 'React',
        proficiency: 95,
        years: 5,
        icon: 'react',
        category: 'frontend'
      },
      {
        name: 'TypeScript',
        proficiency: 90,
        years: 4,
        icon: 'typescript',
        category: 'frontend'
      },
      {
        name: 'Next.js',
        proficiency: 88,
        years: 3,
        icon: 'nextjs',
        category: 'frontend'
      },
      {
        name: 'Vue.js',
        proficiency: 85,
        years: 3,
        icon: 'vue',
        category: 'frontend'
      },
      {
        name: 'Tailwind CSS',
        proficiency: 92,
        years: 3,
        icon: 'tailwind',
        category: 'frontend'
      },
      {
        name: 'Framer Motion',
        proficiency: 87,
        years: 2,
        icon: 'framer',
        category: 'frontend'
      }
    ]
  },
  {
    name: 'Backend',
    description: 'APIs robustas y arquitecturas escalables',
    skills: [
      {
        name: 'Node.js',
        proficiency: 93,
        years: 5,
        icon: 'nodejs',
        category: 'backend'
      },
      {
        name: 'Python',
        proficiency: 87,
        years: 4,
        icon: 'python',
        category: 'backend'
      },
      {
        name: 'Java',
        proficiency: 82,
        years: 3,
        icon: 'java',
        category: 'backend'
      },
      {
        name: 'PostgreSQL',
        proficiency: 88,
        years: 4,
        icon: 'postgresql',
        category: 'backend'
      },
      {
        name: 'MongoDB',
        proficiency: 85,
        years: 3,
        icon: 'mongodb',
        category: 'backend'
      },
      {
        name: 'GraphQL',
        proficiency: 83,
        years: 2,
        icon: 'graphql',
        category: 'backend'
      }
    ]
  },
  {
    name: 'DevOps',
    description: 'Automatización, monitoreo y despliegue continuo',
    skills: [
      {
        name: 'Docker',
        proficiency: 90,
        years: 4,
        icon: 'docker',
        category: 'devops'
      },
      {
        name: 'Kubernetes',
        proficiency: 85,
        years: 3,
        icon: 'kubernetes',
        category: 'devops'
      },
      {
        name: 'AWS',
        proficiency: 87,
        years: 4,
        icon: 'aws',
        category: 'devops'
      },
      {
        name: 'GitHub Actions',
        proficiency: 88,
        years: 3,
        icon: 'github',
        category: 'devops'
      },
      {
        name: 'Terraform',
        proficiency: 80,
        years: 2,
        icon: 'terraform',
        category: 'devops'
      },
      {
        name: 'Monitoring',
        proficiency: 85,
        years: 3,
        icon: 'monitoring',
        category: 'devops'
      }
    ]
  },
  {
    name: 'Arquitectura',
    description: 'Diseño de sistemas y patrones de software',
    skills: [
      {
        name: 'Microservicios',
        proficiency: 90,
        years: 4,
        icon: 'microservices',
        category: 'architecture'
      },
      {
        name: 'Event Sourcing',
        proficiency: 82,
        years: 3,
        icon: 'events',
        category: 'architecture'
      },
      {
        name: 'Domain Driven Design',
        proficiency: 85,
        years: 3,
        icon: 'design',
        category: 'architecture'
      },
      {
        name: 'API Design',
        proficiency: 93,
        years: 5,
        icon: 'api',
        category: 'architecture'
      },
      {
        name: 'System Design',
        proficiency: 88,
        years: 4,
        icon: 'system',
        category: 'architecture'
      },
      {
        name: 'Clean Architecture',
        proficiency: 86,
        years: 3,
        icon: 'clean',
        category: 'architecture'
      }
    ]
  }
];

export const processSteps: ProcessStep[] = [
  {
    title: 'Análisis',
    description: 'Comprendo los requisitos del negocio y defino la arquitectura técnica más adecuada',
    icon: 'analysis',
    order: 1
  },
  {
    title: 'Diseño',
    description: 'Creo prototipos, diseño la API y planifico la estructura de datos y componentes',
    icon: 'design',
    order: 2
  },
  {
    title: 'Desarrollo',
    description: 'Implemento la solución siguiendo mejores prácticas, TDD y code reviews',
    icon: 'development',
    order: 3
  },
  {
    title: 'Optimización',
    description: 'Monitoreo performance, optimizo código y mejoro la experiencia del usuario',
    icon: 'optimization',
    order: 4
  }
];