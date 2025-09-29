import React from 'react';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { QuantumCard } from '@/components/ui/card';

interface QuantumFeatureProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

export const QuantumFeature: React.FC<QuantumFeatureProps> = ({ 
  title, 
  description, 
  icon: Icon,
  delay = 0 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className="group h-full"
    >
      <QuantumCard className="h-full relative overflow-hidden">
        {/* Animated background effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-quantum-500/5 to-neural-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Icon with animation */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="relative z-10 text-quantum-600 mb-4"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-quantum-400/20 blur-xl animate-pulse" />
            <Icon className="w-12 h-12 relative z-10" />
          </div>
        </motion.div>
        
        {/* Content */}
        <h3 className="relative z-10 text-xl font-semibold text-dark-primary mb-2">
          {title}
        </h3>
        <p className="relative z-10 text-gray-600">
          {description}
        </p>
        
        {/* Hover indicator */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-quantum transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
      </QuantumCard>
    </motion.div>
  );
};

// Grid of quantum features
interface QuantumFeatureGridProps {
  features: Array<{
    title: string;
    description: string;
    icon: LucideIcon;
  }>;
}

export const QuantumFeatureGrid: React.FC<QuantumFeatureGridProps> = ({ features }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {features.map((feature, index) => (
        <QuantumFeature
          key={feature.title}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
          delay={index * 0.1}
        />
      ))}
    </div>
  );
};