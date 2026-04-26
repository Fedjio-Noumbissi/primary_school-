/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';
import { PageTemplate } from '../layout/PageTemplate';

// ── Types ─────────────────────────────────────────────────────────────────────
export interface ColumnConfig {
  key: string;
  label: string;
  render?: (val: any, row: any) => React.ReactNode;
}

export interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'textarea' | 'checkbox';
  options?: { value: any; label: string }[];
  required?: boolean;
  placeholder?: string;
}

export interface GenericCRUDConfig {
  endpoint: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  columns: ColumnConfig[];
  fields: FieldConfig[];
  primaryKey: string;
  searchPlaceholder?: string;
  emptyStateDesc?: string;
}

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconPlus = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IconEdit = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const IconTrash = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6M9 6V4h6v2" />
  </svg>
);
const IconX = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconChevLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const IconChevRight = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IconLoader = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" style={{ width: 16, height: 16, animation: 'gc-spin 0.8s linear infinite' }}>
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);

// ── Skeleton ──────────────────────────────────────────────────────────────────
const SkeletonRow = ({ cols, delay }: { cols: number; delay: number }) => (
  <tr style={{ borderBottom: '1px solid #f3f4f6', opacity: Math.max(0.3, 1 - delay * 0.18) }}>
    {Array.from({ length: cols + 1 }).map((_, i) => (
      <td key={i} style={{ padding: '15px 20px' }}>
        <div style={{
          height: 12, width: i === 0 ? 70 : i === cols ? 50 : ['140px', '80px', '60px', '90px'][i % 4],
          borderRadius: 6,
          background: 'linear-gradient(90deg, #f3f4f6 25%, #eaecef 50%, #f3f4f6 75%)',
          backgroundSize: '200% 100%',
          animation: 'gc-shimmer 1.5s ease-in-out infinite',
        }} />
      </td>
    ))}
  </tr>
);

// ── Modal ─────────────────────────────────────────────────────────────────────
interface ModalProps {
  open: boolean;
  onClose: () => void;
  editingItem: any;
  fields: FieldConfig[];
  formData: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  title: string;
}

const Modal = ({ open, onClose, editingItem, fields, formData, onChange, onSubmit, isPending, title }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // Animate in/out
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setTimeout(() => setVisible(false), 0);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  // Close on backdrop click
  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!open && !visible) return null;

  // Split fields into 2 columns (checkboxes always full-width)
  const renderField = (field: FieldConfig) => {
    const baseInput: React.CSSProperties = {
      width: '100%', padding: '10px 13px',
      border: '1.5px solid #e5e7eb', borderRadius: 10,
      fontSize: 13.5, fontFamily: "'Sora', sans-serif", color: '#111827',
      background: '#fafafa', outline: 'none',
      transition: 'border-color 0.18s, box-shadow 0.18s, background 0.18s',
      boxSizing: 'border-box',
    };

    if (field.type === 'checkbox') {
      return (
        <div key={field.name} style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 10, background: '#f9fafb', border: '1.5px solid #e5e7eb' }}>
          <div
            onClick={() => {
              const syntheticEvent = {
                target: {
                  name: field.name,
                  type: 'checkbox',
                  checked: !(formData[field.name] == 1 || formData[field.name] === true),
                },
              } as any;
              onChange(syntheticEvent);
            }}
            style={{
              width: 22, height: 22, borderRadius: 7, flexShrink: 0, cursor: 'pointer',
              border: `2px solid ${(formData[field.name] == 1 || formData[field.name] === true) ? '#059669' : '#d1d5db'}`,
              background: (formData[field.name] == 1 || formData[field.name] === true) ? 'linear-gradient(135deg,#059669,#047857)' : 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all 0.18s',
              boxShadow: (formData[field.name] == 1 || formData[field.name] === true) ? '0 2px 6px rgba(5,150,105,0.3)' : 'none',
            }}
          >
            {(formData[field.name] == 1 || formData[field.name] === true) && (
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 600, color: '#111827', fontFamily: 'Sora' }}>{field.label}</div>
            <div style={{ fontSize: 12, color: '#9ca3af', marginTop: 1, fontFamily: 'Sora' }}>
              {(formData[field.name] == 1 || formData[field.name] === true) ? 'Activé' : 'Désactivé'}
            </div>
          </div>
          <input
            type="checkbox"
            name={field.name}
            checked={formData[field.name] == 1 || formData[field.name] === true}
            onChange={onChange}
            style={{ display: 'none' }}
          />
        </div>
      );
    }

    if (field.type === 'select') {
      return (
        <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <label style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', fontFamily: 'Sora', display: 'flex', alignItems: 'center', gap: 4 }}>
            {field.label}
            {field.required && <span style={{ color: '#e11d48', fontSize: 13 }}>*</span>}
          </label>
          <select
            name={field.name}
            value={formData[field.name] ?? ''}
            onChange={onChange}
            required={field.required}
            className="gc-field-select"
            style={{
              ...baseInput, cursor: 'pointer', appearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 24 24' fill='none' stroke='%239ca3af' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' xmlns='http://www.w3.org/2000/svg'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '16px',
              paddingRight: 36,
            }}
          >
            <option value="">Sélectionner…</option>
            {field.options?.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      );
    }

    if (field.type === 'textarea') {
      return (
        <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: 6, gridColumn: '1 / -1' }}>
          <label style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', fontFamily: 'Sora', display: 'flex', alignItems: 'center', gap: 4 }}>
            {field.label}
            {field.required && <span style={{ color: '#e11d48', fontSize: 13 }}>*</span>}
          </label>
          <textarea
            name={field.name}
            value={formData[field.name] || ''}
            onChange={onChange}
            required={field.required}
            placeholder={field.placeholder}
            className="gc-field-input"
            style={{ ...baseInput, minHeight: 90, resize: 'vertical' }}
          />
        </div>
      );
    }

    return (
      <div key={field.name} style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <label style={{ fontSize: 12.5, fontWeight: 600, color: '#374151', fontFamily: 'Sora', display: 'flex', alignItems: 'center', gap: 4 }}>
          {field.label}
          {field.required && <span style={{ color: '#e11d48', fontSize: 13 }}>*</span>}
        </label>
        <input
          type={field.type}
          name={field.name}
          value={formData[field.name] || ''}
          onChange={onChange}
          required={field.required}
          placeholder={field.placeholder}
          className="gc-field-input"
          style={baseInput}
        />
      </div>
    );
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&display=swap');

        .gc-field-input:focus {
          border-color: #10b981 !important;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.12) !important;
          background: #fff !important;
          outline: none !important;
        }
        .gc-field-select:focus {
          border-color: #10b981 !important;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.12) !important;
          background: #fff !important;
          outline: none !important;
        }
        .gc-modal-scroll::-webkit-scrollbar { width: 5px; }
        .gc-modal-scroll::-webkit-scrollbar-track { background: transparent; }
        .gc-modal-scroll::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
        .gc-modal-scroll::-webkit-scrollbar-thumb:hover { background: #d1d5db; }

        .gc-save-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 22px;
          background: linear-gradient(135deg, #059669, #047857);
          color: white; font-size: 13.5px; font-weight: 600;
          border: none; border-radius: 11px; cursor: pointer;
          font-family: 'Sora', sans-serif;
          box-shadow: 0 2px 10px rgba(5,150,105,0.3), 0 1px 2px rgba(5,150,105,0.15);
          transition: all 0.18s;
        }
        .gc-save-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(5,150,105,0.38); }
        .gc-save-btn:active:not(:disabled) { transform: translateY(0); }
        .gc-save-btn:disabled { opacity: 0.6; cursor: not-allowed; }

        .gc-cancel-btn {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 11px 18px;
          background: white; color: #374151;
          font-size: 13.5px; font-weight: 500;
          border: 1.5px solid #e5e7eb; border-radius: 11px; cursor: pointer;
          font-family: 'Sora', sans-serif;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
          transition: all 0.15s;
        }
        .gc-cancel-btn:hover { background: #f9fafb; border-color: #d1d5db; }

        @keyframes gc-spin { to { transform: rotate(360deg); } }
        @keyframes gc-backdrop-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes gc-backdrop-out { from { opacity: 1; } to { opacity: 0; } }
        @keyframes gc-modal-in {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes gc-modal-out {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(16px) scale(0.97); }
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={handleBackdrop}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(10,20,15,0.55)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '20px',
          animation: `${visible ? 'gc-backdrop-in' : 'gc-backdrop-out'} 0.22s ease forwards`,
        }}
      >
        {/* Modal panel */}
        <div
          ref={modalRef}
          style={{
            background: 'white',
            borderRadius: 20,
            width: '100%',
            maxWidth: 560,
            boxShadow: '0 24px 80px rgba(0,0,0,0.22), 0 4px 20px rgba(0,0,0,0.1)',
            display: 'flex', flexDirection: 'column',
            maxHeight: '92vh',
            overflow: 'hidden',
            animation: `${visible ? 'gc-modal-in' : 'gc-modal-out'} 0.26s cubic-bezier(0.34,1.06,0.64,1) forwards`,
          }}
        >
          {/* ── Modal Header ── */}
          <div style={{
            padding: '22px 26px 18px',
            borderBottom: '1px solid #f3f4f6',
            display: 'flex', alignItems: 'flex-start', gap: 14,
            background: 'linear-gradient(180deg, #fafffe 0%, #fff 100%)',
            flexShrink: 0,
          }}>
            {/* Icon badge */}
            <div style={{
              width: 44, height: 44, borderRadius: 13, flexShrink: 0,
              background: editingItem
                ? 'linear-gradient(135deg, #eff6ff, #dbeafe)'
                : 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: editingItem ? '#3b82f6' : '#059669',
              boxShadow: editingItem
                ? '0 2px 8px rgba(59,130,246,0.15)'
                : '0 2px 8px rgba(5,150,105,0.15)',
            }}>
              {editingItem ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{
                fontSize: 17, fontWeight: 700, color: '#0d1117',
                fontFamily: 'Sora', letterSpacing: '-0.4px', margin: 0,
              }}>
                {editingItem ? `Modifier` : `Nouveau — ${title}`}
              </h2>
              <p style={{ fontSize: 12.5, color: '#9ca3af', margin: '3px 0 0', fontFamily: 'Sora' }}>
                {editingItem
                  ? 'Modifiez les informations ci-dessous puis enregistrez'
                  : 'Remplissez les informations pour créer un nouvel enregistrement'}
              </p>
            </div>
            <button
              onClick={onClose}
              style={{
                width: 34, height: 34, borderRadius: 10,
                border: '1.5px solid #e5e7eb',
                background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer', color: '#6b7280', flexShrink: 0,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.background = '#fff1f2';
                (e.currentTarget as HTMLElement).style.borderColor = '#fecdd3';
                (e.currentTarget as HTMLElement).style.color = '#e11d48';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.background = 'white';
                (e.currentTarget as HTMLElement).style.borderColor = '#e5e7eb';
                (e.currentTarget as HTMLElement).style.color = '#6b7280';
              }}
            >
              <IconX />
            </button>
          </div>

          {/* ── Modal Body ── */}
          <form onSubmit={onSubmit} style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
            <div
              className="gc-modal-scroll"
              style={{ overflowY: 'auto', padding: '22px 26px', flex: 1, minHeight: 0 }}
            >
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px 18px',
              }}>
                {fields.map(renderField)}
              </div>
            </div>

            {/* ── Modal Footer ── */}
            <div style={{
              padding: '16px 26px 22px',
              borderTop: '1px solid #f3f4f6',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              background: '#fafafa',
              flexShrink: 0,
            }}>
              {/* Required hint */}
              <div style={{ fontSize: 12, color: '#9ca3af', fontFamily: 'Sora', display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ color: '#e11d48', fontSize: 14, lineHeight: 1 }}>*</span>
                Champs obligatoires
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button type="button" className="gc-cancel-btn" onClick={onClose}>
                  Annuler
                </button>
                <button type="submit" className="gc-save-btn" disabled={isPending}>
                  {isPending ? (
                    <>
                      <IconLoader />
                      Enregistrement…
                    </>
                  ) : (
                    <>
                      <IconCheck />
                      {editingItem ? 'Mettre à jour' : 'Enregistrer'}
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

// ── Delete confirm dialog ─────────────────────────────────────────────────────
const DeleteDialog = ({ open, onConfirm, onCancel, isPending }: { open: boolean; onConfirm: () => void; onCancel: () => void; isPending: boolean }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => { if (open) requestAnimationFrame(() => setVisible(true)); else setTimeout(() => setVisible(false), 0); }, [open]);
  if (!open && !visible) return null;

  return (
    <div
      onClick={e => { if (e.target === e.currentTarget) onCancel(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1010,
        background: 'rgba(10,20,15,0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        animation: `${visible ? 'gc-backdrop-in' : 'gc-backdrop-out'} 0.2s ease forwards`,
      }}
    >
      <div style={{
        background: 'white', borderRadius: 18, padding: '28px 30px',
        maxWidth: 380, width: '90%',
        boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
        animation: `${visible ? 'gc-modal-in' : 'gc-modal-out'} 0.24s cubic-bezier(0.34,1.06,0.64,1) forwards`,
        textAlign: 'center',
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 15, margin: '0 auto 16px',
          background: '#fff1f2', display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#e11d48',
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 24, height: 24 }}>
            <polyline points="3 6 5 6 21 6" />
            <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
            <path d="M10 11v6M14 11v6M9 6V4h6v2" />
          </svg>
        </div>
        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0d1117', fontFamily: 'Sora', marginBottom: 8 }}>Confirmer la suppression</h3>
        <p style={{ fontSize: 13.5, color: '#6b7280', fontFamily: 'Sora', lineHeight: 1.5, marginBottom: 24 }}>
          Cette action est irréversible. L'élément sera définitivement supprimé.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button className="gc-cancel-btn" onClick={onCancel} style={{ flex: 1 }}>Annuler</button>
          <button
            onClick={onConfirm}
            disabled={isPending}
            style={{
              flex: 1, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '11px 18px',
              background: 'linear-gradient(135deg, #e11d48, #be123c)',
              color: 'white', fontSize: 13.5, fontWeight: 600,
              border: 'none', borderRadius: 11, cursor: 'pointer',
              fontFamily: 'Sora',
              boxShadow: '0 2px 10px rgba(225,29,72,0.3)',
              opacity: isPending ? 0.6 : 1,
              transition: 'all 0.15s',
            }}
          >
            {isPending ? <IconLoader /> : <IconTrash />}
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────
export const GenericCRUDPage = ({ config }: { config: GenericCRUDConfig }) => {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const [deleteId, setDeleteId] = useState<any>(null);

  const { data, isLoading } = useQuery({
    queryKey: [config.endpoint, page, search],
    queryFn: async () => {
      try {
        const res = await api.get(config.endpoint, { params: { page, limit: 10, search } });
        return res.data;
      } catch {
        return { data: [], pagination: { totalPages: 1, page: 1 } };
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: any) => { await api.delete(`${config.endpoint}/${id}`); },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: [config.endpoint] }); setDeleteId(null); },
  });

  const saveMutation = useMutation({
    mutationFn: async (payload: any) => {
      // 1. Sanitize payload: only send what's defined in config.fields
      const sanitizedPayload: any = {};
      config.fields.forEach(f => {
        const val = payload[f.name];
        if (val === '' || val === undefined) {
           sanitizedPayload[f.name] = null;
        } else if (f.type === 'number' && val !== null) {
           sanitizedPayload[f.name] = Number(val);
        } else {
           sanitizedPayload[f.name] = val;
        }
      });

      if (editingItem) {
        await api.put(`${config.endpoint}/${editingItem[config.primaryKey]}`, sanitizedPayload);
      } else {
        await api.post(config.endpoint, sanitizedPayload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [config.endpoint] });
      closeModal();
      alert("Enregistrement réussi !");
    },
    onError: (err: any) => {
      const respData = err.response?.data;
      let errMsg = respData?.message || err.message;
      if (respData?.errors && Array.isArray(respData.errors)) {
        errMsg += '\\n' + respData.errors.map((e: any) => `- ${e.path}: ${e.message}`).join('\\n');
      }
      alert("Erreur lors de l'enregistrement :\\n" + errMsg);
    }
  });

  const openModal = (item: any = null) => {
    setEditingItem(item);
    setFormData(item ? { ...item } : {});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => { setEditingItem(null); setFormData({}); }, 250);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, type } = e.target;
    const value = type === 'checkbox' ? ((e.target as HTMLInputElement).checked ? 1 : 0) : e.target.value;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); saveMutation.mutate(formData); };

  const totalPages = data?.pagination?.totalPages ?? 1;
  const currentPage = data?.pagination?.page ?? page;

  const headerActions = (
    <button
      className="gc-save-btn"
      onClick={() => openModal()}
      style={{ padding: '10px 18px' }}
    >
      <IconPlus />
      <span>Nouveau</span>
    </button>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');

        @keyframes gc-shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @keyframes gc-spin { to { transform: rotate(360deg); } }
        @keyframes gc-backdrop-in  { from { opacity: 0; } to { opacity: 1; } }
        @keyframes gc-backdrop-out { from { opacity: 1; } to { opacity: 0; } }
        @keyframes gc-modal-in  { from { opacity: 0; transform: translateY(20px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }
        @keyframes gc-modal-out { from { opacity: 1; transform: translateY(0) scale(1); }       to { opacity: 0; transform: translateY(14px) scale(0.97); } }
        @keyframes gc-fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }

        /* ── Table ── */
        .gc-root { padding: 28px 32px 48px; font-family: 'Sora', sans-serif; animation: gc-fadein 0.32s ease; }
        .gc-card { background: white; border-radius: 18px; border: 1px solid rgba(0,0,0,0.06); box-shadow: 0 1px 4px rgba(0,0,0,0.05), 0 4px 16px rgba(0,0,0,0.03); overflow: hidden; }

        /* Toolbar */
        .gc-toolbar { display: flex; align-items: center; gap: 12px; padding: 16px 20px; border-bottom: 1px solid #f3f4f6; flex-wrap: wrap; }
        .gc-search { display: flex; align-items: center; gap: 9px; flex: 1; min-width: 200px; max-width: 380px; background: #f9fafb; border: 1.5px solid rgba(0,0,0,0.07); border-radius: 11px; padding: 0 14px; height: 38px; transition: all 0.18s; }
        .gc-search:focus-within { background: white; border-color: #10b981; box-shadow: 0 0 0 3px rgba(16,185,129,0.1); }
        .gc-search input { flex: 1; background: none; border: none; outline: none; font-size: 13px; color: #111827; font-family: 'Sora', sans-serif; }
        .gc-search input::placeholder { color: #9ca3af; }
        .gc-search-icon { color: #9ca3af; flex-shrink: 0; transition: color 0.18s; }
        .gc-search:focus-within .gc-search-icon { color: #059669; }
        .gc-count { margin-left: auto; font-size: 12.5px; color: #9ca3af; white-space: nowrap; }
        .gc-count strong { color: #374151; font-weight: 600; }

        /* Table */
        .gc-table-wrap { overflow-x: auto; }
        .gc-table { width: 100%; border-collapse: collapse; font-size: 13.5px; font-family: 'Sora', sans-serif; }
        .gc-table thead tr { background: #fafafa; }
        .gc-table th { padding: 12px 20px; text-align: left; font-size: 11.5px; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.6px; border-bottom: 1px solid #f0f0f0; white-space: nowrap; }
        .gc-table th.right { text-align: right; }
        .gc-table td { padding: 14px 20px; color: #374151; vertical-align: middle; border-bottom: 1px solid #f9fafb; }
        .gc-table tr:last-child td { border-bottom: none; }
        .gc-table tbody tr { transition: background 0.12s; }
        .gc-table tbody tr:hover { background: #fafffe; }
        .gc-table tbody tr:hover .gc-row-actions { opacity: 1; }

        /* Row actions */
        .gc-row-actions { display: flex; gap: 5px; justify-content: flex-end; opacity: 0; transition: opacity 0.15s; }
        .gc-act-btn { width: 30px; height: 30px; border-radius: 8px; border: none; background: none; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #9ca3af; transition: all 0.14s; }
        .gc-act-btn.edit:hover  { background: #eff6ff; color: #3b82f6; }
        .gc-act-btn.del:hover   { background: #fff1f2; color: #e11d48; }

        /* Badges — keep pt- prefix for backward compat */
        .pt-badge-green { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; font-weight: 600; padding: 3px 10px; border-radius: 20px; background: #ecfdf5; color: #059669; }
        .pt-badge-red   { display: inline-flex; align-items: center; gap: 5px; font-size: 11.5px; font-weight: 600; padding: 3px 10px; border-radius: 20px; background: #fff1f2; color: #e11d48; }
        .pt-badge-green::before { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }
        .pt-badge-red::before   { content: ''; width: 5px; height: 5px; border-radius: 50%; background: currentColor; }

        /* Empty state */
        .gc-empty { display: flex; flex-direction: column; align-items: center; padding: 60px 24px; gap: 12px; }
        .gc-empty-icon { width: 56px; height: 56px; border-radius: 16px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; color: #9ca3af; }
        .gc-empty-title { font-size: 14.5px; font-weight: 700; color: #374151; }
        .gc-empty-desc { font-size: 13px; color: #9ca3af; text-align: center; max-width: 320px; line-height: 1.6; }

        /* Pagination */
        .gc-footer { display: flex; align-items: center; justify-content: space-between; padding: 14px 20px; border-top: 1px solid #f3f4f6; flex-wrap: wrap; gap: 10px; }
        .gc-footer-info { font-size: 12.5px; color: #9ca3af; }
        .gc-footer-info strong { color: #374151; font-weight: 600; }
        .gc-pagination { display: flex; gap: 5px; }
        .gc-pg-btn { width: 32px; height: 32px; border-radius: 9px; border: 1.5px solid rgba(0,0,0,0.09); background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #374151; font-size: 12.5px; font-weight: 500; font-family: 'Sora'; transition: all 0.14s; }
        .gc-pg-btn:hover:not(:disabled) { border-color: #10b981; color: #059669; background: #ecfdf5; }
        .gc-pg-btn:disabled { opacity: 0.35; cursor: default; }
        .gc-pg-btn.active { background: #059669; border-color: #059669; color: white; font-weight: 700; box-shadow: 0 2px 8px rgba(5,150,105,0.3); }

        /* Buttons */
        .gc-save-btn { display: inline-flex; align-items: center; gap: 7px; padding: 11px 22px; background: linear-gradient(135deg, #059669, #047857); color: white; font-size: 13.5px; font-weight: 600; border: none; border-radius: 11px; cursor: pointer; font-family: 'Sora'; box-shadow: 0 2px 10px rgba(5,150,105,0.28); transition: all 0.18s; }
        .gc-save-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 16px rgba(5,150,105,0.38); }
        .gc-cancel-btn { display: inline-flex; align-items: center; gap: 7px; padding: 11px 18px; background: white; color: #374151; font-size: 13.5px; font-weight: 500; border: 1.5px solid #e5e7eb; border-radius: 11px; cursor: pointer; font-family: 'Sora'; transition: all 0.15s; }
        .gc-cancel-btn:hover { background: #f9fafb; border-color: #d1d5db; }

        .gc-field-input:focus { border-color: #10b981 !important; box-shadow: 0 0 0 3px rgba(16,185,129,0.12) !important; background: #fff !important; outline: none !important; }
        .gc-field-select:focus { border-color: #10b981 !important; box-shadow: 0 0 0 3px rgba(16,185,129,0.12) !important; background: #fff !important; outline: none !important; }
        .gc-modal-scroll::-webkit-scrollbar { width: 5px; }
        .gc-modal-scroll::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
      `}</style>

      <PageTemplate
        title={config.title}
        subtitle={config.subtitle}
        icon={config.icon}
        headerActions={headerActions}
      >
        <div className="gc-card">
          {/* Toolbar */}
          <div className="gc-toolbar">
            <div className="gc-search">
              <span className="gc-search-icon"><IconSearch /></span>
              <input
                type="text"
                placeholder={config.searchPlaceholder || 'Rechercher…'}
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
              />
            </div>
            {data?.pagination?.total != null && (
              <div className="gc-count">
                <strong>{data.pagination.total}</strong> résultat{data.pagination.total !== 1 ? 's' : ''}
              </div>
            )}
          </div>

          {/* Table */}
          <div className="gc-table-wrap">
            <table className="gc-table">
              <thead>
                <tr>
                  {config.columns.map(col => <th key={col.key}>{col.label}</th>)}
                  <th className="right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} cols={config.columns.length} delay={i} />)
                ) : !data?.data?.length ? (
                  <tr>
                    <td colSpan={config.columns.length + 1}>
                      <div className="gc-empty">
                        <div className="gc-empty-icon">{config.icon}</div>
                        <div className="gc-empty-title">Aucune donnée trouvée</div>
                        <div className="gc-empty-desc">
                          {config.emptyStateDesc || 'Modifiez vos critères de recherche ou ajoutez un premier élément.'}
                        </div>
                        <button className="gc-save-btn" onClick={() => openModal()} style={{ marginTop: 8, padding: '9px 18px', fontSize: 13 }}>
                          <IconPlus /> Ajouter
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data.data.map((item: any) => (
                    <tr key={item[config.primaryKey]}>
                      {config.columns.map(col => (
                        <td key={col.key}>
                          {col.render ? col.render(item[col.key], item) : item[col.key] ?? '—'}
                        </td>
                      ))}
                      <td>
                        <div className="gc-row-actions">
                          <button className="gc-act-btn edit" title="Modifier" onClick={() => openModal(item)}><IconEdit /></button>
                          <button className="gc-act-btn del" title="Supprimer" onClick={() => setDeleteId(item[config.primaryKey])}><IconTrash /></button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data?.pagination && totalPages > 1 && (
            <div className="gc-footer">
              <div className="gc-footer-info">
                Page <strong>{currentPage}</strong> sur <strong>{totalPages}</strong>
              </div>
              <div className="gc-pagination">
                <button className="gc-pg-btn" disabled={page === 1} onClick={() => setPage(p => p - 1)}>
                  <IconChevLeft />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(p => p === 1 || p === totalPages || Math.abs(p - page) <= 1)
                  .reduce<(number | 'dot')[]>((acc, p, i, arr) => {
                    if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('dot');
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === 'dot'
                      ? <span key={`d${i}`} style={{ padding: '0 4px', color: '#9ca3af', fontSize: 13, lineHeight: '32px' }}>…</span>
                      : <button key={p} className={`gc-pg-btn${page === p ? ' active' : ''}`} onClick={() => setPage(p as number)}>{p}</button>
                  )
                }
                <button className="gc-pg-btn" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>
                  <IconChevRight />
                </button>
              </div>
            </div>
          )}
        </div>
      </PageTemplate>

      {/* ── Modal ── */}
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        editingItem={editingItem}
        fields={config.fields}
        formData={formData}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isPending={saveMutation.isPending}
        title={config.title}
      />

      {/* ── Delete confirm ── */}
      <DeleteDialog
        open={deleteId !== null}
        onConfirm={() => deleteMutation.mutate(deleteId)}
        onCancel={() => setDeleteId(null)}
        isPending={deleteMutation.isPending}
      />
    </>
  );
};