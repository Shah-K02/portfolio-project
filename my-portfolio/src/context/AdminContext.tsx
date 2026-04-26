import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Project } from '../types/project';
import { PROJECTS_DATA } from '../constants/projectsData';

// ─── Constants ────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = 'Shahkar018@';
const STORAGE_KEY = 'portfolio_admin_projects';
const SESSION_KEY = 'portfolio_admin_session';

// ─── Types ────────────────────────────────────────────────────────────────────
interface AdminContextType {
  isAdmin: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (project: Project) => void;
  deleteProject: (id: string) => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AdminContext = createContext<AdminContextType | undefined>(undefined);

// ─── Helpers ──────────────────────────────────────────────────────────────────
function loadProjects(): Project[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw) as Project[];
  } catch {
    // ignore parse errors
  }
  return PROJECTS_DATA;
}

function saveProjects(projects: Project[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  } catch {
    // ignore storage errors (private browsing quota)
  }
}

function generateId(): string {
  return `project-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

// ─── Provider ─────────────────────────────────────────────────────────────────
export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  });

  const [projects, setProjects] = useState<Project[]>(loadProjects);

  // Persist projects whenever they change
  useEffect(() => {
    saveProjects(projects);
  }, [projects]);

  const login = useCallback((password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    sessionStorage.removeItem(SESSION_KEY);
    setIsAdmin(false);
  }, []);

  const addProject = useCallback((projectData: Omit<Project, 'id'>) => {
    const newProject: Project = { ...projectData, id: generateId() };
    setProjects(prev => [newProject, ...prev]);
  }, []);

  const updateProject = useCallback((updated: Project) => {
    setProjects(prev => prev.map(p => (p.id === updated.id ? updated : p)));
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  }, []);

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout, projects, addProject, updateProject, deleteProject }}>
      {children}
    </AdminContext.Provider>
  );
};

// ─── Hook ─────────────────────────────────────────────────────────────────────
export const useAdmin = (): AdminContextType => {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
};
