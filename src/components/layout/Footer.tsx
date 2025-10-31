"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, ArrowUp, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/hooks/useI18n';
import { SOCIAL_LINKS, NAVIGATION_ITEMS } from '@/lib/constants';
import { smoothScrollTo } from '@/lib/utils';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations';

export function Footer() {
  const { t } = useI18n('common');

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialIcons = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    email: Mail
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Brand & Description */}
          <motion.div className="md:col-span-2" variants={staggerItem}>
            <div className="mb-4">
              <h3 className="text-2xl font-bold gradient-text mb-2">
                Fernando Rodriguez
              </h3>
              <p className="text-muted-foreground max-w-md">
                Ingeniero de Software Full-Stack especializado en crear 
                soluciones escalables y experiencias digitales excepcionales.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {Object.entries(SOCIAL_LINKS).map(([key, url]) => {
                const Icon = socialIcons[key as keyof typeof socialIcons];
                return (
                  <motion.div
                    key={key}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      className="hover:bg-primary/10 hover:text-primary"
                    >
                      <Link
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${key} profile`}
                      >
                        <Icon className="h-5 w-5" />
                      </Link>
                    </Button>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={staggerItem}>
            <h4 className="text-lg font-semibold mb-4">Navegación</h4>
            <nav className="space-y-3">
              {NAVIGATION_ITEMS.map((item) => (
                <div key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-primary transition-colors block"
                  >
                    {t(item.name)}
                  </Link>
                </div>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={staggerItem}>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <div className="space-y-3 text-muted-foreground">
              <div>
                <p className="text-sm">Email</p>
                <Link
                  href="mailto:fmemije00@gmail.com"
                  className="hover:text-primary transition-colors"
                >
                  fmemije00@gmail.com
                </Link>
              </div>
              <div>
                <p className="text-sm">Ubicación</p>
                <p>Cuernavaca, México</p>
              </div>
              <div>
                <p className="text-sm">Disponibilidad</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm">Disponible para proyectos</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-2 text-muted-foreground text-sm mb-4 md:mb-0">
            <span>© 2024 Fernando Rodriguez.</span>
            <span>Hecho con</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
            >
              <Heart className="h-4 w-4 fill-red-500 text-red-500" />
            </motion.div>
            <span>usando Next.js y Tailwind CSS</span>
          </div>

          {/* Back to top button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={handleScrollToTop}
              className="group hover:bg-primary/10 hover:text-primary"
            >
              <ArrowUp className="h-4 w-4 mr-2 group-hover:animate-bounce" />
              {t('actions.back_to_top')}
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-500/10 to-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 20, 0],
            scale: [1, 0.9, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
    </footer>
  );
}