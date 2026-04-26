import React, { useState, useEffect, useRef } from 'react';
import './AdminLoginModal.css';
import { useAdmin } from '../../context/AdminContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useAdmin();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [shake, setShake] = useState(false);
  const [success, setSuccess] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError('');
      setSuccess(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = login(password);
    if (ok) {
      setSuccess(true);
      setTimeout(() => {
        onClose();
      }, 800);
    } else {
      setError('Incorrect password. Access denied.');
      setShake(true);
      setPassword('');
      setTimeout(() => setShake(false), 600);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="admin-modal-backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-label="Admin Login">
      <div className={`admin-modal-card ${shake ? 'shake' : ''} ${success ? 'success' : ''}`}>
        {/* Header */}
        <div className="admin-modal-header">
          <div className="admin-modal-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 className="admin-modal-title">Admin Access</h2>
          <p className="admin-modal-subtitle">Enter your password to manage projects</p>
        </div>

        {/* Form */}
        <form className="admin-modal-form" onSubmit={handleSubmit} noValidate>
          <div className="admin-input-group">
            <label htmlFor="admin-password-input" className="admin-input-label">Password</label>
            <input
              ref={inputRef}
              id="admin-password-input"
              type="password"
              className={`admin-input ${error ? 'admin-input--error' : ''}`}
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              placeholder="Enter admin password"
              autoComplete="current-password"
              required
            />
            {error && (
              <p className="admin-input-error" role="alert">{error}</p>
            )}
          </div>

          {success && (
            <div className="admin-success-banner" role="status">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Access granted!
            </div>
          )}

          <div className="admin-modal-actions">
            <button type="button" className="admin-btn admin-btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="admin-btn admin-btn--primary" disabled={success}>
              {success ? 'Entering...' : 'Enter Admin Mode'}
            </button>
          </div>
        </form>

        {/* Hint */}
        <p className="admin-modal-hint">
          Tip: Press <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>A</kbd> anywhere to open this panel
        </p>

        {/* Close button */}
        <button className="admin-modal-close" onClick={onClose} aria-label="Close login modal">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AdminLoginModal;
