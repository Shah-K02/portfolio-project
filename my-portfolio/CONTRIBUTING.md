# Contributing to Shah Kar's Portfolio

Thank you for your interest in contributing to this portfolio project! 

## 🤝 How Can I Contribute?

### Important Note
This is a personal portfolio website. Contributions should focus on:
- Technical improvements and optimizations
- Bug fixes and performance enhancements
- Code quality improvements
- Accessibility enhancements

**Please do not modify personal content, project descriptions, or personal information.**

### Reporting Issues

When reporting issues, please include:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser and device information

### Suggesting Improvements

Suggestions for technical improvements are welcome:
- Performance optimizations
- Code structure improvements
- New features that enhance user experience
- Accessibility improvements

### Pull Requests

1. Fork the repository
2. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes with a clear commit message
6. Push to your fork
7. Submit a pull request

## 🛠️ Development Setup

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Local Development

1. Clone your fork:
   ```bash
   git clone https://github.com/your-username/portfolio.git
   cd portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📝 Code Style Guidelines

### TypeScript

- Use TypeScript for all new files
- Define proper interfaces and types
- Avoid using `any` type
- Use meaningful variable and function names

### React Components

- Use functional components with hooks
- Follow the single responsibility principle
- Use proper prop types and interfaces
- Implement proper error boundaries where needed

### CSS

- Use CSS modules or styled-components
- Follow BEM naming convention for CSS classes
- Use CSS variables for theming
- Ensure responsive design principles
- Test on multiple screen sizes

### File Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── types/              # TypeScript type definitions
├── styles/             # Global styles and themes
└── assets/             # Images, fonts, etc.
```

## 🧪 Testing

- Write tests for new features
- Ensure existing tests pass
- Test on multiple browsers
- Test responsive design on different screen sizes

### Running Tests

```bash
npm test
```

## 📦 Building

Before submitting a pull request, make sure the project builds successfully:

```bash
npm run build
```

## 🎨 Design Guidelines

- Maintain consistency with existing design patterns
- Follow accessibility guidelines (WCAG 2.1)
- Ensure proper color contrast ratios
- Test with keyboard navigation
- Consider users with disabilities

## 📋 Commit Message Guidelines

Use clear and meaningful commit messages:

- `feat: add new animation to hero section`
- `fix: resolve navigation scroll issue`
- `docs: update README with deployment instructions`
- `style: improve responsive design for mobile`
- `refactor: optimize performance hooks`

## 🔍 Code Review Process

1. All submissions require review before merging
2. Reviewers will check for:
   - Code quality and style
   - Performance implications
   - Accessibility compliance
   - Browser compatibility
   - Mobile responsiveness

## 📞 Getting Help

If you need help or have questions:

- Check the [README](README.md) for basic setup
- Look through existing [issues](https://github.com/yourusername/portfolio/issues)
- Create a new issue with the `question` label

## 🙏 Recognition

Contributors will be recognized in:
- The project's README
- Release notes for significant contributions
- GitHub's contributor graph

Thank you for contributing! 🎉