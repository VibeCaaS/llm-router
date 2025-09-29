import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Cpu, 
  Zap,
  Code
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, QuantumCard } from '@/components/ui/card';
import { QuantumOrbs } from '@/components/ParticleBackground';

export const ComponentShowcase: React.FC = () => {
  const [activeTab, setActiveTab] = useState('buttons');

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-20">
      <QuantumOrbs />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark-primary mb-4">
            <span className="text-gradient">NeuralQuantum.ai</span> Design System
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A comprehensive collection of quantum-themed components for building modern, 
            futuristic interfaces that embody innovation and technical excellence.
          </p>
        </motion.div>

        {/* Component Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['buttons', 'cards', 'colors', 'animations'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? 'bg-quantum-600 text-white shadow-quantum'
                  : 'bg-white text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Button Showcase */}
        {activeTab === 'buttons' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
                <CardDescription>
                  Quantum-themed buttons with various styles and animations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Primary Buttons */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-4">Primary Actions</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="default">Default Button</Button>
                    <Button variant="quantum">Quantum Button</Button>
                    <Button variant="nvidia">NVIDIA Partner</Button>
                  </div>
                </div>

                {/* Secondary Buttons */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-4">Secondary Actions</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="outline">Outline</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="link">Link Style</Button>
                  </div>
                </div>

                {/* Button Sizes */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-4">Size Variations</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="default">Default</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                  </div>
                </div>

                {/* Icon Buttons */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-600 mb-4">With Icons</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button>
                      <Brain className="mr-2 h-4 w-4" />
                      Neural Network
                    </Button>
                    <Button variant="quantum">
                      <Cpu className="mr-2 h-4 w-4" />
                      Quantum Core
                    </Button>
                    <Button variant="secondary">
                      <Zap className="mr-2 h-4 w-4" />
                      Quick Action
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Card Showcase */}
        {activeTab === 'cards' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Standard Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Standard Card</CardTitle>
                  <CardDescription>Basic card with hover effects</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    This is a standard card component with subtle shadows and hover animations.
                  </p>
                </CardContent>
              </Card>

              {/* Quantum Card */}
              <QuantumCard>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-quantum-100">
                    <Brain className="w-6 h-6 text-quantum-600" />
                  </div>
                  <h3 className="text-lg font-semibold">Quantum Card</h3>
                </div>
                <p className="text-gray-600">
                  Special quantum-themed card with gradient effects and enhanced animations.
                </p>
              </QuantumCard>

              {/* Interactive Card */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Card className="cursor-pointer border-quantum-200 hover:border-quantum-400">
                  <CardHeader>
                    <CardTitle className="text-quantum-600">Interactive Card</CardTitle>
                    <CardDescription>Click or hover for effects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Explore →</span>
                      <Zap className="w-5 h-5 text-quantum-400" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Color Showcase */}
        {activeTab === 'colors' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            {/* Quantum Purple Palette */}
            <Card>
              <CardHeader>
                <CardTitle>Quantum Purple Palette</CardTitle>
                <CardDescription>Primary brand color variations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                    <div key={shade} className="text-center">
                      <div className={`h-20 rounded-lg bg-quantum-${shade} mb-2`} />
                      <p className="text-xs font-medium">{shade}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Gradients */}
            <Card>
              <CardHeader>
                <CardTitle>Gradient Variations</CardTitle>
                <CardDescription>Quantum-inspired gradient effects</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-24 rounded-lg bg-gradient-quantum" />
                <div className="h-24 rounded-lg bg-gradient-neural" />
                <div className="h-24 rounded-lg bg-gradient-energy" />
                <div className="h-24 rounded-lg bg-gradient-to-r from-quantum-400 via-neural-400 to-energy-400 animated-gradient" />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Animation Showcase */}
        {activeTab === 'animations' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Quantum Wave */}
              <Card>
                <CardHeader>
                  <CardTitle>Quantum Wave</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center py-8">
                  <div className="w-20 h-20 rounded-full bg-quantum-500 animate-quantum-wave" />
                </CardContent>
              </Card>

              {/* Quantum Entangle */}
              <Card>
                <CardHeader>
                  <CardTitle>Quantum Entangle</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center py-8">
                  <div className="w-20 h-20 rounded-full bg-neural-500 animate-quantum-entangle" />
                </CardContent>
              </Card>

              {/* Slow Spin */}
              <Card>
                <CardHeader>
                  <CardTitle>Slow Spin</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center py-8">
                  <div className="w-20 h-20 bg-energy-500 animate-spin-slow" />
                </CardContent>
              </Card>

              {/* Float Animation */}
              <Card>
                <CardHeader>
                  <CardTitle>Float Effect</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center py-8">
                  <div className="w-20 h-20 rounded-lg bg-gradient-quantum animate-float" />
                </CardContent>
              </Card>

              {/* Pulse Glow */}
              <Card>
                <CardHeader>
                  <CardTitle>Pulse Glow</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center py-8">
                  <div className="w-20 h-20 rounded-full bg-quantum-600 shadow-glow-lg animate-pulse-glow" />
                </CardContent>
              </Card>

              {/* Gradient Shift */}
              <Card>
                <CardHeader>
                  <CardTitle>Gradient Shift</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center py-8">
                  <div className="w-20 h-20 rounded-lg bg-gradient-animated animated-gradient" />
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}

        {/* Code Examples */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="w-5 h-5" />
                Implementation Example
              </CardTitle>
              <CardDescription>
                Sample code for implementing the design system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="font-mono text-sm">
{`import { Button } from '@/components/ui/button';
import { QuantumCard } from '@/components/ui/card';
import { ParticleBackground } from '@/components/ParticleBackground';

export function QuantumInterface() {
  return (
    <div className="relative">
      <ParticleBackground />
      <QuantumCard>
        <h2 className="text-gradient">Quantum Computing</h2>
        <Button variant="quantum">
          Start Processing
        </Button>
      </QuantumCard>
    </div>
  );
}`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};