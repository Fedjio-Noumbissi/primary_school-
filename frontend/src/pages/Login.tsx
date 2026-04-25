/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import api from '../api/axios';

// ─── Minimal SVG icons (no lucide dependency issues) ───────────────────────
const IconBook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 28, height: 28 }}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const IconEye = ({ off }: { off?: boolean }) => off ? (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" /><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" /><line x1="1" y1="1" x2="23" y2="23" />
  </svg>
) : (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const IconLoader = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ width: 20, height: 20, animation: 'spin 0.8s linear infinite' }}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

// ─── Floating particle dots for background ──────────────────────────────────
const Particles = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
    {[...Array(18)].map((_, i) => (
      <div key={i} style={{
        position: 'absolute',
        width: i % 3 === 0 ? 6 : i % 3 === 1 ? 4 : 3,
        height: i % 3 === 0 ? 6 : i % 3 === 1 ? 4 : 3,
        borderRadius: '50%',
        background: `rgba(16,185,129,${0.08 + (i % 4) * 0.04})`,
        left: `${5 + (i * 5.3) % 90}%`,
        top: `${10 + (i * 7.1) % 80}%`,
        animation: `float ${4 + (i % 5)}s ease-in-out infinite`,
        animationDelay: `${(i * 0.4) % 3}s`,
      }} />
    ))}
  </div>
);

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => { setTimeout(() => setMounted(true), 50); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { username, password });
      const { user, token } = response.data.data;
      login(user, token);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Identifiants incorrects. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .login-root {
          min-height: 100vh;
          display: flex;
          font-family: 'Sora', sans-serif;
          background: #f8faf9;
          position: relative;
          overflow: hidden;
        }

        /* ── Left panel ── */
        .left-panel {
          display: none;
          flex: 1;
          background: linear-gradient(145deg, #065f46 0%, #047857 40%, #059669 100%);
          position: relative;
          overflow: hidden;
          padding: 3rem;
          flex-direction: column;
          justify-content: space-between;
        }
        @media (min-width: 900px) { .left-panel { display: flex; } }

        .left-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }
        .left-glow {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(52,211,153,0.25) 0%, transparent 70%);
          top: -100px; right: -100px;
          pointer-events: none;
        }
        .left-glow2 {
          position: absolute;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%);
          bottom: 60px; left: -60px;
          pointer-events: none;
        }

        .brand-badge {
          display: flex;
          align-items: center;
          gap: 12px;
          position: relative;
          z-index: 1;
        }
        .brand-icon {
          width: 48px; height: 48px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          color: white;
          backdrop-filter: blur(8px);
        }
        .brand-name {
          font-size: 22px;
          font-weight: 700;
          color: white;
          letter-spacing: -0.5px;
        }
        .brand-tagline {
          font-size: 12px;
          color: rgba(255,255,255,0.6);
          font-weight: 300;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .left-quote {
          position: relative;
          z-index: 1;
        }
        .left-quote blockquote {
          font-size: 28px;
          font-weight: 300;
          color: white;
          line-height: 1.45;
          letter-spacing: -0.5px;
          margin-bottom: 1.5rem;
        }
        .left-quote blockquote strong { font-weight: 600; }
        .quote-author {
          display: flex; align-items: center; gap: 12px;
        }
        .author-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          background: rgba(255,255,255,0.2);
          border: 2px solid rgba(255,255,255,0.3);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 600; color: white;
        }
        .author-info { font-size: 13px; color: rgba(255,255,255,0.7); line-height: 1.4; }
        .author-info strong { color: white; font-weight: 500; display: block; }

        .stats-row {
          display: flex;
          gap: 2rem;
          position: relative;
          z-index: 1;
          padding-top: 2rem;
          border-top: 1px solid rgba(255,255,255,0.12);
        }
        .stat-item { text-align: left; }
        .stat-num {
          font-size: 26px; font-weight: 700;
          color: white; line-height: 1;
          font-family: 'JetBrains Mono', monospace;
        }
        .stat-label { font-size: 11px; color: rgba(255,255,255,0.55); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.5px; }

        /* ── Right panel (form) ── */
        .right-panel {
          flex: none;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1.5rem;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 900px) {
          .right-panel { width: 480px; padding: 3rem; }
        }

        .form-card {
          width: 100%;
          max-width: 400px;
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .form-card.visible { opacity: 1; transform: translateY(0); }

        /* mobile brand */
        .mobile-brand {
          display: flex; flex-direction: column; align-items: center;
          margin-bottom: 2.5rem;
        }
        @media (min-width: 900px) { .mobile-brand { display: none; } }
        .mobile-icon {
          width: 56px; height: 56px;
          background: linear-gradient(135deg, #059669, #047857);
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          color: white;
          margin-bottom: 12px;
          box-shadow: 0 8px 24px rgba(5,150,105,0.3);
        }

        .form-heading {
          font-size: 26px;
          font-weight: 700;
          color: #0f2a20;
          letter-spacing: -0.8px;
          margin-bottom: 6px;
        }
        .form-sub {
          font-size: 14px;
          color: #6b7280;
          font-weight: 400;
          margin-bottom: 2.5rem;
          line-height: 1.5;
        }

        /* error */
        .error-box {
          display: flex; align-items: flex-start; gap: 10px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-left: 3px solid #ef4444;
          border-radius: 10px;
          padding: 12px 14px;
          margin-bottom: 1.5rem;
          font-size: 13px;
          color: #b91c1c;
          animation: slideIn 0.25s ease;
        }

        /* fields */
        .field { margin-bottom: 1.25rem; }
        .field-label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #374151;
          margin-bottom: 6px;
          letter-spacing: 0.1px;
        }
        .field-wrap { position: relative; }
        .field-input {
          width: 100%;
          padding: 11px 14px;
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          color: #111827;
          background: white;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          -webkit-appearance: none;
        }
        .field-input::placeholder { color: #9ca3af; }
        .field-input:focus {
          border-color: #059669;
          box-shadow: 0 0 0 3px rgba(5,150,105,0.1);
        }
        .field-input:hover:not(:focus) { border-color: #d1d5db; }
        .pw-toggle {
          position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer;
          color: #9ca3af; padding: 4px; border-radius: 6px;
          display: flex; align-items: center;
          transition: color 0.15s;
        }
        .pw-toggle:hover { color: #374151; }

        /* submit */
        .submit-btn {
          width: 100%;
          padding: 12px;
          margin-top: 0.5rem;
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          color: white;
          font-family: 'Sora', sans-serif;
          font-size: 14px;
          font-weight: 600;
          border: none;
          border-radius: 10px;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center; gap: 8px;
          letter-spacing: 0.2px;
          transition: transform 0.15s, box-shadow 0.15s, opacity 0.15s;
          box-shadow: 0 4px 14px rgba(5,150,105,0.35);
        }
        .submit-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(5,150,105,0.45);
        }
        .submit-btn:active:not(:disabled) { transform: translateY(0); }
        .submit-btn:disabled { opacity: 0.7; cursor: not-allowed; }

        .divider {
          display: flex; align-items: center; gap: 12px;
          margin: 1.75rem 0 1.25rem;
          color: #d1d5db;
          font-size: 12px;
        }
        .divider::before, .divider::after {
          content: ''; flex: 1; height: 1px; background: #f0f0f0;
        }

        .demo-pills {
          display: flex; flex-wrap: wrap; gap: 8px;
        }
        .demo-pill {
          background: #f3f4f6;
          border: 1px solid #e5e7eb;
          border-radius: 8px;
          padding: 6px 12px;
          font-size: 12px;
          font-family: 'JetBrains Mono', monospace;
          color: #374151;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
          display: flex; flex-direction: column; gap: 1px;
        }
        .demo-pill:hover { background: #ecfdf5; border-color: #6ee7b7; }
        .demo-pill-label { font-size: 10px; color: #9ca3af; font-family: 'Sora', sans-serif; }

        .footer-text {
          text-align: center;
          font-size: 12px;
          color: #9ca3af;
          margin-top: 2rem;
          line-height: 1.6;
        }
        .footer-text a { color: #059669; text-decoration: none; }
        .footer-text a:hover { text-decoration: underline; }

        /* bg decoration */
        .bg-blob {
          position: fixed;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="login-root">
        {/* Background blobs */}
        <div className="bg-blob" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(5,150,105,0.06) 0%, transparent 70%)', top: -100, right: -100 }} />
        <div className="bg-blob" style={{ width: 300, height: 300, background: 'radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 70%)', bottom: 50, left: '30%' }} />

        {/* ── LEFT PANEL ── */}
        <div className="left-panel">
          <div className="left-grid" />
          <div className="left-glow" />
          <div className="left-glow2" />
          <Particles />

          <div className="brand-badge">
            <div className="brand-icon"><IconBook /></div>
            <div>
              <div className="brand-name">EduPrime</div>
              <div className="brand-tagline">Portail Administratif</div>
            </div>
          </div>

          <div className="left-quote">
            <blockquote>
              Gérez votre établissement avec<br />
              <strong>clarté, rapidité</strong><br />
              et efficacité.
            </blockquote>
            <div className="quote-author">
              <div className="author-avatar">DP</div>
              <div className="author-info">
                <strong>Direction Pédagogique</strong>
                Système de gestion scolaire v2.0
              </div>
            </div>
          </div>

          <div className="stats-row">
            {[['28', 'Tables'], ['140+', 'Endpoints'], ['∞', 'Possibilités']].map(([n, l]) => (
              <div className="stat-item" key={l}>
                <div className="stat-num">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT PANEL ── */}
        <div className="right-panel">
          <div className={`form-card${mounted ? ' visible' : ''}`}>

            {/* Mobile brand */}
            <div className="mobile-brand">
              <div className="mobile-icon"><IconBook /></div>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#0f2a20', letterSpacing: -0.5 }}>EduPrime</div>
              <div style={{ fontSize: 12, color: '#6b7280', marginTop: 2 }}>Portail Administratif</div>
            </div>

            <div className="form-heading">Bon retour 👋</div>
            <div className="form-sub">Connectez-vous à votre espace administratif.</div>

            <form onSubmit={handleSubmit}>
              {error && (
                <div className="error-box">
                  <IconAlert />
                  <span>{error}</span>
                </div>
              )}

              <div className="field">
                <label className="field-label">Identifiant</label>
                <div className="field-wrap">
                  <input
                    className="field-input"
                    type="text"
                    placeholder="admin@ecole.fr"
                    required
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="field">
                <label className="field-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                  Mot de passe
                  <a href="#" style={{ fontSize: 12, color: '#059669', fontWeight: 400, textDecoration: 'none' }}>
                    Mot de passe oublié ?
                  </a>
                </label>
                <div className="field-wrap">
                  <input
                    className="field-input"
                    type={showPw ? 'text' : 'password'}
                    placeholder="••••••••"
                    required
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ paddingRight: 44 }}
                    autoComplete="current-password"
                  />
                  <button type="button" className="pw-toggle" onClick={() => setShowPw(p => !p)} tabIndex={-1}>
                    <IconEye off={showPw} />
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem', marginTop: '0.25rem' }}>
                <input type="checkbox" id="remember" style={{ accentColor: '#059669', width: 15, height: 15, cursor: 'pointer' }} />
                <label htmlFor="remember" style={{ fontSize: 13, color: '#374151', cursor: 'pointer', userSelect: 'none' }}>
                  Se souvenir de moi
                </label>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? <><IconLoader /> Connexion en cours…</> : 'Se connecter'}
              </button>
            </form>

            <div className="divider">accès démo rapide</div>

            <div className="demo-pills">
              {[
                { label: 'Admin', user: 'admin@ecole.fr', pw: 'admin123' },
                { label: 'Directeur', user: 'directeur@ecole.fr', pw: 'dir123' },
              ].map(d => (
                <button
                  key={d.label}
                  className="demo-pill"
                  onClick={() => { setUsername(d.user); setPassword(d.pw); }}
                >
                  <span className="demo-pill-label">{d.label}</span>
                  {d.user}
                </button>
              ))}
            </div>

            <div className="footer-text">
              Problème de connexion ? <a href="#">Contacter le support</a><br />
              <span style={{ fontSize: 11, color: '#d1d5db' }}>EduPrime © 2025 — Tous droits réservés</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};