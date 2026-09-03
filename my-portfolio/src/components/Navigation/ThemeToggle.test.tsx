import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../context/ThemeContext';
import { ThemeToggle } from './ThemeToggle';

describe('ThemeToggle', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('defaults to dark theme when nothing is saved', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Dark');
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('respects a previously saved theme', () => {
    localStorage.setItem('theme', 'light');

    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    expect(screen.getByRole('button')).toHaveTextContent('Light');
  });

  it('toggles theme on click and persists it to localStorage and the document', () => {
    render(
      <ThemeProvider>
        <ThemeToggle />
      </ThemeProvider>
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(button).toHaveTextContent('Light');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');

    fireEvent.click(button);

    expect(button).toHaveTextContent('Dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });
});
