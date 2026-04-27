import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  writeBatch,
  query,
  orderBy,
  type UpdateData,
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Project } from '../types/project';
import { PROJECTS_DATA } from '../constants/projectsData';

// ─── Constants ────────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = 'Shahkar018@';
const SESSION_KEY = 'portfolio_admin_session';
const COLLECTION = 'projects';

// ─── Types ────────────────────────────────────────────────────────────────────
interface AdminContextType {
  isAdmin: boolean;
  loading: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AdminContext = createContext<AdminContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem(SESSION_KEY) === 'true';
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // ── Seed Firestore with static data on first ever load ──────────────────────
  useEffect(() => {
    const ref = collection(db, COLLECTION);

    // Check if the collection is empty; if so, seed it once
    getDocs(ref).then(async (snapshot) => {
      if (snapshot.empty) {
        const batch = writeBatch(db);
        PROJECTS_DATA.forEach((project) => {
          const { id, ...rest } = project;
          const docRef = doc(ref, id); // use the static id as the Firestore doc id
          batch.set(docRef, rest);
        });
        await batch.commit();
      }
    });

    // Real-time listener — keeps every device in sync automatically
    const unsubscribe = onSnapshot(
      query(ref, orderBy('year', 'desc')),
      (snapshot) => {
        const loaded: Project[] = snapshot.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Project, 'id'>),
        }));
        setProjects(loaded);
        setLoading(false);
      },
      (_err) => {
        // If the real-time listener fails (e.g. offline), fall back to static data
        setProjects(PROJECTS_DATA);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // ── Auth ────────────────────────────────────────────────────────────────────
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

  // ── CRUD ────────────────────────────────────────────────────────────────────
  const addProject = useCallback(async (projectData: Omit<Project, 'id'>) => {
    await addDoc(collection(db, COLLECTION), projectData);
  }, []);

  const updateProject = useCallback(async (updated: Project) => {
    const { id, ...rest } = updated;
    await updateDoc(doc(db, COLLECTION, id), rest as UpdateData<Omit<Project, 'id'>>);
  }, []);

  const deleteProject = useCallback(async (id: string) => {
    await deleteDoc(doc(db, COLLECTION, id));
  }, []);

  return (
    <AdminContext.Provider
      value={{ isAdmin, loading, login, logout, projects, addProject, updateProject, deleteProject }}
    >
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
