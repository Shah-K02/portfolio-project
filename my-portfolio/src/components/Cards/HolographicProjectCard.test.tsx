import { render, screen, fireEvent } from '@testing-library/react';
import HolographicProjectCard from './HolographicProjectCard';
import { useAdmin } from '../../context/AdminContext';
import { Project } from '../../types/project';

jest.mock('../../context/AdminContext', () => ({
  useAdmin: jest.fn(),
}));

const mockedUseAdmin = useAdmin as jest.Mock;

const project: Project = {
  id: '1',
  title: 'TradeLens',
  description: 'A MetaTrader 5 trade analytics and journaling dashboard.',
  image: '/tradelens.png',
  technologies: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Redis'],
  status: 'completed',
  category: 'Trading',
  year: 2026,
  liveUrl: 'https://tradelens.example.com',
  githubUrl: 'https://github.com/example/tradelens',
};

describe('HolographicProjectCard', () => {
  beforeEach(() => {
    mockedUseAdmin.mockReturnValue({ isAdmin: false });
  });

  it('renders the project title, meta, description, and status', () => {
    render(<HolographicProjectCard project={project} index={0} />);

    expect(screen.getByText('TradeLens')).toBeInTheDocument();
    expect(screen.getByText('2026 · Trading')).toBeInTheDocument();
    expect(screen.getByText(project.description)).toBeInTheDocument();
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('caps visible tags at 4 and shows a +N overflow chip', () => {
    render(<HolographicProjectCard project={project} index={0} />);

    ['React', 'TypeScript', 'FastAPI', 'PostgreSQL'].forEach((tag) => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
    expect(screen.queryByText('Redis')).not.toBeInTheDocument();
    expect(screen.getByText('+1')).toBeInTheDocument();
  });

  it('renders live and code links when URLs are present', () => {
    render(<HolographicProjectCard project={project} index={0} />);

    expect(
      screen.getByRole('link', { name: /view live demo of tradelens/i })
    ).toHaveAttribute('href', project.liveUrl);
    expect(
      screen.getByRole('link', { name: /view source code of tradelens/i })
    ).toHaveAttribute('href', project.githubUrl);
  });

  it('calls onViewProject with the project when Details is clicked', () => {
    const onViewProject = jest.fn();
    render(
      <HolographicProjectCard project={project} index={0} onViewProject={onViewProject} />
    );

    fireEvent.click(screen.getByRole('button', { name: /view details of tradelens/i }));

    expect(onViewProject).toHaveBeenCalledWith(project);
  });

  it('does not render admin controls for a non-admin visitor', () => {
    render(<HolographicProjectCard project={project} index={0} />);

    expect(screen.queryByRole('button', { name: /edit tradelens/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /delete tradelens/i })).not.toBeInTheDocument();
  });

  describe('as an admin', () => {
    beforeEach(() => {
      mockedUseAdmin.mockReturnValue({ isAdmin: true });
    });

    it('renders edit and delete controls, and wires them to their handlers', () => {
      jest.spyOn(window, 'confirm').mockReturnValue(true);
      const onEdit = jest.fn();
      const onDelete = jest.fn();

      render(
        <HolographicProjectCard
          project={project}
          index={0}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      );

      fireEvent.click(screen.getByRole('button', { name: /edit tradelens/i }));
      expect(onEdit).toHaveBeenCalledWith(project);

      fireEvent.click(screen.getByRole('button', { name: /delete tradelens/i }));
      expect(window.confirm).toHaveBeenCalled();
      expect(onDelete).toHaveBeenCalledWith(project.id);
    });

    it('does not delete when the confirmation is declined', () => {
      jest.spyOn(window, 'confirm').mockReturnValue(false);
      const onDelete = jest.fn();

      render(<HolographicProjectCard project={project} index={0} onDelete={onDelete} />);
      fireEvent.click(screen.getByRole('button', { name: /delete tradelens/i }));

      expect(onDelete).not.toHaveBeenCalled();
    });
  });
});
