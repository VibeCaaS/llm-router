import React from 'react';
import { Link } from 'wouter';
import { 
  Zap, 
  Mail, 
  Phone, 
  MapPin, 
  Github, 
  Linkedin, 
  Twitter,
  Youtube,
  ArrowUpRight
} from 'lucide-react';
import { NvidiaPartnerBadgeCompact } from '@/components/NvidiaPartnerBadge';

const footerLinks = {
  solutions: [
    { label: 'Quantum Computing', href: '/solutions/quantum' },
    { label: 'AI Integration', href: '/solutions/ai' },
    { label: 'Enterprise Platform', href: '/solutions/enterprise' },
    { label: 'Cloud Services', href: '/solutions/cloud' },
  ],
  products: [
    { label: 'Quantum SDK', href: '/products/sdk' },
    { label: 'Neural Processor', href: '/products/processor' },
    { label: 'API Access', href: '/products/api' },
    { label: 'Developer Tools', href: '/products/tools' },
  ],
  resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'API Reference', href: '/api' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'Blog', href: '/blog' },
    { label: 'Research Papers', href: '/research' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers', badge: 'Hiring' },
    { label: 'Partners', href: '/partners' },
    { label: 'Press', href: '/press' },
    { label: 'Contact', href: '/contact' },
  ],
};

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <Link href="/">
                <a className="flex items-center space-x-3 group mb-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-quantum blur-xl opacity-30 group-hover:opacity-50 transition-opacity" />
                    <div className="relative w-10 h-10 bg-gradient-quantum rounded-lg flex items-center justify-center">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <span className="text-2xl font-bold">
                    <span className="text-gradient">NeuralQuantum</span>
                    <span className="text-gray-700">.ai</span>
                  </span>
                </a>
              </Link>
              
              <p className="text-gray-600 mb-6 max-w-xs">
                Pioneering the convergence of quantum computing and artificial intelligence 
                for next-generation enterprise solutions.
              </p>
              
              {/* NVIDIA Badge */}
              <div className="mb-6">
                <NvidiaPartnerBadgeCompact />
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-500 hover:text-quantum-600 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Links Columns */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Solutions</h3>
              <ul className="space-y-3">
                {footerLinks.solutions.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <a className="text-gray-600 hover:text-quantum-600 transition-colors">
                        {link.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Products</h3>
              <ul className="space-y-3">
                {footerLinks.products.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <a className="text-gray-600 hover:text-quantum-600 transition-colors">
                        {link.label}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Resources</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <a className="text-gray-600 hover:text-quantum-600 transition-colors flex items-center group">
                        {link.label}
                        {link.href.startsWith('/docs') && (
                          <ArrowUpRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        )}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>
                      <a className="text-gray-600 hover:text-quantum-600 transition-colors flex items-center gap-2">
                        {link.label}
                        {link.badge && (
                          <span className="px-2 py-0.5 text-xs font-semibold bg-quantum-100 text-quantum-700 rounded-full">
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Contact Info Bar */}
        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-col sm:flex-row gap-6 text-sm text-gray-600">
              <a href="mailto:info@neuralquantum.ai" className="flex items-center gap-2 hover:text-quantum-600 transition-colors">
                <Mail className="w-4 h-4" />
                info@neuralquantum.ai
              </a>
              <a href="tel:+1-555-QUANTUM" className="flex items-center gap-2 hover:text-quantum-600 transition-colors">
                <Phone className="w-4 h-4" />
                +1-555-QUANTUM
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Silicon Valley, CA
              </span>
            </div>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} NeuralQuantum.ai. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <Link href="/privacy">
                <a className="text-gray-600 hover:text-quantum-600 transition-colors">
                  Privacy Policy
                </a>
              </Link>
              <Link href="/terms">
                <a className="text-gray-600 hover:text-quantum-600 transition-colors">
                  Terms of Service
                </a>
              </Link>
              <Link href="/cookies">
                <a className="text-gray-600 hover:text-quantum-600 transition-colors">
                  Cookie Policy
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};