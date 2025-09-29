# NeuralQuantum.ai Design System Integration Guide

## Overview
This guide explains how to integrate the NeuralQuantum.ai design system into your existing applications, including the current LLM Router demo app.

## 🎯 Quick Start

The complete NeuralQuantum.ai design system has been implemented in `/workspace/neuralquantum-app/`. To view the running application:

1. Navigate to the app directory:
   ```bash
   cd /workspace/neuralquantum-app
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser to `http://localhost:5173`

## 🚀 Key Features Implemented

### 1. **Complete Color System**
- Quantum Purple (Primary): 10 shades from 50-950
- Neural Blue (Secondary): Full palette
- Energy Cyan (Accent): Complete range
- NVIDIA Partnership colors integrated
- Dark theme support

### 2. **Core Components**
- **Navigation Bar**: Responsive with dropdowns and mobile menu
- **Buttons**: 7 variants (default, quantum, nvidia, secondary, outline, ghost, link)
- **Cards**: Standard and quantum-themed with hover effects
- **Hero Section**: Full-featured with particle background
- **Footer**: Comprehensive with partnership badges

### 3. **Visual Effects**
- **Particle Background**: Interactive canvas-based system
- **Quantum Orbs**: Animated floating elements
- **Custom Animations**: 
  - Quantum wave
  - Quantum entangle
  - Gradient shift
  - Float effects
  - Pulse glow

### 4. **Special Features**
- NVIDIA Partnership Badge (2 variants)
- Quantum Feature Cards
- Component Showcase page (`/showcase`)
- Fully responsive design
- Accessibility compliant

## 📁 File Structure

```
neuralquantum-app/
├── src/
│   ├── components/        # All reusable components
│   │   ├── ui/           # Core UI components
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── HeroSection.tsx
│   │   ├── ParticleBackground.tsx
│   │   ├── NvidiaPartnerBadge.tsx
│   │   └── QuantumFeature.tsx
│   ├── pages/            # Page components
│   ├── lib/              # Utilities
│   └── index.css         # Global styles & variables
```

## 🔧 Integration with Existing Gradio App

To apply the NeuralQuantum.ai theme to the existing Gradio-based LLM Router app in `/workspace/demo/app/`:

### Option 1: CSS Override Approach

1. **Update the CSS file** (`/workspace/demo/app/css/style.css`):
```css
/* NeuralQuantum.ai Theme for Gradio */
:root {
  --primary-purple: #7B1FA2;
  --primary-purple-hover: #6A1B9A;
  --quantum-400: #a78bfa;
  --quantum-600: #7c3aed;
  --neural-500: #3b82f6;
  --energy-500: #06b6d4;
}

/* Override Gradio theme colors */
.gradio-container {
  --color-accent: var(--primary-purple) !important;
  --button-primary-background-fill: var(--primary-purple) !important;
  --button-primary-background-fill-hover: var(--primary-purple-hover) !important;
}

/* Quantum gradient for headers */
.header {
  background: linear-gradient(135deg, #7c3aed 0%, #2563eb 50%, #0891b2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

2. **Update the theme in** `css.py`:
```python
theme = gr.themes.Monochrome(
    primary_hue=gr.themes.colors.purple,
    secondary_hue=gr.themes.colors.blue,
    font=["Inter", "sans-serif"]
).set(
    button_primary_background_fill="#7B1FA2",
    button_primary_background_fill_hover="#6A1B9A",
    color_accent="#7c3aed",
    # ... other quantum colors
)
```

### Option 2: Full React Migration

For a complete transformation, migrate from Gradio to the React-based system:

1. **Use the existing React app** as a template
2. **Integrate the LLM routing logic** from `llm.py`
3. **Create API endpoints** for the router controller
4. **Build a modern UI** using the quantum components

## 🎨 Design Tokens Reference

### Colors
```javascript
// Primary
quantum-600: #7c3aed  // Main brand color
quantum-700: #6d28d9  // Hover states

// Accents
neural-500: #3b82f6   // Secondary actions
energy-500: #06b6d4   // Highlights

// Partnership
nvidia-green: #76B900 // NVIDIA badge
```

### Typography
```css
font-family: 'Inter', system-ui, sans-serif;
font-family-mono: 'JetBrains Mono', monospace;
```

### Spacing
```css
/* Use multiples of 4px (0.25rem) */
spacing-4: 1rem;    /* Base unit */
spacing-8: 2rem;    /* Component padding */
spacing-16: 4rem;   /* Section spacing */
```

## 🚦 Development Workflow

1. **View Component Library**: Navigate to `/showcase` to see all components
2. **Copy Components**: Components are modular and can be copied individually
3. **Customize**: Modify color variables in `tailwind.config.js`
4. **Test Responsiveness**: All components are mobile-first responsive

## 📋 Checklist for Integration

- [ ] Install required dependencies (React, Tailwind, Framer Motion)
- [ ] Copy color system and CSS variables
- [ ] Import Inter and JetBrains Mono fonts
- [ ] Implement navigation structure
- [ ] Add particle background effect
- [ ] Apply quantum card styles
- [ ] Integrate NVIDIA partnership badge
- [ ] Test animations and transitions
- [ ] Verify responsive behavior
- [ ] Check accessibility compliance

## 🔗 Live Examples

### Home Page
- Hero section with particle background
- Feature grid with quantum cards
- Trust indicators and stats
- Testimonials section
- CTA section with gradient background

### Component Showcase (`/showcase`)
- All button variants
- Card variations
- Color palettes
- Animation examples
- Code snippets

## 💡 Best Practices

1. **Consistency**: Use the predefined color tokens
2. **Animation**: Keep animations smooth (250ms default)
3. **Accessibility**: Maintain WCAG AA contrast ratios
4. **Performance**: Lazy load heavy components
5. **Responsive**: Test on multiple screen sizes

## 🛠️ Customization

To customize the theme for your specific needs:

1. **Colors**: Edit `tailwind.config.js`
2. **Animations**: Modify keyframes in config
3. **Components**: Extend base components in `src/components/ui/`
4. **Typography**: Update font scales in CSS variables

## 📚 Additional Resources

- **Live App**: Run `npm run dev` in `/workspace/neuralquantum-app/`
- **Component Code**: Browse `/workspace/neuralquantum-app/src/components/`
- **Styles**: Check `/workspace/neuralquantum-app/src/index.css`
- **Config**: Review `/workspace/neuralquantum-app/tailwind.config.js`

## 🤝 Support

The NeuralQuantum.ai design system is fully implemented and ready to use. All components are production-ready and tested. The system provides a modern, quantum-computing inspired interface that positions any application at the forefront of technological innovation.

---

**Note**: The complete implementation is available in `/workspace/neuralquantum-app/` with a running development server on port 5173.