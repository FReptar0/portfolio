"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Command, 
  Home, 
  User, 
  Briefcase, 
  Code, 
  Mail, 
  Github, 
  Linkedin, 
  Twitter,
  Download,
  Sun,
  Moon,
  Globe,
  Zap,
  Coffee,
  Heart
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface CommandItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  action: () => void;
  category: 'navigation' | 'actions' | 'social' | 'easter-eggs';
  keywords?: string[];
  shortcut?: string;
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  // Custom event listener for trigger button
  useEffect(() => {
    const handleCustomOpen = () => {
      setIsOpen(true);
      setQuery('');
      setSelectedIndex(0);
    };

    window.addEventListener('openCommandPalette', handleCustomOpen);
    return () => window.removeEventListener('openCommandPalette', handleCustomOpen);
  }, []);

  // Easter egg counter
  const [easterEggCount, setEasterEggCount] = useState(0);

  const commands: CommandItem[] = [
    // Navigation
    {
      id: 'home',
      title: 'Ir al Inicio',
      description: 'Navega a la página principal',
      icon: Home,
      action: () => router.push('/'),
      category: 'navigation',
      keywords: ['inicio', 'home', 'principal'],
      shortcut: 'H'
    },
    {
      id: 'about',
      title: 'Sobre Mí',
      description: 'Conoce mi historia y valores',
      icon: User,
      action: () => router.push('/#about'),
      category: 'navigation',
      keywords: ['sobre', 'about', 'historia', 'bio'],
      shortcut: 'A'
    },
    {
      id: 'projects',
      title: 'Ver Proyectos',
      description: 'Explora mis casos de estudio',
      icon: Briefcase,
      action: () => router.push('/projects'),
      category: 'navigation',
      keywords: ['proyectos', 'projects', 'portfolio', 'trabajo'],
      shortcut: 'P'
    },
    {
      id: 'skills',
      title: 'Competencias Técnicas',
      description: 'Stack tecnológico y experiencia',
      icon: Code,
      action: () => router.push('/#skills'),
      category: 'navigation',
      keywords: ['skills', 'competencias', 'tecnologias', 'stack'],
      shortcut: 'S'
    },
    {
      id: 'contact',
      title: 'Contacto',
      description: 'Iniciemos un proyecto juntos',
      icon: Mail,
      action: () => router.push('/contact'),
      category: 'navigation',
      keywords: ['contacto', 'contact', 'email', 'mensaje'],
      shortcut: 'C'
    },

    // Actions
    {
      id: 'download-cv',
      title: 'Descargar CV',
      description: 'Obtén mi currículum en PDF',
      icon: Download,
      action: () => {
        // Mock CV download
        const link = document.createElement('a');
        link.href = '/cv-fernando-rodriguez.pdf';
        link.download = 'Fernando-Rodriguez-CV.pdf';
        link.click();
      },
      category: 'actions',
      keywords: ['cv', 'curriculum', 'resume', 'descargar', 'pdf'],
      shortcut: 'D'
    },
    {
      id: 'theme-toggle',
      title: 'Cambiar Tema',
      description: 'Alternar entre modo claro y oscuro',
      icon: Sun,
      action: () => {
        // Mock theme toggle
        document.documentElement.classList.toggle('light');
      },
      category: 'actions',
      keywords: ['tema', 'theme', 'dark', 'light', 'modo'],
      shortcut: 'T'
    },

    // Social
    {
      id: 'github',
      title: 'GitHub Profile',
      description: 'Ver mis repositorios públicos',
      icon: Github,
      action: () => window.open('https://github.com/fernandorodriguez', '_blank'),
      category: 'social',
      keywords: ['github', 'code', 'repositorios', 'codigo'],
    },
    {
      id: 'linkedin',
      title: 'LinkedIn Profile',
      description: 'Conectar profesionalmente',
      icon: Linkedin,
      action: () => window.open('https://linkedin.com/in/fernandorodriguez', '_blank'),
      category: 'social',
      keywords: ['linkedin', 'professional', 'network', 'conectar'],
    },
    {
      id: 'twitter',
      title: 'Twitter/X Profile',
      description: 'Sígueme para updates técnicos',
      icon: Twitter,
      action: () => window.open('https://twitter.com/fernandorodriguez', '_blank'),
      category: 'social',
      keywords: ['twitter', 'x', 'social', 'tech', 'updates'],
    },

    // Easter Eggs
    {
      id: 'coffee',
      title: '☕ Modo Cafeína',
      description: 'Activar productividad mexicana (requires coffee)',
      icon: Coffee,
      action: () => {
        setEasterEggCount(prev => prev + 1);
        // Add coffee animation or effect
        document.body.style.filter = 'sepia(0.3) saturate(1.5)';
        setTimeout(() => {
          document.body.style.filter = '';
        }, 3000);
      },
      category: 'easter-eggs',
      keywords: ['coffee', 'cafe', 'energia', 'productividad', 'mexicano'],
    },
    {
      id: 'konami',
      title: '🇲🇽 Orgullo Mexicano',
      description: 'Mostrar bandera mexicana (hidden gem)',
      icon: Heart,
      action: () => {
        setEasterEggCount(prev => prev + 1);
        // Mexican flag animation
        const flag = document.createElement('div');
        flag.innerHTML = '🇲🇽';
        flag.style.cssText = `
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 8rem;
          z-index: 9999;
          animation: pulse 2s ease-in-out;
        `;
        document.body.appendChild(flag);
        setTimeout(() => flag.remove(), 2000);
      },
      category: 'easter-eggs',
      keywords: ['mexico', 'bandera', 'orgullo', 'cultura', 'flag'],
    },
    {
      id: 'matrix',
      title: '⚡ Matrix Mode',
      description: 'Enter the code matrix (developer mode)',
      icon: Zap,
      action: () => {
        setEasterEggCount(prev => prev + 1);
        // Matrix rain effect
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 9998;
          pointer-events: none;
        `;
        document.body.appendChild(canvas);
        
        // Simple matrix effect
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const chars = 'FERNANDO_RODRIGUEZ_CUERNAVACA_MEXICO_REACT_NODE_AWS'.split('');
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];
        
        for (let i = 0; i < columns; i++) {
          drops[i] = 1;
        }
        
        const draw = () => {
          if (!ctx) return;
          
          ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          
          ctx.fillStyle = '#0F0';
          ctx.font = `${fontSize}px monospace`;
          
          for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
              drops[i] = 0;
            }
            drops[i]++;
          }
        };
        
        const interval = setInterval(draw, 35);
        setTimeout(() => {
          clearInterval(interval);
          canvas.remove();
        }, 5000);
      },
      category: 'easter-eggs',
      keywords: ['matrix', 'code', 'developer', 'hacker', 'green'],
    }
  ];

  const filteredCommands = commands.filter(command => {
    if (!query) return true;
    
    const searchTerms = [
      command.title.toLowerCase(),
      command.description.toLowerCase(),
      ...(command.keywords || [])
    ];
    
    return searchTerms.some(term => 
      term.includes(query.toLowerCase())
    );
  });

  const groupedCommands = filteredCommands.reduce((acc, command) => {
    if (!acc[command.category]) {
      acc[command.category] = [];
    }
    acc[command.category].push(command);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ⌘K or Ctrl+K to open/close
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setQuery('');
        setSelectedIndex(0);
        return;
      }

      // Escape to close
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
        setSelectedIndex(0);
        return;
      }

      if (!isOpen) return;

      // Arrow navigation
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredCommands.length - 1 ? prev + 1 : prev
        );
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
      }

      // Enter to execute
      if (e.key === 'Enter') {
        e.preventDefault();
        const selectedCommand = filteredCommands[selectedIndex];
        if (selectedCommand) {
          selectedCommand.action();
          setIsOpen(false);
          setQuery('');
          setSelectedIndex(0);
        }
      }

      // Direct shortcuts when command palette is open
      if (e.key.length === 1 && !e.metaKey && !e.ctrlKey) {
        const shortcutCommand = commands.find(cmd => 
          cmd.shortcut?.toLowerCase() === e.key.toLowerCase()
        );
        if (shortcutCommand && query === '') {
          e.preventDefault();
          shortcutCommand.action();
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, query, selectedIndex, filteredCommands]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const categoryLabels = {
    'navigation': 'Navegación',
    'actions': 'Acciones',
    'social': 'Redes Sociales',
    'easter-eggs': 'Easter Eggs'
  };

  const categoryIcons = {
    'navigation': Home,
    'actions': Zap,
    'social': Globe,
    'easter-eggs': Coffee
  };

  return (
    <>

      {/* Command Palette */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Palette */}
            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl mx-4 z-50"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-background border border-border rounded-xl shadow-2xl overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 p-4 border-b border-border">
                  <Search className="h-5 w-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Buscar comandos... (prueba 'coffee' o 'matrix')"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none"
                    autoFocus
                  />
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" size="sm">ESC</Badge>
                    {easterEggCount > 0 && (
                      <Badge variant="amber" size="sm">
                        🎉 {easterEggCount}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Commands List */}
                <div className="max-h-96 overflow-y-auto">
                  {Object.entries(groupedCommands).map(([category, categoryCommands]) => (
                    <div key={category}>
                      {/* Category Header */}
                      <div className="px-4 py-2 bg-muted/50 flex items-center gap-2">
                        {React.createElement(categoryIcons[category as keyof typeof categoryIcons], {
                          className: "h-4 w-4 text-primary"
                        })}
                        <span className="text-sm font-medium text-foreground">
                          {categoryLabels[category as keyof typeof categoryLabels]}
                        </span>
                      </div>

                      {/* Commands */}
                      {categoryCommands.map((command, index) => {
                        const globalIndex = filteredCommands.indexOf(command);
                        const isSelected = selectedIndex === globalIndex;
                        
                        return (
                          <motion.button
                            key={command.id}
                            onClick={() => {
                              command.action();
                              setIsOpen(false);
                              setQuery('');
                              setSelectedIndex(0);
                            }}
                            className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-accent/50 transition-colors ${
                              isSelected ? 'bg-accent/70' : ''
                            }`}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            <command.icon className="h-5 w-5 text-primary flex-shrink-0" />
                            <div className="flex-1 text-left">
                              <div className="font-medium text-foreground">
                                {command.title}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {command.description}
                              </div>
                            </div>
                            {command.shortcut && (
                              <Badge variant="outline" size="sm">
                                {command.shortcut}
                              </Badge>
                            )}
                          </motion.button>
                        );
                      })}
                    </div>
                  ))}

                  {filteredCommands.length === 0 && (
                    <div className="px-4 py-8 text-center text-muted-foreground">
                      <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No se encontraron comandos</p>
                      <p className="text-sm">Prueba 'projects', 'skills' o 'coffee' 😉</p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 bg-muted/30 border-t border-border">
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Badge variant="outline" size="sm">↑↓</Badge>
                        Navegar
                      </span>
                      <span className="flex items-center gap-1">
                        <Badge variant="outline" size="sm">⏎</Badge>
                        Ejecutar
                      </span>
                    </div>
                    <span>
                      {filteredCommands.length} comando{filteredCommands.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}