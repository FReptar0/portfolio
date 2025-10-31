export const SITE_CONFIG = {
  name: "Fernando Rodriguez",
  title: "Ingeniero de Software Full-Stack",
  description: "Transformo ideas complejas en soluciones elegantes. Especializado en arquitecturas escalables, con experiencia liderando equipos y optimizando sistemas de alto rendimiento.",
  url: "https://fernandorodriguez.dev",
  email: "fmemije00@gmail.com",
  phone: "+52 777 123 4567",
  location: "Cuernavaca, México"
} as const;

export const NAVIGATION_ITEMS = [
  { name: 'navigation.home', href: '/' },
  { name: 'navigation.about', href: '/#about' },
  { name: 'navigation.projects', href: '/projects' },
  { name: 'navigation.experience', href: '/experience' },
  { name: 'navigation.contact', href: '/contact' }
] as const;

export const SOCIAL_LINKS = {
  github: "https://github.com/FReptar0",
  linkedin: "https://linkedin.com/in/fernando-rm",
  email: "mailto:fmemije00@gmail.com"
} as const;

export const TECH_CATEGORIES = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  DEVOPS: 'devops',
  ARCHITECTURE: 'architecture'
} as const;

export const PROJECT_CATEGORIES = {
  FRONTEND: 'frontend',
  BACKEND: 'backend',
  FULLSTACK: 'fullstack',
  DEVOPS: 'devops'
} as const;

export const CONTACT_FORM_CONFIG = {
  budgetOptions: [
    "< $100,000 MXN",
    "$100,000 - $300,000 MXN",
    "$300,000 - $1,000,000 MXN",
    "$1,000,000+ MXN",
    "A discutir"
  ],
  timelineOptions: [
    "< 1 mes",
    "1-3 meses",
    "3-6 meses",
    "6+ meses",
    "A discutir"
  ]
} as const;

export const ANIMATION_DURATIONS = {
  FAST: 0.3,
  NORMAL: 0.6,
  SLOW: 1.0,
  VERY_SLOW: 1.5
} as const;

export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536
} as const;

export const SCROLL_OFFSETS = {
  NAVBAR_HEIGHT: 80,
  SECTION_PADDING: 100
} as const;

export const LOTTIE_ANIMATIONS = {
  coding: '/animations/coding.json',
  analysis: '/animations/analysis.json',
  design: '/animations/design.json',
  development: '/animations/development.json',
  optimization: '/animations/optimization.json',
  success: '/animations/success.json',
  loading: '/animations/loading.json'
} as const;

export const FEATURED_PROJECTS_LIMIT = 4;
export const PROJECTS_PER_PAGE = 6;

export const SEO_CONFIG = {
  defaultTitle: "Fernando Rodriguez - Ingeniero de Software Full-Stack",
  titleTemplate: "%s | Fernando Rodriguez",
  defaultDescription: "Transformo ideas complejas en soluciones elegantes. Especializado en arquitecturas escalables, con experiencia liderando equipos y optimizando sistemas de alto rendimiento.",
  siteUrl: "https://fernandorodriguez.dev",
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: "Fernando Rodriguez Portfolio"
  }
} as const;

export const THEME_CONFIG = {
  defaultTheme: "dark",
  storageKey: "portfolio-theme"
} as const;

export const COMMAND_PALETTE_SHORTCUTS = {
  TOGGLE: "cmd+k",
  ESCAPE: "escape",
  ARROW_UP: "arrowup",
  ARROW_DOWN: "arrowdown",
  ENTER: "enter"
} as const;

export const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp", 
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "KeyB",
  "KeyA"
] as const;

export const PERFORMANCE_THRESHOLDS = {
  CRITICAL_RESOURCE_TIME: 2500,
  LARGEST_CONTENTFUL_PAINT: 2500,
  FIRST_INPUT_DELAY: 100,
  CUMULATIVE_LAYOUT_SHIFT: 0.1
} as const;

export const API_ENDPOINTS = {
  CONTACT: '/api/contact',
  ANALYTICS: '/api/analytics'
} as const;