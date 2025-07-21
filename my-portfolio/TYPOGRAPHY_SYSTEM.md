# Typography System Documentation

## Overview
This document outlines the comprehensive typography system used throughout the portfolio application, ensuring consistent, accessible, and maintainable text styling across all components.

## 🔤 Font Stack

| Role | Font | Fallbacks | CSS Variable |
|------|------|----------|-------------|
| Headings | Sora | sans-serif | `--font-heading` |
| Body | Inter | sans-serif | `--font-body` |
| Code/Tags | JetBrains Mono | monospace | `--font-code` |

## 📏 Font Sizes

| Token | Size | Usage | Semantic Class |
|-------|------|-------|---------------|
| `--text-xl` | 48px | Hero, main heading | `.heading-hero` |
| `--text-lg` | 36px | Section titles | `.heading-section` |
| `--text-md` | 24px | Subheadings | `.heading-subsection` |
| `--text-base` | 18px | Paragraphs, nav items | `.body-text` |
| `--text-sm` | 14px | Labels, buttons, captions | `.body-small` |
| `--text-code` | 16px | Tags, inline code | `.code-text` |

## 🔡 Line Height & Spacing

```css
--line-height-heading: 1.2;
--line-height-body: 1.6;
--letter-spacing-heading: -0.5px;
--letter-spacing-body: 0;
```

## 🎯 Usage Examples

### Semantic Typography Classes (Recommended)
```html
<!-- Use semantic classes for complete typography styling -->
<h1 class="heading-hero">Portfolio Title</h1>
<h2 class="heading-section">About Me</h2>
<h3 class="heading-subsection">Skills & Experience</h3>
<p class="body-text">This is a paragraph with proper body text styling.</p>
<span class="body-small">Caption or small text</span>
<code class="code-text">const example = 'code snippet';</code>
```

### Individual Utility Classes
```html
<!-- Font families -->
<h1 class="font-heading">Main Title</h1>
<p class="font-body">Body content</p>
<code class="font-code">console.log('hello')</code>

<!-- Font sizes -->
<h1 class="text-xl">Hero Heading</h1>
<h2 class="text-lg">Section Title</h2>
<p class="text-base">Regular paragraph</p>
<span class="text-sm">Small caption</span>
```

### CSS Custom Properties
```css
/* Use semantic tokens in custom components */
.custom-heading {
  font-family: var(--font-heading);
  font-size: var(--text-xl);
  font-weight: var(--font-weight-bold);
  line-height: var(--line-height-heading);
  letter-spacing: var(--letter-spacing-heading);
  color: var(--color-heading);
}

.custom-paragraph {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--line-height-body);
  letter-spacing: var(--letter-spacing-body);
  color: var(--color-text);
}
```

### Font Weight Classes
```html
<h1 class="text-xl font-bold">Bold Heading</h1>
<p class="text-base font-medium">Medium Weight Text</p>
<span class="text-sm font-light">Light Caption</span>
```

## 📱 Responsive Behavior

The typography system automatically scales down on smaller screens:

- **Tablet (≤768px)**: Font sizes reduced by 10-20%
- **Mobile (≤480px)**: Font sizes reduced by 25-30%

## ✅ Best Practices

### Do:
- **Use semantic classes first**: Prefer `.heading-hero`, `.body-text`, etc. for complete styling
- **Use semantic tokens**: Always use `--text-base`, `--line-height-body` for consistency
- **Keep heading hierarchy**: Use appropriate heading levels (h1 → h2 → h3)
- **Test across themes**: Ensure typography works in both light and dark modes
- **Maintain accessibility**: Ensure sufficient color contrast and readable font sizes
- **Use consistent spacing**: Apply `--letter-spacing-heading` for headings, `--letter-spacing-body` for body text

### Don't:
- **Mix font families**: Stick to the defined font stack (Sora, Inter, JetBrains Mono)
- **Use headings for styling**: Don't use `<h1>` just for large text - use semantic classes instead
- **Override line-height arbitrarily**: Use semantic line-height tokens for consistency
- **Use hardcoded values**: Always prefer semantic tokens over fixed pixel values
- **Ignore responsive design**: Ensure typography scales appropriately on different devices
- **Skip semantic meaning**: Use proper HTML elements with appropriate classes

## 🔧 Implementation Guide

### 1. Import Typography Styles
The typography system is automatically imported in `App.css`:
```css
@import './styles/typography.css';
```

### 2. Use Semantic Classes
Prefer semantic classes over size-based ones:
```html
<!-- Good -->
<h1 class="heading-hero">Welcome</h1>
<h2 class="heading-section">About Me</h2>
<p class="body-text">Description...</p>

<!-- Avoid -->
<h1 class="text-xl font-bold">Welcome</h1>
```

### 3. Customize When Needed
For special cases, use CSS custom properties:
```css
.special-heading {
  font-size: var(--text-lg);
  font-family: var(--font-heading);
  font-weight: var(--font-weight-extrabold);
  letter-spacing: var(--letter-spacing-heading);
}
```

## 🎨 Integration with Design System

The typography system works seamlessly with:
- **Color System**: Use `var(--color-heading)` and `var(--color-text)` for consistent colors
- **Spacing System**: Combine with spacing tokens for proper layout
- **Theme System**: Automatically adapts to light/dark themes

## 📊 Performance Considerations

- Fonts are preloaded with `preconnect` for faster loading
- Font weights are optimized (300-800 range)
- `font-display: swap` ensures text remains visible during font load

## 🔄 Maintenance

To update the typography system:
1. Modify tokens in `src/styles/semanticTokens.css`
2. Update utility classes in `src/styles/typography.css`
3. Test across all components and screen sizes
4. Update this documentation if needed

## 📝 Migration Guide

To migrate existing components:
1. Replace hardcoded font sizes with tokens
2. Apply semantic classes where appropriate
3. Remove custom font-family declarations
4. Test responsive behavior

Example migration:
```css
/* Before */
.title {
  font-size: 48px;
  font-family: 'Arial', sans-serif;
  line-height: 1.1;
}

/* After */
.title {
  font-size: var(--text-xl);
  font-family: var(--font-heading);
  line-height: var(--line-height-heading);
  letter-spacing: var(--letter-spacing-heading);
}

/* Or simply use utility class */
<h1 class="heading-hero">Title</h1>
```