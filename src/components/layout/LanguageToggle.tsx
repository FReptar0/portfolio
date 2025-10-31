"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  region: string;
}

const languages: Language[] = [
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    flag: '🇲🇽',
    region: 'México'
  },
  {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    flag: '🇺🇸',
    region: 'United States'
  }
];

export function LanguageToggle() {
  const [currentLang, setCurrentLang] = useState('es');
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    // Get saved language or detect from browser
    const savedLang = localStorage.getItem('preferred-language');
    const browserLang = navigator.language.split('-')[0];
    
    if (savedLang && languages.find(l => l.code === savedLang)) {
      setCurrentLang(savedLang);
    } else if (languages.find(l => l.code === browserLang)) {
      setCurrentLang(browserLang);
    }
  }, []);

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode);
    localStorage.setItem('preferred-language', langCode);
    setIsOpen(false);
    
    // Trigger language change event
    window.dispatchEvent(new CustomEvent('languageChange', { 
      detail: { language: langCode } 
    }));
    
    // Update document language
    document.documentElement.lang = langCode;
  };

  const currentLanguage = languages.find(l => l.code === currentLang) || languages[0];

  if (!isClient) {
    return null; // Prevent hydration mismatch
  }

  return (
    <div className="relative">
      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-2 hover:bg-accent/20 text-foreground hover:text-foreground border border-border/20 hover:border-border/40"
      >
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span className="hidden sm:inline text-foreground">{currentLanguage.nativeName}</span>
        <span className="text-lg">{currentLanguage.flag}</span>
      </Button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Menu */}
            <motion.div
              className="absolute top-full right-0 mt-2 w-64 bg-background border border-border rounded-lg shadow-lg z-50 overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-border bg-muted/30">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-primary" />
                  <span className="font-medium text-foreground">Choose Language</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Select your preferred language
                </p>
              </div>

              {/* Language Options */}
              <div className="py-2">
                {languages.map((language) => (
                  <motion.button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-accent/50 transition-colors ${
                      currentLang === language.code ? 'bg-accent/30' : ''
                    }`}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-2xl">{language.flag}</span>
                    <div className="flex-1 text-left">
                      <div className="font-medium text-foreground">
                        {language.nativeName}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {language.name} • {language.region}
                      </div>
                    </div>
                    {currentLang === language.code && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-primary"
                      >
                        <Check className="h-4 w-4" />
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 border-t border-border bg-muted/30">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>🇲🇽 Proudly Mexican</span>
                  <Badge variant="amber" size="sm">
                    Global Ready
                  </Badge>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}