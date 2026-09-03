import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProjectModal from './ProjectModal';
import { Project } from '../types/project';

const project: Project = {
  id: 'p1',
  title: 'TradeLens',
  description: 'Short description.',
  longDescription: 'A longer description of TradeLens.',
  screenshots: ['/shot1.png', '/shot2.png', '/shot3.png'],
  technologies: ['React', 'FastAPI'],
  status: 'completed',
  liveUrl: 'https://tradelens.example.com',
  githubUrl: 'https://github.com/example/tradelens',
  year: 2026,
  category: 'Trading',
};

describe('ProjectModal', () => {
  it('renders nothing when there is no project', () => {
    const { container } = render(
      <ProjectModal project={null} isOpen={true} onClose={jest.fn()} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('renders project details when open', () => {
    render(<ProjectModal project={project} isOpen={true} onClose={jest.fn()} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('TradeLens')).toBeInTheDocument();
    expect(screen.getByText('A longer description of TradeLens.')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = jest.fn();
    render(<ProjectModal project={project} isOpen={true} onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: /close modal/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose on Escape when not in fullscreen', () => {
    const onClose = jest.fn();
    render(<ProjectModal project={project} isOpen={true} onClose={onClose} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('switches the hero image when a filmstrip thumbnail is clicked', () => {
    render(<ProjectModal project={project} isOpen={true} onClose={jest.fn()} />);

    const tabs = screen.getAllByRole('tab');
    expect(tabs).toHaveLength(3);
    expect(tabs[0]).toHaveAttribute('aria-selected', 'true');

    fireEvent.click(tabs[1]);

    expect(tabs[1]).toHaveAttribute('aria-selected', 'true');
    expect(tabs[0]).toHaveAttribute('aria-selected', 'false');
  });

  it('opens a fullscreen view on the hero shot, and Escape closes fullscreen before the modal', async () => {
    const onClose = jest.fn();
    render(<ProjectModal project={project} isOpen={true} onClose={onClose} />);

    fireEvent.click(screen.getByRole('button', { name: /view full-size screenshot/i }));
    expect(screen.getByText('1 / 3')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).not.toHaveBeenCalled();
    // AnimatePresence removes the overlay after its exit transition, not synchronously.
    await waitFor(() => expect(screen.queryByText('1 / 3')).not.toBeInTheDocument());

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('cycles the fullscreen image with arrow keys, wrapping at the ends', () => {
    render(<ProjectModal project={project} isOpen={true} onClose={jest.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: /view full-size screenshot/i }));
    expect(screen.getByText('1 / 3')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'ArrowRight' });
    expect(screen.getByText('2 / 3')).toBeInTheDocument();

    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    fireEvent.keyDown(document, { key: 'ArrowLeft' });
    expect(screen.getByText('3 / 3')).toBeInTheDocument();
  });
});
