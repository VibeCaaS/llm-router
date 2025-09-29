import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ParticleBackground, QuantumOrbs } from '@/components/ParticleBackground';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  onPrimaryCTA?: () => void;
  onSecondaryCTA?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Where AI Meets Quantum Computing",
  subtitle = "NeuralQuantum.ai",
  description = "Pioneering the future of intelligent computing with quantum-enhanced AI solutions for enterprise innovation.",
  primaryCTA = "Start Your Quantum Journey",
  secondaryCTA = "Explore Solutions",
  onPrimaryCTA,
  onSecondaryCTA,
}) => {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Effects */}
      <ParticleBackground />
      <QuantumOrbs />
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-50" />
      
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-quantum-100/80 backdrop-blur-sm border border-quantum-200 mb-8"
        >
          <Sparkles className="w-4 h-4 text-quantum-600" />
          <span className="text-sm font-medium text-quantum-700">
            Quantum Computing Revolution
          </span>
        </motion.div>
        
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-dark-primary mb-6">
            <span className="block mb-2 text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-600">
              {subtitle}
            </span>
            <span className="text-gradient inline-block animate-gradient-shift bg-clip-text">
              {title}
            </span>
          </h1>
        </motion.div>
        
        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
        
        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            size="lg"
            variant="quantum"
            onClick={onPrimaryCTA}
            className="group"
          >
            {primaryCTA}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            size="lg"
            variant="secondary"
            onClick={onSecondaryCTA}
          >
            {secondaryCTA}
          </Button>
        </motion.div>
        
        {/* Floating Icons */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 text-quantum-400 opacity-20"
        >
          <Brain className="w-16 h-16" />
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 right-10 text-energy-400 opacity-20"
        >
          <Zap className="w-20 h-20" />
        </motion.div>
        
        {/* Stats or Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Quantum Qubits', value: '1000+' },
            { label: 'Processing Speed', value: '10x' },
            { label: 'Enterprise Clients', value: '500+' },
            { label: 'Patents Filed', value: '50+' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-quantum-600 mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};