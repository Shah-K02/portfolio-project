import { render, screen, fireEvent } from '@testing-library/react';
import LiquidMorphNavigation from './LiquidMorphNavigation';

const items = [
  { id: 'introduction', label: 'Home', section: 'introduction' },
  { id: 'about', label: 'About', section: 'about' },
  { id: 'projects', label: 'Projects', section: 'projects' },
];

describe('LiquidMorphNavigation', () => {
  it('renders a button for every section with the right accessible label', () => {
    render(
      <LiquidMorphNavigation items={items} currentSection={0} onSectionChange={jest.fn()} />
    );

    expect(screen.getByRole('button', { name: 'Navigate to Home section' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Navigate to About section' })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Navigate to Projects section' })
    ).toBeInTheDocument();
  });

  it('marks the current section as active via aria-current', () => {
    render(
      <LiquidMorphNavigation items={items} currentSection={1} onSectionChange={jest.fn()} />
    );

    expect(screen.getByRole('button', { name: 'Navigate to About section' })).toHaveAttribute(
      'aria-current',
      'true'
    );
    expect(
      screen.getByRole('button', { name: 'Navigate to Home section' })
    ).not.toHaveAttribute('aria-current');
  });

  it('calls onSectionChange with the clicked index', () => {
    const onSectionChange = jest.fn();
    render(
      <LiquidMorphNavigation items={items} currentSection={0} onSectionChange={onSectionChange} />
    );

    fireEvent.click(screen.getByRole('button', { name: 'Navigate to Projects section' }));

    expect(onSectionChange).toHaveBeenCalledWith(2);
  });

  it('fills the rail proportionally to progress through the sections', () => {
    const { container } = render(
      <LiquidMorphNavigation items={items} currentSection={2} onSectionChange={jest.fn()} />
    );

    const fill = container.querySelector('.side-nav__rail-fill') as HTMLElement;
    expect(fill.style.getPropertyValue('--nav-fill')).toBe('100%');
  });

  it('does not mark any node as active when currentSection is out of range', () => {
    render(
      <LiquidMorphNavigation items={items} currentSection={99} onSectionChange={jest.fn()} />
    );

    items.forEach((item) => {
      expect(
        screen.getByRole('button', { name: `Navigate to ${item.label} section` })
      ).not.toHaveAttribute('aria-current');
    });
  });
});
