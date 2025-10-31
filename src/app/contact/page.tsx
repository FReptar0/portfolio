import { Metadata } from 'next';
import { Contact } from '@/components/sections/Contact';

export const metadata: Metadata = {
  title: 'Contacto | Fernando Rodriguez',
  description: 'Ponte en contacto conmigo para discutir tu próximo proyecto de desarrollo de software.',
};

export default function ContactPage() {
  return (
    <div className="pt-16">
      <Contact />
    </div>
  );
}