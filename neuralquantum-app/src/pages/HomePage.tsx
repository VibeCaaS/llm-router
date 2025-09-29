import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  Cpu, 
  Zap, 
  Shield, 
  Globe, 
  Layers,
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  Users,
  Award
} from 'lucide-react';
import { HeroSection } from '@/components/HeroSection';
import { QuantumFeatureGrid } from '@/components/QuantumFeature';
import { NvidiaPartnerBadge } from '@/components/NvidiaPartnerBadge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card';

const features = [
  {
    title: 'Quantum Processing',
    description: 'Harness the power of quantum computing for exponentially faster calculations and complex problem solving.',
    icon: Cpu,
  },
  {
    title: 'Neural Networks',
    description: 'Advanced AI models enhanced with quantum algorithms for unprecedented pattern recognition.',
    icon: Brain,
  },
  {
    title: 'Instant Scaling',
    description: 'Seamlessly scale your quantum workloads across our global infrastructure.',
    icon: Zap,
  },
  {
    title: 'Enterprise Security',
    description: 'Military-grade quantum encryption ensuring your data remains secure.',
    icon: Shield,
  },
  {
    title: 'Global Infrastructure',
    description: 'Access quantum resources from data centers worldwide with ultra-low latency.',
    icon: Globe,
  },
  {
    title: 'Hybrid Architecture',
    description: 'Combine classical and quantum computing for optimal performance.',
    icon: Layers,
  },
];

const testimonials = [
  {
    quote: "NeuralQuantum.ai transformed our drug discovery process, reducing simulation time from months to days.",
    author: "Dr. Sarah Chen",
    role: "Chief Research Officer",
    company: "BioTech Innovations",
    rating: 5,
  },
  {
    quote: "The quantum-enhanced AI models provided insights we never thought possible. Game-changing technology.",
    author: "Michael Rodriguez",
    role: "CTO",
    company: "FinTech Solutions Inc.",
    rating: 5,
  },
  {
    quote: "Implementation was seamless, and the performance gains exceeded our expectations by 10x.",
    author: "Emma Thompson",
    role: "VP of Engineering",
    company: "Global Analytics Corp",
    rating: 5,
  },
];

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-primary mb-4">
              Quantum-Powered Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Experience the next generation of computing with our comprehensive suite of 
              quantum-enhanced AI capabilities.
            </p>
          </motion.div>
          
          <QuantumFeatureGrid features={features} />
        </div>
      </section>
      
      {/* Trust Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-quantum-50 to-neural-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-dark-primary mb-6">
                Trusted by Industry Leaders
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join hundreds of enterprises leveraging quantum computing to revolutionize 
                their operations and gain competitive advantage.
              </p>
              
              <div className="space-y-4 mb-8">
                {['Fortune 500 Companies', 'Research Institutions', 'Government Agencies'].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-quantum-600 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              
              <NvidiaPartnerBadge />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-6"
            >
              <Card className="text-center">
                <CardContent className="pt-6">
                  <TrendingUp className="w-8 h-8 text-quantum-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-dark-primary">98%</div>
                  <p className="text-sm text-gray-600">Performance Improvement</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Users className="w-8 h-8 text-quantum-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-dark-primary">500+</div>
                  <p className="text-sm text-gray-600">Enterprise Clients</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Award className="w-8 h-8 text-quantum-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-dark-primary">50+</div>
                  <p className="text-sm text-gray-600">Patents Filed</p>
                </CardContent>
              </Card>
              <Card className="text-center">
                <CardContent className="pt-6">
                  <Star className="w-8 h-8 text-quantum-600 mx-auto mb-2" />
                  <div className="text-3xl font-bold text-dark-primary">4.9</div>
                  <p className="text-sm text-gray-600">Customer Rating</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark-primary mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover how leading organizations are transforming their operations with NeuralQuantum.ai
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <CardDescription className="text-base italic">
                      "{testimonial.quote}"
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-dark-primary">{testimonial.author}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                      <p className="text-sm text-quantum-600">{testimonial.company}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-quantum text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Ready to Quantum Leap Your Business?
            </h2>
            <p className="text-lg sm:text-xl mb-8 opacity-90">
              Join the quantum revolution and unlock unprecedented computational power for your organization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-white text-quantum-600 hover:bg-gray-100"
              >
                Schedule a Demo
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                Download Whitepaper
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};