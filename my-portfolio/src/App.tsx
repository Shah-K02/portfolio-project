import React, { useEffect, useState, useCallback } from "react";
import Introduction from "./components/Introduction";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import { ScrollProgress } from "./components/Navigation/ScrollProgress";
import LiquidMorphNavigation from "./components/Navigation/LiquidMorphNavigation";
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeToggle } from "./components/Navigation/ThemeToggle";
import { AdminProvider } from "./context/AdminContext";
import AdminLoginModal from "./components/Admin/AdminLoginModal";

import "./App.css";

// ── Track which section is currently in view for the nav indicator ──────────
function useCurrentSection(count: number) {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const ids = ["introduction", "about", "projects", "skills", "contact"];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id, i) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setCurrentSection(i); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [count]);

  return currentSection;
}

function scrollToSection(index: number) {
  const ids = ["introduction", "about", "projects", "skills", "contact"];
  const el = document.getElementById(ids[index]);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ── Main content ─────────────────────────────────────────────────────────────
function AppContent() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const currentSection = useCurrentSection(5);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app-container">
      <ScrollProgress scrollProgress={scrollProgress} />

      {/* Sections — each manages its own padding/layout just like About */}
      <Introduction />
      <About />
      <Projects />
      <Skills />
      <Contact />

      <LiquidMorphNavigation
        items={[
          { id: "introduction", label: "Home",     section: "introduction" },
          { id: "about",        label: "About",    section: "about"        },
          { id: "projects",     label: "Projects", section: "projects"     },
          { id: "skills",       label: "Skills",   section: "skills"       },
          { id: "contact",      label: "Contact",  section: "contact"      },
        ]}
        currentSection={currentSection}
        onSectionChange={scrollToSection}
        className="main-liquid-nav"
      />
    </div>
  );
}

// ── Root app with providers ───────────────────────────────────────────────────
function App() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey && e.shiftKey && e.key === "A") {
      e.preventDefault();
      setIsLoginOpen(prev => !prev);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="app-root">
      <AdminProvider>
        <ThemeProvider>
          <ThemeToggle />
          <AppContent />
          <AdminLoginModal
            isOpen={isLoginOpen}
            onClose={() => setIsLoginOpen(false)}
          />
        </ThemeProvider>
      </AdminProvider>
    </div>
  );
}

export default App;
