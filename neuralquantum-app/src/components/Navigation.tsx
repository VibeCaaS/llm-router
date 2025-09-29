import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Cpu, Brain, Zap, Users, FileText } from 'lucide-react';
import { Link } from 'wouter';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navItems = [
  {
    label: 'Solutions',
    href: '/solutions',
    icon: <Cpu className="w-4 h-4" />,
    children: [
      { label: 'Quantum Computing', href: '/solutions/quantum' },
      { label: 'AI Integration', href: '/solutions/ai' },
      { label: 'Enterprise Platform', href: '/solutions/enterprise' },
    ],
  },
  {
    label: 'Products',
    href: '/products',
    icon: <Brain className="w-4 h-4" />,
    children: [
      { label: 'Quantum SDK', href: '/products/sdk' },
      { label: 'Neural Processor', href: '/products/processor' },
      { label: 'Cloud Services', href: '/products/cloud' },
    ],
  },
  {
    label: 'Resources',
    href: '/resources',
    icon: <FileText className="w-4 h-4" />,
    children: [
      { label: 'Documentation', href: '/docs' },
      { label: 'API Reference', href: '/api' },
      { label: 'Tutorials', href: '/tutorials' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    label: 'Company',
    href: '/company',
    icon: <Users className="w-4 h-4" />,
    children: [
      { label: 'About Us', href: '/about' },
      { label: 'Partners', href: '/partners' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

export const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          isScrolled
            ? 'bg-white/80 backdrop-blur-lg shadow-lg border-b border-gray-200'
            : 'bg-white/60 backdrop-blur-sm'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/">
              <a className="flex items-center space-x-3 group">
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

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="flex items-center space-x-1 text-gray-700 hover:text-quantum-600 transition-colors py-2">
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>

                  <AnimatePresence>
                    {activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden"
                      >
                        {item.children?.map((child) => (
                          <Link key={child.href} href={child.href}>
                            <a className="block px-4 py-3 text-gray-700 hover:bg-quantum-50 hover:text-quantum-700 transition-colors">
                              {child.label}
                            </a>
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
              <Button variant="default" size="sm">
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-white border-t border-gray-200"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <div key={item.label}>
                    <div className="font-semibold text-gray-900 mb-2">{item.label}</div>
                    <div className="pl-4 space-y-2">
                      {item.children?.map((child) => (
                        <Link key={child.href} href={child.href}>
                          <a className="block py-2 text-gray-600 hover:text-quantum-600 transition-colors">
                            {child.label}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
                <div className="pt-4 space-y-2">
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                  <Button variant="default" className="w-full">
                    Get Started
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
};