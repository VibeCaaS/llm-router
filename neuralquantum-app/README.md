# NeuralQuantum.ai Design System

A cutting-edge, quantum-themed design system implementation for NeuralQuantum.ai - where AI meets quantum computing.

## 🚀 Features

### Core Design Elements
- **Quantum Purple Color Palette**: Primary brand colors with 10 shades
- **Neural Blue & Energy Cyan**: Secondary color systems
- **Custom Animations**: Quantum wave, entangle, and gradient effects
- **Particle Background**: Interactive canvas-based particle system
- **NVIDIA Partnership Badge**: Special branded component

### Components
- **Navigation**: Responsive navbar with dropdown menus
- **Buttons**: Multiple variants (default, quantum, nvidia, secondary, outline, ghost)
- **Cards**: Standard and quantum-themed cards with hover effects
- **Hero Section**: Full-featured landing section with animations
- **Footer**: Comprehensive footer with links and partnership badges
- **Quantum Features**: Specialized feature cards with quantum theming

### Technical Stack
- **React 18** with TypeScript
- **Tailwind CSS** for utility-first styling
- **Framer Motion** for animations
- **Wouter** for routing
- **Lucide React** for icons
- **Vite** for fast development and building

## 🎨 Design System Highlights

### Color System
```css
/* Quantum Purple (Primary) */
--quantum-50 through --quantum-950

/* Neural Blue (Secondary) */
--neural-50 through --neural-950

/* Energy Cyan (Accent) */
--energy-50 through --energy-950

/* NVIDIA Partnership */
--nvidia-green: #76B900
```

### Typography
- **Font Family**: Inter (primary), JetBrains Mono (code)
- **Type Scale**: 9xl (8rem) down to xs (0.75rem)
- **Font Weights**: 100 to 900

### Animations
- Quantum Wave
- Quantum Entangle
- Slow Spin
- Gradient Shift
- Float Effect
- Pulse Glow

## 🛠️ Installation

1. Clone the repository
2. Navigate to the neuralquantum-app directory
3. Install dependencies:
```bash
npm install
```

## 🚦 Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📦 Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## 📁 Project Structure

```
neuralquantum-app/
├── src/
│   ├── components/
│   │   ├── ui/          # Core UI components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ParticleBackground.tsx
│   │   ├── NvidiaPartnerBadge.tsx
│   │   └── QuantumFeature.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   └── ComponentShowcase.tsx
│   ├── lib/
│   │   └── utils.ts     # Utility functions
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles & CSS variables
├── public/
│   └── logo.svg         # Animated quantum logo
├── tailwind.config.js   # Tailwind configuration
├── vite.config.ts       # Vite configuration
└── package.json
```

## 🎯 Key Routes

- `/` - Home page with hero section and features
- `/showcase` - Component library showcase
- `/solutions/*` - Solutions pages (placeholder)
- `/products/*` - Products pages (placeholder)

## 🌟 Special Features

### Particle Background
Interactive canvas-based particle system with quantum connections between particles.

### NVIDIA Partnership Integration
Special badge component highlighting the NVIDIA partnership with custom styling and animations.

### Quantum Animations
Custom keyframe animations that give the interface a futuristic, quantum-computing feel.

### Responsive Design
Fully responsive design that works seamlessly across desktop, tablet, and mobile devices.

## 🔧 Customization

### Adding New Colors
Edit `tailwind.config.js` to add new color palettes or modify existing ones.

### Creating New Components
1. Create component in `src/components/`
2. Use the design system utilities from `src/lib/utils.ts`
3. Apply Tailwind classes and custom animations

### Modifying Animations
Edit the keyframes in `tailwind.config.js` or add new ones in `src/index.css`.

## 📝 License

This design system implementation follows the NeuralQuantum.ai brand guidelines and is intended for demonstration purposes.

## 🤝 Partnership

Proudly powered by NVIDIA partnership for accelerating quantum-AI innovation.

---

Built with ❤️ for the future of quantum computing and AI.