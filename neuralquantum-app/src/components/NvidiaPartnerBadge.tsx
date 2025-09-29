import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Award, Shield } from 'lucide-react';

export const NvidiaPartnerBadge: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="nvidia-partnership-badge relative overflow-hidden"
    >
      {/* Animated glow effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-nvidia-green/20 to-transparent animate-pulse" />
      </div>
      
      <div className="relative z-10 flex items-center justify-center space-x-4">
        <Shield className="w-8 h-8 text-nvidia-green" />
        <div className="text-center">
          <p className="nvidia-badge-text flex items-center gap-2">
            <span>Powered by</span>
            <span className="text-lg font-bold">NVIDIA</span>
            <span>Partnership</span>
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Accelerating Quantum-AI Innovation Together
          </p>
        </div>
        <Award className="w-8 h-8 text-nvidia-green" />
      </div>
    </motion.div>
  );
};

// Compact version for sidebars or smaller spaces
export const NvidiaPartnerBadgeCompact: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-3 bg-gradient-to-r from-nvidia-green/5 to-nvidia-green/10 rounded-lg border border-nvidia-green/20">
      <Cpu className="w-5 h-5 text-nvidia-green mr-2" />
      <span className="text-sm font-semibold text-nvidia-green">
        NVIDIA Partner
      </span>
    </div>
  );
};