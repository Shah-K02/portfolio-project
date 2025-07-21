# Spacing & Grid System Documentation

## Overview

This document outlines the comprehensive spacing and grid system used throughout the portfolio application, ensuring consistent layout, spacing, and responsive design across all components.

## 📏 Spacing Tokens

### Base Spacing Scale
All spacing follows a consistent 8px base unit for visual harmony and alignment.

| Token | Value | Usage |
|-------|-------|-------|
| `--spacing-xs` | 4px | Minimal spacing, borders, fine details |
| `--spacing-sm` | 8px | Small gaps, compact layouts |
| `--spacing-md` | 16px | Standard spacing, component padding |
| `--spacing-lg` | 32px | Section spacing, large gaps |
| `--spacing-xl` | 64px | Major section breaks, hero spacing |

### Spacing Utility Classes

#### Margin Classes
```css
/* All sides */
.m-xs, .m-sm, .m-md, .m-lg, .m-xl

/* Directional */
.mt-xs, .mt-sm, .mt-md, .mt-lg, .mt-xl  /* top */
.mb-xs, .mb-sm, .mb-md, .mb-lg, .mb-xl  /* bottom */
.ml-xs, .ml-sm, .ml-md, .ml-lg, .ml-xl  /* left */
.mr-xs, .mr-sm, .mr-md, .mr-lg, .mr-xl  /* right */

/* Auto centering */
.mx-auto  /* horizontal center */
.my-auto  /* vertical center */
.m-auto   /* all sides auto */
```

#### Padding Classes
```css
/* All sides */
.p-xs, .p-sm, .p-md, .p-lg, .p-xl

/* Directional */
.pt-xs, .pt-sm, .pt-md, .pt-lg, .pt-xl  /* top */
.pb-xs, .pb-sm, .pb-md, .pb-lg, .pb-xl  /* bottom */
.pl-xs, .pl-sm, .pl-md, .pl-lg, .pl-xl  /* left */
.pr-xs, .pr-sm, .pr-md, .pr-lg, .pr-xl  /* right */
```

#### Gap Classes (for Flexbox/Grid)
```css
.gap-xs, .gap-sm, .gap-md, .gap-lg, .gap-xl
```

## 🏗️ Grid System

### Grid Specifications

| Property | Value | Description |
|----------|-------|-------------|
| Max Width | 1200px | Container maximum width |
| Columns | 12 | Desktop column count |
| Gutter | 24px | Desktop spacing between columns |

### Responsive Breakpoints

| Device | Width | Columns | Gutter | Container Padding |
|--------|-------|---------|--------|-----------------|
| Mobile | ≤ 480px | 4 | 16px | 8px |
| Tablet | ≤ 768px | 8 | 20px | 16px |
| Desktop | ≥ 1200px | 12 | 24px | 16px |

### Grid Classes

#### Container
```html
<div class="container">
  <!-- Content with max-width and auto-centering -->
</div>
```

#### Grid Layout
```html
<div class="grid">
  <div class="col-6">Half width</div>
  <div class="col-6">Half width</div>
</div>
```

#### Column Classes
```css
/* Desktop (12 columns) */
.col-1, .col-2, .col-3, .col-4, .col-5, .col-6,
.col-7, .col-8, .col-9, .col-10, .col-11, .col-12

/* Tablet (8 columns) */
.col-tablet-1, .col-tablet-2, .col-tablet-3, .col-tablet-4,
.col-tablet-5, .col-tablet-6, .col-tablet-7, .col-tablet-8

/* Mobile (4 columns) */
.col-mobile-1, .col-mobile-2, .col-mobile-3, .col-mobile-4
```

## 🎯 Usage Examples

### Basic Grid Layout
```html
<div class="container">
  <div class="grid gap-md">
    <div class="col-8 col-tablet-6 col-mobile-4">
      <h2 class="heading-section mb-md">Main Content</h2>
      <p class="body-text">Article content here...</p>
    </div>
    <div class="col-4 col-tablet-2 col-mobile-4">
      <aside class="p-md">
        <h3 class="heading-subsection mb-sm">Sidebar</h3>
        <p class="body-small">Sidebar content...</p>
      </aside>
    </div>
  </div>
</div>
```

### Card Grid
```html
<div class="container">
  <div class="grid gap-lg">
    <div class="col-4 col-tablet-4 col-mobile-4">
      <div class="p-md">
        <h3 class="heading-subsection mb-sm">Project 1</h3>
        <p class="body-text">Description...</p>
      </div>
    </div>
    <div class="col-4 col-tablet-4 col-mobile-4">
      <div class="p-md">
        <h3 class="heading-subsection mb-sm">Project 2</h3>
        <p class="body-text">Description...</p>
      </div>
    </div>
    <div class="col-4 col-tablet-4 col-mobile-4">
      <div class="p-md">
        <h3 class="heading-subsection mb-sm">Project 3</h3>
        <p class="body-text">Description...</p>
      </div>
    </div>
  </div>
</div>
```

### Hero Section
```html
<div class="container">
  <div class="grid">
    <div class="col-12 col-tablet-8 col-mobile-4">
      <section class="py-xl mx-auto">
        <h1 class="heading-hero mb-lg">Portfolio Title</h1>
        <p class="body-text mb-md">Introduction text...</p>
        <button class="mt-lg">Call to Action</button>
      </section>
    </div>
  </div>
</div>
```

### CSS Custom Properties
```css
/* Using spacing tokens in custom components */
.custom-card {
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
  gap: var(--spacing-sm);
}

.section-spacing {
  margin-top: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

/* Using grid tokens */
.custom-container {
  max-width: var(--grid-max-width);
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

@media (max-width: 480px) {
  .custom-container {
    padding: 0 var(--spacing-sm);
  }
}
```

## ✅ Best Practices

### Do
- **Use semantic spacing**: Apply `--spacing-md` for standard component padding
- **Follow the 8px rule**: All spacing should be multiples of 8px
- **Use utility classes**: Prefer `.mt-lg` over custom margin styles
- **Plan responsive behavior**: Consider how layouts adapt across breakpoints
- **Use container class**: Wrap content in `.container` for proper max-width
- **Apply consistent gaps**: Use `.gap-md` for standard grid spacing

### Don't
- **Mix spacing systems**: Don't use arbitrary pixel values alongside tokens
- **Ignore responsive design**: Always consider mobile, tablet, and desktop layouts
- **Overcomplicate grids**: Use simple column spans when possible
- **Skip container wrapper**: Always use `.container` for proper content width
- **Use fixed layouts**: Prefer flexible grid systems over fixed positioning
- **Ignore accessibility**: Ensure sufficient spacing for touch targets

## 🔧 Implementation Guide

### 1. Import the Grid System
```typescript
// In your component or main CSS file
import '../styles/grid.css';
```

### 2. Apply Container and Grid
```jsx
function MyComponent() {
  return (
    <div className="container">
      <div className="grid gap-md">
        <div className="col-6 col-tablet-4 col-mobile-4">
          {/* Content */}
        </div>
      </div>
    </div>
  );
}
```

### 3. Use Spacing Utilities
```jsx
function Card() {
  return (
    <div className="p-md mb-lg">
      <h3 className="heading-subsection mb-sm">Title</h3>
      <p className="body-text">Content with proper spacing</p>
    </div>
  );
}
```

## 🎨 Design Tokens Reference

### Available CSS Variables
```css
/* Spacing */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 32px;
--spacing-xl: 64px;

/* Grid */
--grid-max-width: 1200px;
--grid-columns: 12;
--grid-gutter: 24px;
--grid-gutter-mobile: 16px;
--grid-gutter-tablet: 20px;

/* Breakpoints */
--breakpoint-mobile: 480px;
--breakpoint-tablet: 768px;
--breakpoint-desktop: 1200px;
```

This spacing and grid system provides a solid foundation for consistent, responsive layouts throughout your portfolio application.