# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is a modern personal portfolio website built with React 19, TypeScript, and advanced animation libraries. It showcases a sophisticated architecture with custom scroll animations, 3D effects, performance monitoring, and an integrated AI assistant.

**Key Technologies**: React 19, TypeScript, Framer Motion, Three.js (@react-three/fiber), CSS3 with advanced animations

## Development Commands

### Essential Commands
```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:3000)
npm start

# Build for production
npm run build

# Run tests
npm test

# Serve production build locally
npm run serve

# Deploy to GitHub Pages
npm run deploy
```

### Testing Commands
```bash
# Run tests in interactive watch mode
npm test

# Run all tests once
npm test -- --watchAll=false

# Run tests with coverage
npm test -- --coverage
```

## Architecture Overview

### Core Application Structure
- **App.tsx**: Main application component with theme provider and visual effects
- **AppContent**: Contains the main portfolio sections wrapped in `EnhancedSection` components
- **ThemeProvider**: Context-based theme management (dark/light mode)
- **Enhanced Section System**: Advanced wrapper component providing scroll animations, parallax effects, and section snapping

### Section-Based Architecture
The portfolio uses a 5-section architecture:
1. **Introduction** (Hero section)
2. **About** (Personal information)
3. **Projects** (Project showcase with 3D cards)
4. **Skills** (Technical skills display)
5. **Contact** (Contact form and information)

### Advanced Features Implementation

#### Custom Hook System
- **`useAdvancedScrollAnimation`**: Provides sophisticated scroll-based animations with velocity tracking, parallax effects, and intersection observer integration
- **`useSmoothSectionScroll`**: Manages section-based navigation with keyboard controls (Arrow keys, PageUp/PageDown, Home/End)
- **`useLazyLoading`**: Resource preloading and optimization
- **`useVisualEffects`**: Handles advanced visual effects and animations

#### Performance & Monitoring
- **Performance Monitor**: Real-time performance tracking component
- **Advanced Analytics**: Custom analytics system with page view tracking
- **Resource Preloading**: Automatic preloading of critical resources (fonts, images)
- **Lazy Loading**: Optimized loading strategies for better performance

#### Animation System
- **Framer Motion Integration**: Extensive use of Framer Motion for smooth animations
- **Section Animations**: Each section has configurable animation types (fade, slide, scale, rotate, magnetic)
- **Staggered Animations**: Child elements animate with configurable delays
- **Parallax Effects**: Advanced parallax scrolling with configurable intensity
- **Magnetic Cursor**: Interactive cursor effects

### Component Architecture

#### Major Components
- **Enhanced3DProjectCard**: 3D project cards with hover effects and modal integration
- **ProjectModal**: Detailed project view with screenshots and technology listings
- **SmoothScrollNav**: Combined navigation system with dot navigation and scroll arrows
- **ScrollProgress**: Progress indicator for scroll position
- **ThemeToggle**: Dark/light mode switcher
- **AIAssistant**: Integrated AI assistant with portfolio context
- **VisualEffects**: Background visual effects and particles

#### Navigation System
- **Multi-layered Navigation**: Dot navigation, scroll arrows, keyboard controls
- **Section Snapping**: Automatic snapping to sections when scrolling stops
- **Smooth Scrolling**: Custom smooth scroll implementation with easing functions
- **Keyboard Navigation**: Full keyboard accessibility

## Data Management

### Project Data Structure
- **Location**: `src/constants/projectsData.ts`
- **Type Definitions**: `src/types/project.ts` (referenced but not found in scan)
- **Features**: Projects include title, description, technologies, screenshots, demo/repo links, status, category, and year

### Theme System
- **CSS Variables**: Theme system uses CSS custom properties
- **Persistent Storage**: Theme preference saved to localStorage
- **Automatic Theme Detection**: Respects system theme preferences

## Key Development Patterns

### TypeScript Usage
- **Strict Mode**: TypeScript strict mode enabled
- **Interface Definitions**: Strong typing throughout the application
- **Custom Hook Typing**: Proper typing for complex hook return values
- **Component Props**: All components use proper TypeScript interfaces

### Performance Optimizations
- **React.memo**: Used strategically for performance-critical components
- **useCallback/useMemo**: Optimized re-renders and expensive calculations
- **Resource Hints**: DNS prefetch and preconnect for external resources
- **Code Splitting**: Leverages Create React App's built-in code splitting

### Animation Best Practices
- **RequestAnimationFrame**: Custom animations use RAF for smooth performance
- **Throttled Scroll Handlers**: Scroll events throttled to ~60fps
- **Intersection Observer**: Efficient in-view detection
- **Spring Animations**: Framer Motion springs for natural feel

## File Organization

```
src/
├── components/           # React components organized by feature
│   ├── AI/              # AI assistant components
│   ├── Interactive/     # Interactive effects (particles, etc.)
│   ├── Navigation/      # Navigation-related components
│   └── [Section].tsx    # Main section components
├── constants/           # Static data (projects, etc.)
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── utils/              # Utility functions and helpers
└── styles/            # Global styles and themes
```

### Important File Patterns
- **Component Co-location**: Each major component has associated CSS file
- **Hook Modularity**: Custom hooks are feature-specific and reusable
- **Constants Separation**: Static data separated from components
- **Utility Organization**: Performance, analytics, and helper utilities

## Development Guidelines

### Adding New Sections
1. Create component in `src/components/`
2. Add to `AppContent` wrapped in `EnhancedSection`
3. Update section count in `useSmoothSectionScroll`
4. Add section ID to navigation arrays

### Modifying Project Data
- Edit `src/constants/projectsData.ts`
- Follow existing data structure
- Include all required fields for proper display

### Performance Considerations
- Use `React.memo` for expensive components
- Implement proper dependency arrays in hooks
- Consider lazy loading for large components
- Monitor performance with built-in PerformanceMonitor

### Animation Development
- Use existing animation system in `useAdvancedScrollAnimation`
- Configure animations via `EnhancedSection` props
- Test animations across different scroll speeds
- Consider reduced motion preferences

## Dependencies Notes

### Core Dependencies
- **React 19**: Latest React with enhanced features
- **Framer Motion**: Primary animation library
- **@react-three/fiber & drei**: 3D effects and Three.js integration
- **React Router DOM**: Navigation (though single-page application)

### Development Dependencies
- **Create React App**: Build system and development server
- **TypeScript**: Static typing
- **Testing Library**: Component testing

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment
- **Primary**: Netlify (live at https://dreamy-trifle-37880e.netlify.app/)
- **Alternative**: GitHub Pages via `npm run deploy`
- **Build**: Standard React build process with optimizations
