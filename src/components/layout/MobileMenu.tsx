"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Github, Linkedin, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/hooks/useI18n';
import { NAVIGATION_ITEMS, SOCIAL_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { t } = useI18n('common');
  const pathname = usePathname();

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    email: Mail
  };

  const menuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    open: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1],
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    closed: {
      opacity: 0,
      x: 50
    },
    open: {
      opacity: 1,
      x: 0
    }
  };

  const overlayVariants = {
    closed: {
      opacity: 0
    },
    open: {
      opacity: 1
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            className="fixed top-0 right-0 bottom-0 w-80 max-w-[80vw] bg-background border-l border-border shadow-2xl z-50 overflow-y-auto"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              {/* Header */}
              <motion.div
                className="flex items-center justify-between mb-8"
                variants={itemVariants}
              >
                <h2 className="text-xl font-bold gradient-text">Navegación</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="hover:bg-accent"
                >
                  <X className="h-5 w-5" />
                </Button>
              </motion.div>

              {/* Navigation Links */}
              <motion.nav className="space-y-6 mb-8" variants={itemVariants}>
                {NAVIGATION_ITEMS.map((item, index) => (
                  <motion.div
                    key={item.href}
                    variants={itemVariants}
                    whileHover={{ x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "block text-lg font-medium transition-colors py-2 px-4 rounded-lg",
                        pathname === item.href
                          ? "text-primary bg-primary/10"
                          : "text-foreground hover:text-primary hover:bg-accent"
                      )}
                    >
                      {t(item.name)}
                    </Link>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Social Links */}
              <motion.div variants={itemVariants}>
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                  Sígueme
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(SOCIAL_LINKS).map(([key, url]) => {
                    const Icon = socialIcons[key as keyof typeof socialIcons];
                    return (
                      <motion.div
                        key={key}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="w-full justify-start hover:bg-primary/10 hover:text-primary hover:border-primary/50"
                        >
                          <Link
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={onClose}
                            className="flex items-center"
                          >
                            <Icon className="h-4 w-4 mr-2" />
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </Link>
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Contact Info */}
              <motion.div className="mt-8 pt-6 border-t border-border" variants={itemVariants}>
                <h3 className="text-sm font-semibold text-muted-foreground mb-4 uppercase tracking-wider">
                  Contacto
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="text-muted-foreground">Email</p>
                    <Link
                      href="mailto:alex.rodriguez@example.com"
                      className="text-foreground hover:text-primary transition-colors"
                      onClick={onClose}
                    >
                      alex.rodriguez@example.com
                    </Link>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Ubicación</p>
                    <p className="text-foreground">Cuernavaca, México</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-green-600 dark:text-green-400">
                      Disponible para proyectos
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div className="mt-8" variants={itemVariants}>
                <Button
                  variant="gradient"
                  size="lg"
                  asChild
                  className="w-full"
                  onClick={onClose}
                >
                  <Link href="/contact">
                    Iniciemos un proyecto
                  </Link>
                </Button>
              </motion.div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div
                className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-teal-500/20 to-cyan-500/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 0.8, 1],
                  rotate: [360, 180, 0]
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}