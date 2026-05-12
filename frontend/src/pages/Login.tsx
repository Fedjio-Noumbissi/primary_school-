import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import api from '../api/axios';
import toast from 'react-hot-toast';

const IconBook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const IconEye = ({ off }: { off?: boolean }) => off ? (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 17, height: 17 }}>
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
) : (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 17, height: 17 }}>
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);
const IconLoader = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" style={{ width: 16, height: 16, animation: 'lg-spin 0.75s linear infinite' }}>
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);
const IconAlert = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15, flexShrink: 0, marginTop: 1 }}>
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);
const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 10, height: 10 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconShield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const features = [
  'Gestion élèves & enseignants',
  'Suivi financier en temps réel',
  'Bulletins automatisés',
  'Tableau de bord analytique',
];

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [shake, setShake] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) return;
    
    setError('');
    setLoading(true);
    setShake(false);

    try {
      window.localStorage.setItem('rememberMe', remember ? 'true' : 'false');
      const res = await api.post('/auth/login', { username, password });
      const { user, token } = res.data.data;
      
      login(user, token);
      
      const redirectByRole: Record<string, string> = {
        fondateur: '/dashboard',
        directeur: '/dashboard',
        admin_scolarite: '/scolarite/eleves',
        admin_auditeur: '/audit',
        parent: '/parent/dashboard',
        enseignant: '/enseignant/dashboard',
        administratif: '/administratif/dashboard',
      };

      const destination = redirectByRole[user.role] ?? '/dashboard';
      toast.success('Connexion réussie');
      navigate(destination, { replace: true });
    } catch (err: any) {
      const msg = err.code === 'ECONNABORTED' || err.message?.includes('timeout')
        ? 'La connexion au serveur est lente. Réessayez dans quelques secondes.'
        : err.response?.data?.message || 'Identifiants incorrects. Veuillez réessayer.';
      setError(msg);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotEmail) return;
    
    setForgotLoading(true);
    try {
      // Action: POST /auth/forgot-password { email }
      await api.post('/auth/forgot-password', { email: forgotEmail });
      toast.success('Email envoyé, vérifiez votre boîte');
      setShowForgotModal(false);
      setForgotEmail('');
    } catch (err: any) {
      toast.error("Erreur lors de l'envoi de l'email");
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* ── Full screen centered container ── */
        .lg-root {
          min-height: 100vh; min-height: 100dvh;
          display: flex; align-items: center; justify-content: center;
          background: #f4f6f5;
          font-family: 'Sora', sans-serif;
          padding: 1.5rem;
        }

        /* ── Card: 50vw centered, split layout ── */
        .lg-card {
          width: 50vw;
          min-width: 520px;
          max-width: 860px;
          background: white;
          border-radius: 22px;
          border: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 8px 48px rgba(0,0,0,0.1), 0 2px 12px rgba(0,0,0,0.05);
          display: flex;
          overflow: hidden;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .lg-card.vis { opacity: 1; transform: translateY(0); }

        /* ── Left green strip ── */
        .lg-left {
          width: 38%;
          background: linear-gradient(155deg, #064e3b 0%, #047857 55%, #059669 100%);
          padding: 2rem 1.75rem;
          display: flex; flex-direction: column; justify-content: space-between;
          position: relative; overflow: hidden;
          flex-shrink: 0;
        }
        .lg-grid {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 36px 36px;
        }
        .lg-glow1 { position: absolute; width: 300px; height: 300px; border-radius: 50%; background: radial-gradient(circle, rgba(52,211,153,0.22) 0%, transparent 65%); top: -80px; right: -80px; pointer-events: none; }
        .lg-glow2 { position: absolute; width: 180px; height: 180px; border-radius: 50%; background: radial-gradient(circle, rgba(16,185,129,0.18) 0%, transparent 70%); bottom: 20px; left: -40px; pointer-events: none; }

        .lg-brand { display: flex; align-items: center; gap: 10px; position: relative; z-index: 1; }
        .lg-brand-icon { width: 38px; height: 38px; border-radius: 11px; background: rgba(255,255,255,0.14); border: 1px solid rgba(255,255,255,0.22); display: flex; align-items: center; justify-content: center; color: white; }
        .lg-brand-name { font-size: 17px; font-weight: 800; color: white; letter-spacing: -0.5px; }
        .lg-brand-name em { font-style: normal; color: #6ee7b7; }
        .lg-brand-sub { font-size: 9.5px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 1.2px; margin-top: 2px; }

        .lg-quote { position: relative; z-index: 1; }
        .lg-quote-txt { font-size: clamp(13px, 1.3vw, 15px); font-weight: 300; color: white; line-height: 1.55; margin-bottom: 1.25rem; }
        .lg-quote-txt strong { font-weight: 700; }

        .lg-features { list-style: none; display: flex; flex-direction: column; gap: 9px; margin-bottom: 1.25rem; }
        .lg-feature { display: flex; align-items: center; gap: 8px; font-size: 11.5px; color: rgba(255,255,255,0.82); }
        .lg-feat-dot { width: 18px; height: 18px; border-radius: 6px; flex-shrink: 0; background: rgba(52,211,153,0.18); border: 1px solid rgba(52,211,153,0.3); display: flex; align-items: center; justify-content: center; color: #6ee7b7; }

        .lg-author { display: flex; align-items: center; gap: 10px; }
        .lg-author-av { width: 34px; height: 34px; border-radius: 50%; background: rgba(255,255,255,0.18); border: 2px solid rgba(255,255,255,0.28); display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; color: white; flex-shrink: 0; }
        .lg-author-name { font-size: 12px; font-weight: 600; color: white; }
        .lg-author-role { font-size: 10.5px; color: rgba(255,255,255,0.5); margin-top: 1px; }

        .lg-stats { display: flex; gap: 1.5rem; padding-top: 1.25rem; border-top: 1px solid rgba(255,255,255,0.12); position: relative; z-index: 1; }
        .lg-stat-num { font-family: 'JetBrains Mono', monospace; font-size: 22px; font-weight: 700; color: white; line-height: 1; }
        .lg-stat-lbl { font-size: 9px; color: rgba(255,255,255,0.5); text-transform: uppercase; letter-spacing: 0.7px; margin-top: 3px; }

        /* ── Right form ── */
        .lg-right { flex: 1; padding: 2.25rem 2.5rem; display: flex; flex-direction: column; justify-content: center; }

        .lg-h1 { font-size: clamp(18px, 1.8vw, 22px); font-weight: 800; color: #0d1117; letter-spacing: -0.6px; margin-bottom: 4px; }
        .lg-sub { font-size: 13px; color: #6b7280; margin-bottom: 1.75rem; line-height: 1.5; }

        .lg-error { display: flex; align-items: flex-start; gap: 8px; background: #fef2f2; border: 1px solid #fecaca; border-left: 3px solid #ef4444; border-radius: 10px; padding: 10px 12px; margin-bottom: 1.25rem; font-size: 12.5px; color: #b91c1c; line-height: 1.45; }

        .lg-field { margin-bottom: 1rem; }
        .lg-label { display: flex; align-items: center; justify-content: space-between; font-size: 12.5px; font-weight: 600; color: #374151; margin-bottom: 6px; }
        .lg-forgot { font-size: 11.5px; font-weight: 400; color: #059669; text-decoration: none; }
        .lg-forgot:hover { text-decoration: underline; }
        .lg-input-wrap { position: relative; }
        .lg-input { width: 100%; padding: 10px 13px; font-family: 'Sora', sans-serif; font-size: 13.5px; color: #111827; background: #fafafa; border: 1.5px solid #e5e7eb; border-radius: 10px; outline: none; transition: all 0.18s; -webkit-appearance: none; }
        .lg-input::placeholder { color: #b0b7c3; }
        .lg-input:focus { border-color: #059669; background: white; box-shadow: 0 0 0 3px rgba(5,150,105,0.1); }

        .lg-pw-toggle { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #9ca3af; padding: 4px; border-radius: 6px; display: flex; align-items: center; transition: color 0.15s; }
        .lg-pw-toggle:hover { color: #374151; }

        .lg-remember { display: flex; align-items: center; gap: 8px; margin: 0.75rem 0 1.25rem; }
        .lg-cb { width: 17px; height: 17px; border-radius: 5px; border: 2px solid #d1d5db; background: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.15s; flex-shrink: 0; }
        .lg-cb.on { background: #059669; border-color: #059669; color: white; box-shadow: 0 2px 6px rgba(5,150,105,0.28); }
        .lg-cb-lbl { font-size: 12.5px; color: #374151; cursor: pointer; user-select: none; }

        .lg-submit { width: 100%; padding: 12px; background: linear-gradient(135deg, #059669 0%, #047857 100%); color: white; font-family: 'Sora', sans-serif; font-size: 13.5px; font-weight: 700; border: none; border-radius: 11px; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 4px 14px rgba(5,150,105,0.32); transition: transform 0.15s, box-shadow 0.15s; }
        .lg-submit:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(5,150,105,0.42); }
        .lg-submit:active:not(:disabled) { transform: translateY(0); }
        .lg-submit:disabled { opacity: 0.65; cursor: not-allowed; }

        .lg-trust { display: flex; align-items: center; justify-content: center; gap: 5px; font-size: 11px; color: #9ca3af; margin-top: 8px; }

        .lg-divider { display: flex; align-items: center; gap: 10px; margin: 1.25rem 0 1rem; font-size: 10.5px; color: #d1d5db; }
        .lg-divider::before, .lg-divider::after { content: ''; flex: 1; height: 1px; background: #f0f0f0; }

        .lg-pills { display: flex; flex-wrap: wrap; gap: 7px; }
        .lg-pill { background: #f9fafb; border: 1.5px solid #e5e7eb; border-radius: 9px; padding: 7px 11px; font-size: 11px; font-family: 'JetBrains Mono', monospace; color: #374151; cursor: pointer; transition: all 0.15s; display: flex; flex-direction: column; gap: 1px; text-align: left; }
        .lg-pill:hover { background: #ecfdf5; border-color: #6ee7b7; color: #047857; }
        .lg-pill-lbl { font-size: 9.5px; color: #9ca3af; font-family: 'Sora', sans-serif; font-weight: 600; letter-spacing: 0.5px; text-transform: uppercase; }

        .lg-footer { text-align: center; font-size: 11px; color: #9ca3af; margin-top: 1.5rem; line-height: 1.7; }
        .lg-footer a { color: #059669; text-decoration: none; }
        .lg-copy { font-size: 10.5px; color: #d1d5db; }

        @keyframes lg-spin { to { transform: rotate(360deg); } }
        @keyframes lg-shake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-5px); }
          40%, 80% { transform: translateX(5px); }
        }
        .lg-shake { animation: lg-shake 0.4s cubic-bezier(.36,.07,.19,.97) both; }

        /* ── Modal Forgot Password ── */
        .lg-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.4);
          display: flex; align-items: center; justify-content: center; z-index: 1000;
          backdrop-filter: blur(4px);
        }
        .lg-modal {
          background: white; border-radius: 16px; padding: 2rem; width: 90%; max-width: 400px;
          box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
        }
        .lg-modal-title { font-size: 18px; font-weight: 700; color: #111827; margin-bottom: 8px; }
        .lg-modal-desc { font-size: 13px; color: #6b7280; margin-bottom: 1.5rem; line-height: 1.5; }
        .lg-modal-actions { display: flex; gap: 10px; margin-top: 1.5rem; }
        .lg-btn-cancel { flex: 1; padding: 10px; background: white; border: 1px solid #e5e7eb; border-radius: 10px; color: #374151; font-size: 13px; font-weight: 600; cursor: pointer; }
        .lg-btn-cancel:hover { background: #f9fafb; }

        /* ── Responsive ── */
        @media (max-width: 767px) {
          .lg-card { width: 100%; min-width: unset; flex-direction: column; border-radius: 18px; }
          .lg-left { width: 100%; padding: 1.5rem; }
          .lg-stats { display: none; }
          .lg-right { padding: 1.75rem 1.5rem; }
        }
        @media (min-width: 768px) and (max-width: 1100px) {
          .lg-card { width: 72vw; }
        }
      `}</style>

      <div className="lg-root">
        <div className={`lg-card${mounted ? ' vis' : ''}`}>

          {/* ── LEFT STRIP ── */}
          <div className="lg-left">
            <div className="lg-grid" />
            <div className="lg-glow1" />
            <div className="lg-glow2" />

            <div className="lg-brand">
              <div className="lg-brand-icon"><IconBook /></div>
              <div>
                <div className="lg-brand-name">Edu<em>Prime</em></div>
                <div className="lg-brand-sub">Portail Administratif</div>
              </div>
            </div>

            <div className="lg-quote">
              <div className="lg-quote-txt">
                Gérez votre établissement avec<br />
                <strong>clarté, rapidité</strong><br />
                et efficacité.
              </div>
              <ul className="lg-features">
                {features.map((f, i) => (
                  <li className="lg-feature" key={i}>
                    <span className="lg-feat-dot"><IconCheck /></span>
                    {f}
                  </li>
                ))}
              </ul>
              <div className="lg-author">
                <div className="lg-author-av">DP</div>
                <div>
                  <div className="lg-author-name">Direction Pédagogique</div>
                  <div className="lg-author-role">Gestion scolaire v2.0</div>
                </div>
              </div>
            </div>

            <div className="lg-stats">
              {[['28', 'Tables'], ['140+', 'Endpoints'], ['∞', 'Possibilités']].map(([n, l]) => (
                <div key={l}>
                  <div className="lg-stat-num">{n}</div>
                  <div className="lg-stat-lbl">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT FORM ── */}
          <div className="lg-right">
            <h1 className="lg-h1">Bon retour 👋</h1>
            <p className="lg-sub">Connectez-vous à votre espace administratif.</p>

            <form onSubmit={handleSubmit} noValidate className={shake ? 'lg-shake' : ''}>
              {error && (
                <div className="lg-error">
                  <IconAlert />
                  <span>{error}</span>
                </div>
              )}

              <div className="lg-field">
                <label className="lg-label">Identifiant</label>
                <div className="lg-input-wrap">
                  <input className="lg-input" style={{ borderColor: error ? '#ef4444' : undefined }} type="text" placeholder="nom.prenom@ecole.cm" required autoComplete="username" value={username} onChange={e => setUsername(e.target.value)} />
                </div>
              </div>

              <div className="lg-field">
                <label className="lg-label">
                  <span>Mot de passe</span>
                  <button type="button" className="lg-forgot" style={{ background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setShowForgotModal(true)}>Mot de passe oublié ?</button>
                </label>
                <div className="lg-input-wrap">
                  <input className="lg-input" style={{ borderColor: error ? '#ef4444' : undefined, paddingRight: 40 }} type={showPw ? 'text' : 'password'} placeholder="••••••••" required autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} />
                  <button type="button" className="lg-pw-toggle" onClick={() => setShowPw(p => !p)} tabIndex={-1}>
                    <IconEye off={showPw} />
                  </button>
                </div>
              </div>

              <div className="lg-remember">
                <div className={`lg-cb${remember ? ' on' : ''}`} role="checkbox" aria-checked={remember} tabIndex={0} onClick={() => setRemember(r => !r)} onKeyDown={e => e.key === ' ' && setRemember(r => !r)}>
                  {remember && <IconCheck />}
                </div>
                <span className="lg-cb-lbl" onClick={() => setRemember(r => !r)}>Se souvenir de moi</span>
              </div>

              <button type="submit" className="lg-submit" disabled={loading}>
                {loading ? <><IconLoader /> Connexion en cours…</> : 'Se connecter →'}
              </button>
            </form>

            <div className="lg-trust">
              <IconShield />
              Connexion chiffrée et sécurisée
            </div>

            <div className="lg-divider">accès démo rapide</div>
            <div className="lg-pills">
              {[
                { label: 'Administrateur', user: 'admin@ecole.fr', pw: 'password123' },
                { label: 'Directeur', user: 'directeur@ecole.fr', pw: 'password123' },
              ].map(d => (
                <button key={d.label} className="lg-pill" type="button" onClick={() => { setUsername(d.user); setPassword(d.pw); }}>
                  <span className="lg-pill-lbl">{d.label}</span>
                  {d.user}
                </button>
              ))}
            </div>

            <div className="lg-footer">
              Problème de connexion ? <a href="#">Contacter le support</a><br />
              <span className="lg-copy">CogniSchool © 2025 — Tous droits réservés</span>
            </div>
          </div>

        </div>
      </div>

      {showForgotModal && (
        <div className="lg-modal-overlay">
          <div className="lg-modal">
            <h2 className="lg-modal-title">Mot de passe oublié</h2>
            <p className="lg-modal-desc">
              Entrez votre adresse email ci-dessous. Nous vous enverrons un lien pour réinitialiser votre mot de passe.
            </p>
            <form onSubmit={handleForgotPassword}>
              <div className="lg-field">
                <label className="lg-label">Adresse email</label>
                <input 
                  type="email" 
                  className="lg-input" 
                  placeholder="votre.email@ecole.cm" 
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  required 
                />
              </div>
              <div className="lg-modal-actions">
                <button type="button" className="lg-btn-cancel" onClick={() => setShowForgotModal(false)}>
                  Annuler
                </button>
                <button type="submit" className="lg-submit" style={{ flex: 1 }} disabled={forgotLoading}>
                  {forgotLoading ? <IconLoader /> : 'Envoyer le lien'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};