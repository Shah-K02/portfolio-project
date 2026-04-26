import React from 'react';
import './AdminPanel.css';
import { useAdmin } from '../../context/AdminContext';

interface AdminPanelProps {
  onAddProject: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onAddProject }) => {
  const { isAdmin, logout } = useAdmin();

  if (!isAdmin) return null;

  return (
    <div className="admin-panel" role="toolbar" aria-label="Admin Panel">
      {/* Badge */}
      <div className="admin-panel-badge" aria-hidden="true">
        <span className="admin-panel-dot" />
        Admin Mode
      </div>

      <div className="admin-panel-divider" aria-hidden="true" />

      {/* Add Project */}
      <button
        id="admin-add-project-btn"
        className="admin-panel-btn admin-panel-btn--add"
        onClick={onAddProject}
        aria-label="Add new project"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
        Add Project
      </button>

      {/* Logout */}
      <button
        id="admin-logout-btn"
        className="admin-panel-btn admin-panel-btn--logout"
        onClick={logout}
        aria-label="Logout from admin mode"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Logout
      </button>
    </div>
  );
};

export default AdminPanel;
