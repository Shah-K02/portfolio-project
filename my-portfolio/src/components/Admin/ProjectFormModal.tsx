import React, { useState, useEffect, useRef } from 'react';
import './ProjectFormModal.css';
import { Project } from '../../types/project';
import { useAdmin } from '../../context/AdminContext';

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingProject?: Project | null;
}

// ── Constants ─────────────────────────────────────────────────────────────────
const PRESET_CATEGORIES = ['Web Development', 'E-commerce', 'API Development', 'Mobile', 'Data Science', 'DevOps', 'Other'];
const STATUSES: { value: NonNullable<Project['status']>; label: string }[] = [
  { value: 'completed',   label: 'Completed'   },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'archived',    label: 'Archived'    },
];

const emptyForm = (): Omit<Project, 'id'> => ({
  title: '',
  description: '',
  longDescription: '',
  image: '',
  githubUrl: '',
  repositoryUrl: '',
  liveUrl: '',
  demoUrl: '',
  technologies: [],
  screenshots: [],
  category: 'Web Development',
  status: 'completed',
  year: new Date().getFullYear(),
});

// ── Helper: convert file → base64 dataURL ─────────────────────────────────────
function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// ── Component ─────────────────────────────────────────────────────────────────
const ProjectFormModal: React.FC<ProjectFormModalProps> = ({ isOpen, onClose, editingProject }) => {
  const { addProject, updateProject } = useAdmin();
  const isEditing = Boolean(editingProject);

  const [form, setForm]           = useState<Omit<Project, 'id'>>(emptyForm());
  const [techInput, setTechInput] = useState('');
  const [errors, setErrors]       = useState<Partial<Record<keyof Project, string>>>({});
  const [saving, setSaving]       = useState(false);
  const [saved, setSaved]         = useState(false);

  // Image upload loading states
  const [uploadingMain,   setUploadingMain]   = useState(false);
  const [uploadingShots,  setUploadingShots]  = useState(false);

  const mainFileRef       = useRef<HTMLInputElement>(null);
  const screenshotsRef    = useRef<HTMLInputElement>(null);

  // Populate form when editing
  useEffect(() => {
    if (isOpen) {
      if (editingProject) {
        const { id: _id, ...rest } = editingProject;
        setForm(rest);
        setTechInput(editingProject.technologies?.join(', ') ?? '');
      } else {
        setForm(emptyForm());
        setTechInput('');
      }
      setErrors({});
      setSaved(false);
    }
  }, [isOpen, editingProject]);

  const set = <K extends keyof Omit<Project, 'id'>>(key: K, value: Omit<Project, 'id'>[K]) => {
    setForm(prev => ({ ...prev, [key]: value }));
    setErrors(prev => ({ ...prev, [key]: undefined }));
  };

  // ── Image handlers ──────────────────────────────────────────────────────────
  const handleMainImageFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingMain(true);
    try {
      const dataUrl = await readFileAsDataURL(file);
      set('image', dataUrl);
    } finally {
      setUploadingMain(false);
      if (mainFileRef.current) mainFileRef.current.value = '';
    }
  };

  const handleScreenshotFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploadingShots(true);
    try {
      const dataUrls = await Promise.all(files.map(readFileAsDataURL));
      setForm(prev => ({
        ...prev,
        screenshots: [...(prev.screenshots || []), ...dataUrls],
      }));
    } finally {
      setUploadingShots(false);
      if (screenshotsRef.current) screenshotsRef.current.value = '';
    }
  };

  const removeScreenshot = (idx: number) => {
    setForm(prev => ({
      ...prev,
      screenshots: (prev.screenshots || []).filter((_, i) => i !== idx),
    }));
  };

  const clearMainImage = () => set('image', '');

  // ── Validation & submit ─────────────────────────────────────────────────────
  const validate = (): boolean => {
    const newErrors: typeof errors = {};
    if (!form.title.trim())       newErrors.title       = 'Title is required';
    if (!form.description.trim()) newErrors.description = 'Short description is required';
    if (!form.category)           newErrors.category    = 'Category is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const technologies = techInput.split(',').map(t => t.trim()).filter(Boolean);
    const payload = {
      ...form,
      technologies,
      githubUrl:     form.githubUrl     || form.repositoryUrl,
      repositoryUrl: form.repositoryUrl || form.githubUrl,
      liveUrl:       form.liveUrl       || form.demoUrl,
      demoUrl:       form.demoUrl       || form.liveUrl,
    };

    setSaving(true);
    setTimeout(() => {
      if (isEditing && editingProject) {
        updateProject({ ...payload, id: editingProject.id });
      } else {
        addProject(payload);
      }
      setSaving(false);
      setSaved(true);
      setTimeout(onClose, 700);
    }, 400);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="pf-backdrop" onClick={handleBackdropClick} role="dialog" aria-modal="true" aria-label={isEditing ? 'Edit Project' : 'Add Project'}>
      <div className="pf-modal">

        {/* ── Header ── */}
        <div className="pf-header">
          <div className="pf-header-icon" aria-hidden="true">
            {isEditing ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
              </svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            )}
          </div>
          <div>
            <h2 className="pf-title">{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
            <p className="pf-subtitle">{isEditing ? `Editing "${editingProject?.title}"` : 'Fill in the details for your new project'}</p>
          </div>
          <button className="pf-close-btn" onClick={onClose} aria-label="Close form">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* ── Form ── */}
        <form className="pf-form" onSubmit={handleSubmit} noValidate>
          <div className="pf-scroll-body">

            {/* Title + Year */}
            <div className="pf-row pf-row--2">
              <div className="pf-field">
                <label htmlFor="pf-title" className="pf-label">Title <span className="pf-required">*</span></label>
                <input
                  id="pf-title" type="text"
                  className={`pf-input ${errors.title ? 'pf-input--error' : ''}`}
                  value={form.title}
                  onChange={e => set('title', e.target.value)}
                  placeholder="e.g. My Awesome App"
                />
                {errors.title && <span className="pf-error">{errors.title}</span>}
              </div>

              <div className="pf-field">
                <label htmlFor="pf-year" className="pf-label">Year</label>
                <input
                  id="pf-year" type="number"
                  className="pf-input"
                  value={form.year ?? ''}
                  onChange={e => set('year', Number(e.target.value))}
                  min={2000} max={2099}
                  placeholder={String(new Date().getFullYear())}
                />
              </div>
            </div>

            {/* Category + Status */}
            <div className="pf-row pf-row--2">
              {/* Category — free-text with datalist suggestions */}
              <div className="pf-field">
                <label htmlFor="pf-category" className="pf-label">
                  Category <span className="pf-required">*</span>
                  <span className="pf-label-hint"> — select or type your own</span>
                </label>
                <input
                  id="pf-category"
                  list="pf-category-list"
                  className={`pf-input ${errors.category ? 'pf-input--error' : ''}`}
                  value={form.category ?? ''}
                  onChange={e => set('category', e.target.value)}
                  placeholder="Select or type a category..."
                  autoComplete="off"
                />
                <datalist id="pf-category-list">
                  {PRESET_CATEGORIES.map(c => <option key={c} value={c} />)}
                </datalist>
                {errors.category && <span className="pf-error">{errors.category}</span>}
              </div>

              {/* Status */}
              <div className="pf-field">
                <label htmlFor="pf-status" className="pf-label">Status</label>
                <select
                  id="pf-status"
                  className="pf-select"
                  value={form.status ?? 'completed'}
                  onChange={e => set('status', e.target.value as Project['status'])}
                >
                  {STATUSES.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Short description */}
            <div className="pf-field">
              <label htmlFor="pf-desc" className="pf-label">Short Description <span className="pf-required">*</span></label>
              <input
                id="pf-desc" type="text"
                className={`pf-input ${errors.description ? 'pf-input--error' : ''}`}
                value={form.description}
                onChange={e => set('description', e.target.value)}
                placeholder="One-line summary shown on the project card"
              />
              {errors.description && <span className="pf-error">{errors.description}</span>}
            </div>

            {/* Long description */}
            <div className="pf-field">
              <label htmlFor="pf-longdesc" className="pf-label">Full Description</label>
              <textarea
                id="pf-longdesc"
                className="pf-textarea"
                value={form.longDescription ?? ''}
                onChange={e => set('longDescription', e.target.value)}
                placeholder="Detailed description shown when the user clicks 'Details'..."
                rows={3}
              />
            </div>

            {/* Technologies */}
            <div className="pf-field">
              <label htmlFor="pf-tech" className="pf-label">Technologies</label>
              <input
                id="pf-tech" type="text"
                className="pf-input"
                value={techInput}
                onChange={e => setTechInput(e.target.value)}
                placeholder="React, TypeScript, Node.js  (comma-separated)"
              />
              {techInput && (
                <div className="pf-tags-preview">
                  {techInput.split(',').map(t => t.trim()).filter(Boolean).map(tag => (
                    <span key={tag} className="pf-tag-preview">{tag}</span>
                  ))}
                </div>
              )}
            </div>

            {/* ── Display Image ── */}
            <div className="pf-field">
              <label className="pf-label">Display Image</label>
              <p className="pf-field-hint">Shown on the project card. Upload a file or paste a URL.</p>

              {/* Preview */}
              {form.image && (
                <div className="pf-image-preview-wrap">
                  <img src={form.image} alt="Display preview" className="pf-image-preview" />
                  <button type="button" className="pf-image-remove" onClick={clearMainImage} aria-label="Remove display image">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
              )}

              <div className="pf-image-controls">
                {/* File upload */}
                <button
                  type="button"
                  className={`pf-upload-btn ${uploadingMain ? 'pf-upload-btn--loading' : ''}`}
                  onClick={() => mainFileRef.current?.click()}
                  disabled={uploadingMain}
                >
                  {uploadingMain ? (
                    <span className="pf-spinner" aria-hidden="true" />
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                  )}
                  {uploadingMain ? 'Uploading...' : 'Upload File'}
                </button>
                <input
                  ref={mainFileRef}
                  type="file"
                  accept="image/*"
                  className="pf-file-hidden"
                  onChange={handleMainImageFile}
                  aria-label="Upload display image file"
                />

                {/* URL fallback */}
                <span className="pf-or">or</span>
                <input
                  type="url"
                  className="pf-input pf-input--inline"
                  value={form.image?.startsWith('data:') ? '' : (form.image ?? '')}
                  onChange={e => set('image', e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  aria-label="Display image URL"
                />
              </div>
            </div>

            {/* ── Screenshots ── */}
            <div className="pf-field">
              <label className="pf-label">Additional Screenshots</label>
              <p className="pf-field-hint">Shown inside the project details modal. Upload files or paste URLs below.</p>

              {/* Screenshot previews */}
              {(form.screenshots?.length ?? 0) > 0 && (
                <div className="pf-screenshots-grid">
                  {(form.screenshots ?? []).map((src, idx) => (
                    <div key={idx} className="pf-screenshot-thumb">
                      <img src={src} alt={`Screenshot ${idx + 1}`} className="pf-screenshot-img" loading="lazy" />
                      <button
                        type="button"
                        className="pf-screenshot-remove"
                        onClick={() => removeScreenshot(idx)}
                        aria-label={`Remove screenshot ${idx + 1}`}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add screenshots */}
              <div className="pf-image-controls">
                <button
                  type="button"
                  className={`pf-upload-btn ${uploadingShots ? 'pf-upload-btn--loading' : ''}`}
                  onClick={() => screenshotsRef.current?.click()}
                  disabled={uploadingShots}
                >
                  {uploadingShots ? (
                    <span className="pf-spinner" aria-hidden="true" />
                  ) : (
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>
                      <polyline points="21 15 16 10 5 21"/>
                    </svg>
                  )}
                  {uploadingShots ? 'Uploading...' : '+ Add Images'}
                </button>
                <input
                  ref={screenshotsRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="pf-file-hidden"
                  onChange={handleScreenshotFiles}
                  aria-label="Upload screenshot files"
                />

                {/* URL entry for screenshots */}
                <span className="pf-or">or URL</span>
                <input
                  type="url"
                  className="pf-input pf-input--inline"
                  placeholder="Paste URL and press Enter"
                  aria-label="Add screenshot by URL"
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const val = (e.target as HTMLInputElement).value.trim();
                      if (val) {
                        setForm(prev => ({ ...prev, screenshots: [...(prev.screenshots || []), val] }));
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                />
              </div>
            </div>

            {/* GitHub + Live URLs */}
            <div className="pf-row pf-row--2">
              <div className="pf-field">
                <label htmlFor="pf-github" className="pf-label">GitHub URL</label>
                <input
                  id="pf-github" type="url" className="pf-input"
                  value={form.githubUrl ?? ''}
                  onChange={e => { set('githubUrl', e.target.value); set('repositoryUrl', e.target.value); }}
                  placeholder="https://github.com/..."
                />
              </div>
              <div className="pf-field">
                <label htmlFor="pf-live" className="pf-label">Live URL</label>
                <input
                  id="pf-live" type="url" className="pf-input"
                  value={form.liveUrl ?? ''}
                  onChange={e => { set('liveUrl', e.target.value); set('demoUrl', e.target.value); }}
                  placeholder="https://myapp.netlify.app"
                />
              </div>
            </div>

          </div>{/* end scroll body */}

          {/* ── Footer ── */}
          <div className="pf-footer">
            {saved && (
              <span className="pf-saved-banner">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                {isEditing ? 'Updated!' : 'Project added!'}
              </span>
            )}
            <div className="pf-footer-actions">
              <button type="button" className="pf-btn pf-btn--ghost" onClick={onClose}>Cancel</button>
              <button type="submit" className="pf-btn pf-btn--primary" disabled={saving || saved}>
                {saving ? 'Saving...' : saved ? 'Done!' : isEditing ? 'Save Changes' : 'Add Project'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectFormModal;
