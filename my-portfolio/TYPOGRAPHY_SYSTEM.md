# Typography System Documentation

## Overview
This typography system provides a consistent, scalable approach to text styling across the portfolio application. It includes semantic tokens, utility classes, and responsive design patterns.

## 🔤 Font Stack

| Role | Font | Fallbacks |
|------|------|----------|
| Headings | Sora | sans-serif |
| Body | Inter | sans-serif |
| Code/Tags | JetBrains Mono | monospace |

## 📏 Font Sizes

| Token | Size | Usage |
|-------|------|-------|
| `--text-xl` | 48px | Hero, main heading |
| `--text-lg` | 36px | Section titles |
| `--text-md` | 24px | Subheadings |
| `--text-base` | 18px | Paragraphs, nav items |
| `--text-sm` | 14px | Labels, buttons, captions |
| `--text-code` | 16px | Tags, inline code |

## 🔡 Line Height & Spacing

```css
--line-height-heading: 1.2;
--line-height-body: 1.6;
--letter-spacing-heading: -0.5px;
--letter-spacing-body: 0;
```

## 🎯 Usage Examples

### CSS Custom Properties
```css
/* Using tokens directly */
.hero-title {
  font-size: var(--text-xl);
  font-family: var(--font-heading);
  line-height: var(--line-height-heading);
  letter-spacing: var(--letter-spacing-heading);
}
```

### Utility Classes
```html
<!-- Size-based classes -->
<h1 class="text-xl">Hero Title</h1>
<h2 class="text-lg">Section Title</h2>
<p class="text-base">Body paragraph</p>

<!-- Semantic classes -->
<h1 class="heading-hero">Hero Title</h1>
<h2 class="heading-section">Section Title</h2>
<p class="body-text">Body paragraph</p>
<span class="caption-text">Caption</span>
<code class="code-text">Code snippet</code>
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
- Use `--text-base` and `--line-height-body` for all readable body content
- Keep heading spacing tight and impactful
- Use semantic classes (`heading-hero`, `body-text`) for consistent styling
- Apply font weights appropriately (bold for heroes, medium for sections)

### Don't:
- Mix multiple font families within the same context
- Use headings for non-semantic decoration
- Override line heights without considering readability
- Use fixed pixel values instead of the token system

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