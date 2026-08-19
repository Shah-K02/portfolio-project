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
  setDoc,
  type UpdateData,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { db, storage, auth } from '../lib/firebase';
import { Project } from '../types/project';
import { PROJECTS_DATA } from '../constants/projectsData';

// ─── Constants ────────────────────────────────────────────────────────────────
// Not a secret - just identifies which Firebase Auth user is the site owner.
// The actual password lives only in Firebase Authentication now.
const ADMIN_EMAIL = process.env.REACT_APP_ADMIN_EMAIL as string;
const COLLECTION = 'projects';

// ─── Types ────────────────────────────────────────────────────────────────────
interface AdminContextType {
  isAdmin: boolean;
  loading: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  cvUrl: string;
  cvLoading: boolean;
  uploadCV: (file: File) => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AdminContext = createContext<AdminContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────
export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // CV State
  const [cvUrl, setCvUrl] = useState<string>('/ShahKar-CV.pdf');
  const [cvLoading, setCvLoading] = useState<boolean>(false);

  // ── Real Firebase Auth session (replaces the old sessionStorage flag) ───────
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setIsAdmin(!!user);
    });
    return () => unsubscribeAuth();
  }, []);

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

    // Listener for CV URL
    const settingsRef = doc(db, 'settings', 'general');
    const unsubscribeSettings = onSnapshot(settingsRef, (docSnap) => {
      if (docSnap.exists() && docSnap.data().cvUrl) {
        setCvUrl(docSnap.data().cvUrl);
      }
    });

    return () => {
      unsubscribe();
      unsubscribeSettings();
    };
  }, []);

  // ── Auth ────────────────────────────────────────────────────────────────────
  const login = useCallback(async (password: string): Promise<boolean> => {
    try {
      await signInWithEmailAndPassword(auth, ADMIN_EMAIL, password);
      return true;
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    await signOut(auth);
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

  // ── CV Upload ────────────────────────────────────────────────────────────────
  const uploadCV = useCallback(async (file: File) => {
    try {
      setCvLoading(true);
      // Create a reference to 'cv/filename'
      const fileRef = ref(storage, `cv/${file.name}`);
      // Upload the file
      await uploadBytes(fileRef, file);
      // Get the download URL
      const url = await getDownloadURL(fileRef);
      // Save it to Firestore
      await setDoc(doc(db, 'settings', 'general'), { cvUrl: url }, { merge: true });
    } catch (error) {
      console.error("Error uploading CV:", error);
      throw error;
    } finally {
      setCvLoading(false);
    }
  }, []);

  return (
    <AdminContext.Provider
      value={{ 
        isAdmin, loading, login, logout, 
        projects, addProject, updateProject, deleteProject,
        cvUrl, cvLoading, uploadCV
      }}
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
