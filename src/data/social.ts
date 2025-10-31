import { SocialLink, TerminalCommand } from '@/types/portfolio.types';

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/alexrodriguez',
    icon: 'github'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/alexrodriguez',
    icon: 'linkedin'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/alexrodriguez',
    icon: 'twitter'
  },
  {
    name: 'Email',
    url: 'mailto:alex.rodriguez@example.com',
    icon: 'mail'
  }
];

export const terminalCommands: TerminalCommand[] = [
  {
    command: '$ git commit -m "Implementando nueva arquitectura"',
    status: 'success',
    delay: 0
  },
  {
    command: '$ docker-compose up -d',
    status: 'success',
    delay: 1000
  },
  {
    command: '$ npm run test -- --coverage',
    status: 'success',
    delay: 2000
  },
  {
    command: '$ kubectl apply -f deployment.yaml',
    status: 'success',
    delay: 3000
  },
  {
    command: '$ terraform apply',
    status: 'success',
    delay: 4000
  },
  {
    command: '$ Deploying to production...',
    status: 'success',
    delay: 5000
  }
];