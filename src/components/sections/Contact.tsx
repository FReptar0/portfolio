"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Copy, Check, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge, StatusBadge } from '@/components/ui/badge';
import { ScrollReveal, FadeInSection } from '@/components/animations/ScrollReveal';
import { useI18n } from '@/hooks/useI18n';
import { terminalCommands } from '@/data/social';
import { copyToClipboard } from '@/lib/utils';

export function Contact() {
  const { t } = useI18n('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    subject: '',
    message: '',
    budget: '',
    timeline: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [currentCommand, setCurrentCommand] = useState(0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    // Reset form or show success message
  };

  const handleCopyEmail = async () => {
    const success = await copyToClipboard('fmemije00@gmail.com');
    if (success) {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  // Terminal animation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCommand(prev => (prev + 1) % terminalCommands.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Mail className="h-4 w-4 mr-2" />
              Contacto
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t('title')}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('subtitle')}
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <FadeInSection direction="left">
            <div className="bg-card rounded-xl p-8 border shadow-sm">
              <h3 className="text-xl font-semibold mb-6">Envíame un mensaje</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('form.name.label')}
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t('form.name.placeholder')}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('form.email.label')}
                    </label>
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t('form.email.placeholder')}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('form.company.label')}
                  </label>
                  <Input
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder={t('form.company.placeholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('form.subject.label')}
                  </label>
                  <Input
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder={t('form.subject.placeholder')}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('form.budget.label')}
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Seleccionar...</option>
                      {['< $100,000 MXN', '$100,000 - $300,000 MXN', '$300,000 - $1,000,000 MXN', '$1,000,000+ MXN', 'A discutir'].map((option: string, index: number) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      {t('form.timeline.label')}
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <option value="">Seleccionar...</option>
                      {['< 1 mes', '1-3 meses', '3-6 meses', '6+ meses', 'A discutir'].map((option: string, index: number) => (
                        <option key={index} value={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('form.message.label')}
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t('form.message.placeholder')}
                    rows={6}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  variant="gradient"
                  size="lg"
                  className="w-full"
                  loading={isSubmitting}
                >
                  {isSubmitting ? (
                    t('form.sending')
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      {t('form.submit')}
                    </>
                  )}
                </Button>
              </form>
            </div>
          </FadeInSection>

          {/* Contact Info & Terminal */}
          <div className="space-y-8">
            {/* Contact Information */}
            <FadeInSection direction="right">
              <div className="bg-card rounded-xl p-8 border shadow-sm">
                <h3 className="text-xl font-semibold mb-6">Información de contacto</h3>
                
                <div className="space-y-6">
                  {/* Availability */}
                  <div>
                    <h4 className="font-medium mb-3">{t('availability.status')}</h4>
                    <div className="space-y-2">
                      <StatusBadge status="online">
                        {t('availability.status')}
                      </StatusBadge>
                      <p className="text-sm text-muted-foreground">
                        {t('availability.response_time')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {t('availability.location')}
                      </p>
                    </div>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Mail className="h-4 w-4 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Email</p>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">fmemije00@gmail.com</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopyEmail}
                            className="h-auto p-1 text-primary hover:text-primary/80"
                          >
                            {emailCopied ? (
                              <Check className="h-3 w-3" />
                            ) : (
                              <Copy className="h-3 w-3" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Phone className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Teléfono</p>
                        <p className="font-medium">+52 777 123 4567</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <MapPin className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Ubicación</p>
                        <p className="font-medium">Cuernavaca, México</p>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full" asChild>
                      <a href="#" target="_blank" className="flex items-center justify-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        Agendar reunión
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </FadeInSection>

            {/* Terminal */}
            <FadeInSection direction="right" delay={0.2}>
              <div className="bg-gray-900 rounded-xl p-6 border shadow-sm font-mono text-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-400 ml-2">terminal</span>
                </div>
                
                <div className="space-y-2 text-green-400">
                  {terminalCommands.slice(0, currentCommand + 1).map((cmd, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "100%" }}
                      transition={{ duration: 0.8, delay: index * 0.5 }}
                      className="flex items-center"
                    >
                      <span>{cmd.command}</span>
                      <span className="ml-2 text-green-400">✓</span>
                    </motion.div>
                  ))}
                  <motion.div
                    className="flex items-center"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    <span className="bg-green-400 w-2 h-4 inline-block"></span>
                  </motion.div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </div>
    </section>
  );
}