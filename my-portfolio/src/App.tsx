import React, { useEffect, useState, useCallback } from "react";
import Introduction from "./components/Introduction";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import LiquidMorphNavigation from "./components/Navigation/LiquidMorphNavigation";
import { ThemeProvider } from "./context/ThemeContext";
import { ThemeToggle } from "./components/Navigation/ThemeToggle";
import { AdminProvider } from "./context/AdminContext";
import AdminLoginModal from "./components/Admin/AdminLoginModal";

import "./App.css";

// ── Track which section is currently in view for the nav indicator ──────────
//
// A single observer watches all sections against a thin horizontal band at
// the viewport's vertical centre (via rootMargin), rather than each section
// independently against 30% of its own height. Sections are non-overlapping
// blocks stacked vertically, so exactly one of them intersects that band at
// any given scroll position — this stays correct regardless of how tall a
// given section is. The previous per-section-height approach broke down for
// the (much taller) Projects section: it could simultaneously satisfy "30%
// visible" alongside its neighbour for a long scroll range, and since each
// observer fired independently with no coordination, whichever callback ran
// last won arbitrarily — the indicator would flicker between Projects and
// Skills while scrolling through that overlap.
function useCurrentSection(count: number) {
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    const ids = ["introduction", "about", "projects", "skills", "contact"];
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = elements.indexOf(entry.target as HTMLElement);
            if (index !== -1) setCurrentSection(index);
          }
        });
      },
      { threshold: 0, rootMargin: "-45% 0px -45% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
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
  const currentSection = useCurrentSection(5);

  return (
    <div className="app-container">
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
