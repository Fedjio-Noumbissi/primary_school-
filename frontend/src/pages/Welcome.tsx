import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// ── Icons (inline SVG) ─────────────────────────────────────────────────────
const IconBook = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);
const IconArrow = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const IconDashboard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
    <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
  </svg>
);
const IconUsers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const IconCard = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22 }}>
    <rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const IconCheck = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconStar = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 14, height: 14 }}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ── Floating orbs background ───────────────────────────────────────────────
const Orbs = () => (
  <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
    <div style={{ position: 'absolute', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(5,150,105,0.10) 0%, transparent 70%)', top: -150, right: -100, animation: 'pulse 8s ease-in-out infinite' }} />
    <div style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%)', bottom: 100, left: -80, animation: 'pulse 10s ease-in-out 2s infinite' }} />
    <div style={{ position: 'absolute', width: 250, height: 250, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)', top: '45%', left: '40%', animation: 'pulse 7s ease-in-out 1s infinite' }} />
    {/* Grid overlay */}
    <div style={{
      position: 'absolute', inset: 0,
      backgroundImage: 'linear-gradient(rgba(5,150,105,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(5,150,105,0.03) 1px, transparent 1px)',
      backgroundSize: '60px 60px',
    }} />
  </div>
);

// ── Animated counter ───────────────────────────────────────────────────────
const Counter = ({ target, suffix = '' }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const step = target / 40;
    let cur = 0;
    const t = setInterval(() => {
      cur += step;
      if (cur >= target) { setCount(target); clearInterval(t); }
      else setCount(Math.floor(cur));
    }, 40);
    return () => clearInterval(t);
  }, [target]);
  return <>{count.toLocaleString()}{suffix}</>;
};

export const Welcome = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  const features = [
    {
      icon: <IconDashboard />,
      title: 'Tableau de bord intuitif',
      desc: 'Vue d\'ensemble en temps réel de toutes les statistiques clés : effectifs, paiements, assiduité.',
      accent: '#059669', bg: '#ecfdf5', border: '#6ee7b7',
      perks: ['Graphiques interactifs', 'KPIs en direct', 'Alertes intelligentes'],
    },
    {
      icon: <IconUsers />,
      title: 'Gestion complète',
      desc: 'Élèves, enseignants, parents, classes — tout centralisé dans une interface fluide et rapide.',
      accent: '#7c3aed', bg: '#f5f3ff', border: '#c4b5fd',
      perks: ['Profils détaillés', 'Relations parent-élève', 'Import CSV'],
    },
    {
      icon: <IconCard />,
      title: 'Finance sécurisée',
      desc: 'Traçabilité parfaite des scolarités, paiements par tranche et historiques complets.',
      accent: '#e11d48', bg: '#fff1f2', border: '#fecdd3',
      perks: ['Reçus automatiques', 'Suivi des impayés', 'Export comptable'],
    },
  ];

  const stats = [
    { value: 1245, suffix: '+', label: 'Élèves gérés' },
    { value: 98, suffix: '%', label: 'Taux de satisfaction' },
    { value: 28, suffix: '', label: 'Modules actifs' },
    { value: 12, suffix: 'M', label: 'FCFA traités / mois' },
  ];

  const trust = ['Données chiffrées AES-256', 'Sauvegardes quotidiennes', 'Conformité RGPD', 'Support 24/7'];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        .welcome-root {
          min-height: 100vh;
          background: #f6f8f7;
          font-family: 'Sora', sans-serif;
          color: #0a1f13;
          overflow-x: hidden;
        }

        /* ── Nav ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 5%;
          background: rgba(246,248,247,0.85);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(5,150,105,0.08);
          transition: box-shadow 0.3s;
        }
        .nav-logo { display: flex; align-items: center; gap: 10px; text-decoration: none; }
        .nav-icon {
          width: 42px; height: 42px;
          background: linear-gradient(135deg, #059669, #047857);
          border-radius: 12px;
          display: flex; align-items: center; justify-content: center;
          color: white;
          box-shadow: 0 4px 12px rgba(5,150,105,0.3);
        }
        .nav-brand { font-size: 20px; font-weight: 700; color: #0a1f13; letter-spacing: -0.5px; }
        .nav-brand span { color: #059669; }
        .nav-links { display: flex; align-items: center; gap: 8px; }
        .nav-pill {
          font-size: 13px; font-weight: 500; color: #6b7280;
          padding: 7px 16px; border-radius: 8px; text-decoration: none;
          transition: color 0.15s, background 0.15s;
          display: none;
        }
        @media (min-width: 640px) { .nav-pill { display: block; } }
        .nav-pill:hover { color: #059669; background: #ecfdf5; }
        .nav-cta {
          display: flex; align-items: center; gap: 7px;
          background: linear-gradient(135deg, #059669, #047857);
          color: white; font-size: 13px; font-weight: 600;
          padding: 9px 20px; border-radius: 10px; text-decoration: none;
          box-shadow: 0 4px 14px rgba(5,150,105,0.35);
          transition: transform 0.15s, box-shadow 0.15s;
          letter-spacing: 0.1px;
        }
        .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(5,150,105,0.45); }
        .cta-arrow { transition: transform 0.2s; }
        .nav-cta:hover .cta-arrow { transform: translateX(3px); }

        /* ── Hero ── */
        .hero {
          position: relative; padding: 160px 5% 100px;
          display: flex; flex-direction: column; align-items: center;
          text-align: center; overflow: hidden;
        }
        .hero-badge {
          display: inline-flex; align-items: center; gap: 8px;
          background: white; border: 1px solid #6ee7b7;
          color: #047857; font-size: 12.5px; font-weight: 500;
          padding: 6px 14px; border-radius: 100px;
          margin-bottom: 2.5rem; box-shadow: 0 2px 8px rgba(5,150,105,0.1);
          opacity: 0; transform: translateY(12px);
          transition: opacity 0.5s, transform 0.5s;
        }
        .hero-badge.vis { opacity: 1; transform: translateY(0); }
        .ping-dot { position: relative; width: 10px; height: 10px; }
        .ping-outer {
          position: absolute; inset: 0; border-radius: 50%;
          background: rgba(5,150,105,0.4);
          animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite;
        }
        .ping-inner { position: relative; width: 10px; height: 10px; border-radius: 50%; background: #059669; }

        .hero-h1 {
          font-size: clamp(36px, 6vw, 72px);
          font-weight: 800; line-height: 1.1; letter-spacing: -2px;
          color: #0a1f13; margin-bottom: 1.5rem;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.6s 0.1s, transform 0.6s 0.1s;
        }
        .hero-h1.vis { opacity: 1; transform: translateY(0); }
        .hero-h1 .accent {
          background: linear-gradient(135deg, #059669 0%, #34d399 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-sub {
          font-size: clamp(15px, 2vw, 19px); font-weight: 400;
          color: #6b7280; line-height: 1.65; max-width: 580px;
          margin-bottom: 2.5rem;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.6s 0.2s, transform 0.6s 0.2s;
        }
        .hero-sub.vis { opacity: 1; transform: translateY(0); }

        .hero-actions {
          display: flex; flex-wrap: wrap; gap: 12px; justify-content: center;
          margin-bottom: 4rem;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.6s 0.3s, transform 0.6s 0.3s;
        }
        .hero-actions.vis { opacity: 1; transform: translateY(0); }
        .btn-primary {
          display: flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          color: white; font-family: 'Sora', sans-serif;
          font-size: 15px; font-weight: 600;
          padding: 14px 28px; border-radius: 12px; text-decoration: none;
          box-shadow: 0 6px 20px rgba(5,150,105,0.4);
          transition: transform 0.15s, box-shadow 0.15s;
        }
        .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(5,150,105,0.5); }
        .btn-secondary {
          display: flex; align-items: center; gap: 8px;
          background: white; color: #374151;
          font-family: 'Sora', sans-serif; font-size: 15px; font-weight: 500;
          padding: 14px 28px; border-radius: 12px; text-decoration: none;
          border: 1.5px solid #e5e7eb;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .btn-secondary:hover { border-color: #6ee7b7; box-shadow: 0 4px 14px rgba(5,150,105,0.1); }

        /* trust strip */
        .trust-strip {
          display: flex; flex-wrap: wrap; justify-content: center; gap: 10px 20px;
          opacity: 0; transition: opacity 0.6s 0.45s;
        }
        .trust-strip.vis { opacity: 1; }
        .trust-item { display: flex; align-items: center; gap: 6px; font-size: 12.5px; color: #9ca3af; }
        .trust-check { width: 18px; height: 18px; border-radius: 50%; background: #ecfdf5; display: flex; align-items: center; justify-content: center; color: #059669; flex-shrink: 0; }

        /* ── Stats ── */
        .stats-section {
          padding: 0 5% 80px; position: relative; z-index: 1;
        }
        .stats-grid {
          max-width: 900px; margin: 0 auto;
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;
        }
        @media (min-width: 640px) { .stats-grid { grid-template-columns: repeat(4, 1fr); } }
        .stat-card {
          background: white; border: 1px solid #f0f0f0;
          border-radius: 16px; padding: 24px 20px; text-align: center;
          transition: box-shadow 0.2s, transform 0.2s;
        }
        .stat-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.07); transform: translateY(-2px); }
        .stat-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 32px; font-weight: 600; color: #0a1f13; line-height: 1;
          margin-bottom: 6px; letter-spacing: -1px;
        }
        .stat-label { font-size: 12px; color: #9ca3af; font-weight: 400; }

        /* ── Features ── */
        .features-section { padding: 40px 5% 100px; position: relative; z-index: 1; }
        .section-label {
          text-align: center; margin-bottom: 12px;
          font-size: 12px; font-weight: 600; letter-spacing: 2px;
          text-transform: uppercase; color: #059669;
        }
        .section-title {
          text-align: center; font-size: clamp(26px, 4vw, 42px); font-weight: 700;
          color: #0a1f13; letter-spacing: -1px; margin-bottom: 8px; line-height: 1.2;
        }
        .section-sub {
          text-align: center; font-size: 15px; color: #6b7280;
          max-width: 480px; margin: 0 auto 3.5rem; line-height: 1.6;
        }
        .features-grid {
          max-width: 1100px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr; gap: 20px;
        }
        @media (min-width: 768px) { .features-grid { grid-template-columns: repeat(3, 1fr); } }
        .feat-card {
          background: white; border-radius: 20px;
          padding: 28px 26px; border: 1px solid #f0f0f0;
          transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
          display: flex; flex-direction: column; gap: 0;
        }
        .feat-card:hover { box-shadow: 0 12px 36px rgba(0,0,0,0.08); transform: translateY(-4px); }
        .feat-icon-wrap {
          width: 52px; height: 52px; border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 18px; border: 1px solid;
        }
        .feat-title { font-size: 17px; font-weight: 700; color: #0a1f13; margin-bottom: 10px; letter-spacing: -0.3px; }
        .feat-desc { font-size: 13.5px; color: #6b7280; line-height: 1.6; margin-bottom: 18px; flex: 1; }
        .feat-perks { display: flex; flex-direction: column; gap: 8px; border-top: 1px solid #f9fafb; padding-top: 18px; }
        .feat-perk { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: #374151; }
        .perk-check { width: 20px; height: 20px; border-radius: 6px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }

        /* ── CTA Banner ── */
        .cta-section { padding: 0 5% 100px; }
        .cta-banner {
          max-width: 900px; margin: 0 auto;
          background: linear-gradient(135deg, #065f46 0%, #047857 50%, #059669 100%);
          border-radius: 24px; padding: 56px 48px;
          display: flex; flex-direction: column; align-items: center; text-align: center;
          position: relative; overflow: hidden;
          box-shadow: 0 20px 60px rgba(5,150,105,0.3);
        }
        .cta-grid {
          position: absolute; inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .cta-h2 { font-size: clamp(24px, 4vw, 38px); font-weight: 700; color: white; letter-spacing: -1px; margin-bottom: 14px; position: relative; z-index: 1; line-height: 1.2; }
        .cta-p { font-size: 15px; color: rgba(255,255,255,0.7); margin-bottom: 32px; position: relative; z-index: 1; line-height: 1.6; max-width: 440px; }
        .cta-btn {
          display: flex; align-items: center; gap: 8px;
          background: white; color: #065f46;
          font-family: 'Sora', sans-serif; font-size: 15px; font-weight: 700;
          padding: 14px 32px; border-radius: 12px; text-decoration: none;
          box-shadow: 0 4px 14px rgba(0,0,0,0.15);
          transition: transform 0.15s, box-shadow 0.15s;
          position: relative; z-index: 1;
        }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.2); }

        /* ── Footer ── */
        .footer {
          border-top: 1px solid #f0f0f0;
          padding: 24px 5%; display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
        }
        .footer-brand { font-size: 14px; font-weight: 600; color: #0a1f13; }
        .footer-copy { font-size: 12px; color: #9ca3af; }

        /* ── Stars ── */
        .stars { display: flex; gap: 2px; color: #f59e0b; margin-bottom: 8px; }

        @keyframes ping { 75%, 100% { transform: scale(2.5); opacity: 0; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
      `}</style>

      <div className="welcome-root">

        {/* ── Navigation ── */}
        <nav className="nav">
          <Link to="/" className="nav-logo">
            <div className="nav-icon"><IconBook /></div>
            <span className="nav-brand">Edu<span>Prime</span></span>
          </Link>
          <div className="nav-links">
            <a href="#features" className="nav-pill">Fonctionnalités</a>
            <a href="#stats" className="nav-pill">Statistiques</a>
            <Link to="/login" className="nav-cta">
              Se connecter <span className="cta-arrow"><IconArrow /></span>
            </Link>
          </div>
        </nav>

        {/* ── Hero ── */}
        <section className="hero">
          <Orbs />

          <div className={`hero-badge${mounted ? ' vis' : ''}`}>
            <div className="ping-dot">
              <div className="ping-outer" />
              <div className="ping-inner" />
            </div>
            EduPrime v2.0 est disponible
          </div>

          <h1 className={`hero-h1${mounted ? ' vis' : ''}`}>
            Gérez votre établissement<br />
            avec <span className="accent">fluidité & sécurité.</span>
          </h1>

          <p className={`hero-sub${mounted ? ' vis' : ''}`}>
            La plateforme tout-en-un pour simplifier l'administration scolaire,
            le suivi pédagogique et la gestion financière de bout en bout.
          </p>

          <div className={`hero-actions${mounted ? ' vis' : ''}`}>
            <Link to="/login" className="btn-primary">
              Commencer maintenant <IconArrow />
            </Link>
            <a href="#features" className="btn-secondary">
              Voir les fonctionnalités
            </a>
          </div>

          <div className={`trust-strip${mounted ? ' vis' : ''}`}>
            {trust.map((t) => (
              <div className="trust-item" key={t}>
                <div className="trust-check"><IconCheck /></div>
                {t}
              </div>
            ))}
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="stats-section" id="stats">
          <div className="stats-grid">
            {stats.map((s, i) => (
              <div className="stat-card" key={i}>
                <div className="stat-num">
                  {mounted ? <Counter target={s.value} suffix={s.suffix} /> : `0${s.suffix}`}
                </div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Features ── */}
        <section className="features-section" id="features">
          <div className="section-label">Fonctionnalités</div>
          <h2 className="section-title">Tout ce dont vous avez besoin</h2>
          <p className="section-sub">
            Une suite complète d'outils pensée pour les équipes administratives modernes.
          </p>

          <div className="features-grid">
            {features.map((f, i) => (
              <div className="feat-card" key={i} style={{ transitionDelay: `${i * 60}ms` }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = f.border)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#f0f0f0')}
              >
                <div className="feat-icon-wrap" style={{ background: f.bg, borderColor: f.border, color: f.accent }}>
                  {f.icon}
                </div>
                <div className="feat-title">{f.title}</div>
                <div className="feat-desc">{f.desc}</div>
                <div className="feat-perks">
                  {f.perks.map((p) => (
                    <div className="feat-perk" key={p}>
                      <div className="perk-check" style={{ background: f.bg, color: f.accent }}><IconCheck /></div>
                      {p}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Trust logos row (placeholder) ── */}
        <section style={{ padding: '0 5% 80px', textAlign: 'center' }}>
          <p style={{ fontSize: 12, color: '#d1d5db', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24, fontWeight: 600 }}>
            Approuvé par des établissements dans toute la région
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '12px 32px' }}>
            {['Lycée Général', 'Collège Privé', 'École Primaire', 'Institut Supérieur', 'Groupe Scolaire'].map((name) => (
              <div key={name} style={{ background: 'white', border: '1px solid #f0f0f0', borderRadius: 10, padding: '10px 20px', fontSize: 13, fontWeight: 600, color: '#9ca3af' }}>
                {name}
              </div>
            ))}
          </div>
        </section>

        {/* ── Testimonial ── */}
        <section style={{ padding: '0 5% 80px' }}>
          <div style={{ maxWidth: 680, margin: '0 auto', background: 'white', borderRadius: 20, padding: '36px 40px', border: '1px solid #f0f0f0', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
            <div className="stars">{[...Array(5)].map((_, i) => <IconStar key={i} />)}</div>
            <p style={{ fontSize: 17, color: '#374151', lineHeight: 1.65, fontStyle: 'italic', marginBottom: 24, fontWeight: 300 }}>
              "EduPrime a transformé notre gestion scolaire. Ce qui prenait une journée entière ne prend plus que quelques minutes. Une solution vraiment pensée pour nous."
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
              <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg,#ecfdf5,#6ee7b7)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: '#059669' }}>DM</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: '#0a1f13' }}>Dr. Moussa Ndiaye</div>
                <div style={{ fontSize: 12, color: '#9ca3af' }}>Directeur, Lycée Excellence — Douala</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA Banner ── */}
        <section className="cta-section">
          <div className="cta-banner">
            <div className="cta-grid" />
            <h2 className="cta-h2">Prêt à moderniser votre école ?</h2>
            <p className="cta-p">
              Rejoignez les établissements qui font confiance à EduPrime pour leur gestion quotidienne.
            </p>
            <Link to="/login" className="cta-btn">
              Accéder à la plateforme <IconArrow />
            </Link>
          </div>
        </section>

        {/* ── Footer ── */}
        <footer className="footer">
          <div className="footer-brand">EduPrime</div>
          <div className="footer-copy">© 2025 EduPrime. Tous droits réservés.</div>
          <div style={{ display: 'flex', gap: 16 }}>
            {['Confidentialité', 'CGU', 'Support'].map(l => (
              <a key={l} href="#" style={{ fontSize: 12, color: '#9ca3af', textDecoration: 'none' }}>{l}</a>
            ))}
          </div>
        </footer>

      </div>
    </>
  );
};