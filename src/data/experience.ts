import { Experience } from '@/types/portfolio.types';

export const experiences: Experience[] = [
  {
    id: 'tech-corp-senior-lead',
    role: 'Líder Técnico Senior',
    company: 'Tech Corp',
    period: '2023 - Presente',
    location: 'Cuernavaca, México',
    description: 'Liderando equipo de 8 desarrolladores en la arquitectura y desarrollo de plataformas cloud-native. Implementación de CI/CD y mejores prácticas DevOps.',
    achievements: [
      'Redujo tiempo de deploy en 70% implementando pipelines automatizados',
      'Arquitectó sistema de microservicios que maneja 1M+ requests/día',
      'Mentorizó 5 desarrolladores junior, 3 promovidos a roles senior',
      'Implementó estrategia de testing que redujo bugs en producción 80%'
    ],
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions'],
    logo: '/images/companies/tech-corp.svg',
    companyUrl: 'https://techcorp.com'
  },
  {
    id: 'startupxyz-fullstack',
    role: 'Full-Stack Developer',
    company: 'StartupXYZ',
    period: '2021 - 2023',
    location: 'Cuernavaca, México',
    description: 'Desarrollo end-to-end de aplicaciones web escalables, desde el diseño de APIs hasta interfaces de usuario modernas. Colaboración directa con product managers y diseñadores.',
    achievements: [
      'Desarrolló MVP que atrajo $2M en funding Series A',
      'Implementó sistema de pagos procesando $500k+ mensuales',
      'Optimizó performance web mejorando Core Web Vitals en 60%',
      'Diseñó arquitectura frontend que soporta 50k+ usuarios activos'
    ],
    technologies: ['Vue.js', 'Python', 'Django', 'PostgreSQL', 'Redis', 'Stripe', 'AWS', 'Docker'],
    logo: '/images/companies/startupxyz.svg',
    companyUrl: 'https://startupxyz.com'
  },
  {
    id: 'enterprise-backend',
    role: 'Backend Developer',
    company: 'Enterprise Inc',
    period: '2019 - 2021',
    location: 'Cuernavaca, México',
    description: 'Especializado en desarrollo de APIs REST y GraphQL, bases de datos relacionales y no relacionales, y sistemas de alta concurrencia.',
    achievements: [
      'Migró monolito legacy a arquitectura de microservicios',
      'Implementó caching distribuido reduciendo latencia 80%',
      'Diseñó schema de BD optimizado para 10M+ registros',
      'Desarrolló APIs REST procesando 100k+ requests/hora'
    ],
    technologies: ['Java', 'Spring Boot', 'MongoDB', 'Apache Kafka', 'Elasticsearch', 'Docker', 'Jenkins'],
    logo: '/images/companies/enterprise.svg',
    companyUrl: 'https://enterprise-inc.com'
  },
  {
    id: 'freelance-developer',
    role: 'Freelance Developer',
    company: 'Freelance',
    period: '2018 - 2019',
    location: 'Remoto',
    description: 'Desarrollo de soluciones web personalizadas para pequeñas y medianas empresas. Especialización en e-commerce y sistemas de gestión.',
    achievements: [
      'Completó 15+ proyectos para clientes internacionales',
      'Desarrolló 3 tiendas online que generaron €200k+ en ventas',
      'Implementó sistemas CRM que mejoraron eficiencia 40%',
      'Mantuvo rating 5⭐ en plataformas freelance'
    ],
    technologies: ['PHP', 'Laravel', 'MySQL', 'jQuery', 'Bootstrap', 'WordPress'],
    logo: '/images/companies/freelance.svg'
  }
];