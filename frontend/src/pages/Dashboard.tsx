/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area,
} from 'recharts';

// ── Design tokens (mirror Sidebar & BaseLayout) ───────────────────────────────
// Font: Sora + JetBrains Mono  |  Accent: #059669 / #34d399
// Card bg: white  |  Page bg: #f4f6f5  |  Text-primary: #0d1117
// ─────────────────────────────────────────────────────────────────────────────

// ── Icons ─────────────────────────────────────────────────────────────────────
const IconUsers = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 19, height: 19 }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
const IconGrad = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 19, height: 19 }}><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>;
const IconBuilding = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 19, height: 19 }}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></svg>;
const IconCard = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 19, height: 19 }}><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>;
const IconCalendar = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 14, height: 14 }}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
const IconArrowUp = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ width: 11, height: 11 }}><polyline points="18 15 12 9 6 15" /></svg>;
const IconArrowRight = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}><polyline points="9 18 15 12 9 6" /></svg>;

// ── Data ──────────────────────────────────────────────────────────────────────
const payData = [
  { mois: 'Jan', paiements: 8400, objectif: 9000 },
  { mois: 'Fév', paiements: 7200, objectif: 9000 },
  { mois: 'Mar', paiements: 9100, objectif: 9000 },
  { mois: 'Avr', paiements: 7800, objectif: 9000 },
  { mois: 'Mai', paiements: 6500, objectif: 9000 },
  { mois: 'Juin', paiements: 10200, objectif: 9000 },
  { mois: 'Juil', paiements: 8900, objectif: 9000 },
];

const areaData = [
  { mois: 'Sep', eleves: 980 }, { mois: 'Oct', eleves: 1050 },
  { mois: 'Nov', eleves: 1100 }, { mois: 'Déc', eleves: 1080 },
  { mois: 'Jan', eleves: 1190 }, { mois: 'Fév', eleves: 1245 },
];

const recentStudents = [
  { name: 'Amina Koné', classe: 'Terminale A', date: "Aujourd'hui", status: 'nouveau' },
  { name: 'Jean-Baptiste Mballa', classe: '3ème B', date: 'Hier', status: 'nouveau' },
  { name: 'Fatou Diallo', classe: '2nde C', date: '22 avr.', status: 'transfert' },
  { name: 'Serge Atangana', classe: '1ère D', date: '21 avr.', status: 'nouveau' },
  { name: 'Marie-Claire Nguema', classe: 'CM2', date: '20 avr.', status: 'transfert' },
];

const alerts = [
  { text: '14 paiements en retard de plus de 30 jours', type: 'danger' },
  { text: '3 salles non assignées pour le prochain trimestre', type: 'warn' },
  { text: 'Clôture du trimestre dans 8 jours', type: 'info' },
];

const quickStats = [
  { label: 'Taux de paiement', value: '78%', color: '#059669' },
  { label: 'Assiduité moy.', value: '91%', color: '#3b82f6' },
  { label: 'Cours planifiés', value: '128', color: '#7c3aed' },
  { label: 'Examens à venir', value: '6', color: '#f59e0b' },
];

// Avatar color palettes — sync with Sidebar/BaseLayout avatar gradient
const avatarPalettes = [
  { bg: '#eff6ff', color: '#3b82f6' },
  { bg: '#ecfdf5', color: '#059669' },
  { bg: '#f5f3ff', color: '#7c3aed' },
  { bg: '#fff7ed', color: '#f59e0b' },
  { bg: '#fff1f2', color: '#e11d48' },
];

// ── Custom tooltip ─────────────────────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12,
      padding: '10px 14px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      fontSize: 13, fontFamily: "'Sora', sans-serif",
    }}>
      <div style={{ fontWeight: 700, color: '#0d1117', marginBottom: 6 }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6b7280', marginTop: 3 }}>
          <span style={{ width: 8, height: 8, borderRadius: 3, background: p.color, display: 'inline-block' }} />
          {p.name === 'paiements' ? 'Paiements' : p.name === 'objectif' ? 'Objectif' : 'Élèves'} :&nbsp;
          <strong style={{ color: '#0d1117' }}>
            {p.name !== 'eleves' ? `${(p.value / 1000).toFixed(1)}k FCFA` : p.value}
          </strong>
        </div>
      ))}
    </div>
  );
};

// ── Component ─────────────────────────────────────────────────────────────────
export const Dashboard = () => {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState('6M');

  useEffect(() => { setTimeout(() => setMounted(true), 60); }, []);

  const stats = [
    { label: 'Total Élèves', value: '1 245', delta: '+3.2%', icon: <IconUsers />, accent: '#3b82f6', bg: '#eff6ff', border: '#bfdbfe' },
    { label: 'Enseignants', value: '84', delta: '+1', icon: <IconGrad />, accent: '#059669', bg: '#ecfdf5', border: '#6ee7b7' },
    { label: 'Classes Actives', value: '32', delta: '±0', icon: <IconBuilding />, accent: '#7c3aed', bg: '#f5f3ff', border: '#c4b5fd' },
    { label: 'Paiements / mois', value: '12M FCFA', delta: '+8.4%', icon: <IconCard />, accent: '#e11d48', bg: '#fff1f2', border: '#fecdd3' },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

        /* ── Base ── */
        .db { padding: 28px 32px 48px; background: #f4f6f5; min-height: 100%; font-family: 'Sora', sans-serif; }

        /* ── Page header ── */
        .db-ph { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 28px; flex-wrap: wrap; gap: 12px; }
        .db-title { font-size: 22px; font-weight: 700; color: #0d1117; letter-spacing: -0.6px; font-family: 'Sora', sans-serif; }
        .db-date { display: flex; align-items: center; gap: 6px; font-size: 12.5px; color: #9ca3af; margin-top: 4px; }
        .db-year-badge {
          font-size: 11.5px; font-weight: 500;
          background: linear-gradient(135deg, #059669, #047857);
          color: white; padding: 4px 12px; border-radius: 20px;
          letter-spacing: 0.1px;
          box-shadow: 0 2px 8px rgba(5,150,105,0.25);
        }

        /* ── Cards ── */
        .db-card {
          background: white; border-radius: 16px;
          border: 1px solid rgba(0,0,0,0.06);
          box-shadow: 0 1px 3px rgba(0,0,0,0.05), 0 4px 12px rgba(0,0,0,0.03);
        }
        .db-card-inner { padding: 22px 24px; }

        /* ── Stats grid ── */
        .db-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 16px; margin-bottom: 20px; }
        .db-stat {
          opacity: 0; transform: translateY(14px);
          transition: opacity 0.38s ease, transform 0.38s ease, box-shadow 0.2s;
        }
        .db-stat.vis { opacity: 1; transform: translateY(0); }
        .db-stat:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.08) !important; }
        .db-stat-top { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 16px; }
        .db-stat-icon { width: 42px; height: 42px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
        .db-stat-delta {
          display: flex; align-items: center; gap: 4px;
          font-size: 11.5px; font-weight: 600;
          padding: 3px 9px; border-radius: 20px;
          background: #ecfdf5; color: #059669;
        }
        .db-stat-val { font-family: 'JetBrains Mono', monospace; font-size: 26px; font-weight: 600; color: #0d1117; letter-spacing: -1px; line-height: 1; }
        .db-stat-lbl { font-size: 12px; color: #9ca3af; margin-top: 5px; font-weight: 400; }

        /* ── Charts row ── */
        .db-charts { display: grid; grid-template-columns: 1fr; gap: 16px; margin-bottom: 20px; }
        @media (min-width: 860px) { .db-charts { grid-template-columns: 2fr 1fr; } }

        .db-card-hd { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 20px; flex-wrap: wrap; gap: 8px; }
        .db-card-title { font-size: 14.5px; font-weight: 700; color: #0d1117; letter-spacing: -0.3px; }
        .db-card-sub { font-size: 12px; color: #9ca3af; margin-top: 2px; }

        .db-filters { display: flex; gap: 3px; background: #f3f4f6; border-radius: 9px; padding: 3px; }
        .db-filter {
          padding: 4px 11px; font-size: 12px; font-weight: 500; border: none;
          background: none; border-radius: 7px; cursor: pointer; color: #6b7280;
          font-family: 'Sora', sans-serif; transition: all 0.15s;
        }
        .db-filter.active { background: white; color: #059669; box-shadow: 0 1px 4px rgba(0,0,0,0.1); }

        .db-legend { display: flex; gap: 16px; margin-top: 14px; justify-content: center; }
        .db-legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #6b7280; }
        .db-legend-dot { width: 8px; height: 8px; border-radius: 50%; }

        /* Big number */
        .db-bignum { font-family: 'JetBrains Mono', monospace; font-size: 38px; font-weight: 700; color: #0d1117; letter-spacing: -2px; margin: 16px 0 6px; line-height: 1; }
        .db-growth { display: inline-flex; align-items: center; gap: 5px; font-size: 12px; font-weight: 600; color: #059669; background: #ecfdf5; padding: 3px 10px; border-radius: 20px; margin-bottom: 16px; }

        /* ── Bottom row ── */
        .db-bottom { display: grid; grid-template-columns: 1fr; gap: 16px; }
        @media (min-width: 860px) { .db-bottom { grid-template-columns: 1.5fr 1fr; } }

        /* Students */
        .db-student { display: flex; align-items: center; gap: 12px; padding: 11px 0; border-bottom: 1px solid #f9fafb; }
        .db-student:last-child { border-bottom: none; }
        .db-s-av { width: 38px; height: 38px; border-radius: 11px; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; flex-shrink: 0; font-family: 'Sora', sans-serif; }
        .db-s-name { font-size: 13.5px; font-weight: 600; color: #111827; }
        .db-s-meta { font-size: 12px; color: #9ca3af; margin-top: 2px; }
        .db-s-badge { font-size: 10.5px; font-weight: 600; padding: 3px 10px; border-radius: 20px; flex-shrink: 0; margin-left: auto; }
        .see-all { font-size: 12px; color: #059669; background: none; border: 1px solid #6ee7b7; border-radius: 8px; padding: 5px 13px; cursor: pointer; font-family: 'Sora', sans-serif; font-weight: 500; display: flex; align-items: center; gap: 4px; transition: all 0.15s; }
        .see-all:hover { background: #ecfdf5; border-color: #34d399; }

        /* Alerts */
        .db-alert { display: flex; align-items: flex-start; gap: 10px; padding: 12px 14px; border-radius: 10px; margin-bottom: 10px; font-size: 13px; line-height: 1.45; }
        .db-alert:last-child { margin-bottom: 0; }
        .db-alert-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; margin-top: 4px; }

        /* Quick stats */
        .db-qs { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 20px; }
        .db-qs-item { background: #f9fafb; border-radius: 11px; padding: 12px 14px; border: 1px solid rgba(0,0,0,0.05); }
        .db-qs-val { font-family: 'JetBrains Mono', monospace; font-size: 20px; font-weight: 700; line-height: 1; }
        .db-qs-lbl { font-size: 11px; color: #9ca3af; margin-top: 4px; }

        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      <div className="db">

        {/* ── Page header ── */}
        <div className="db-ph">
          <div>
            <div className="db-title">Tableau de bord</div>
            <div className="db-date">
              <IconCalendar />
              Vendredi 25 avril 2025 · Année académique 2024–2025
            </div>
          </div>
          <div className="db-year-badge">2024–2025</div>
        </div>

        {/* ── Stat cards ── */}
        <div className="db-stats">
          {stats.map((s, i) => (
            <div
              key={i}
              className={`db-card db-stat${mounted ? ' vis' : ''}`}
              style={{ transitionDelay: `${i * 75}ms` }}
            >
              <div className="db-card-inner">
                <div className="db-stat-top">
                  <div className="db-stat-icon" style={{ background: s.bg, color: s.accent, border: `1px solid ${s.border}` }}>
                    {s.icon}
                  </div>
                  <div className="db-stat-delta">
                    <IconArrowUp />
                    {s.delta}
                  </div>
                </div>
                <div className="db-stat-val">{s.value}</div>
                <div className="db-stat-lbl">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Charts ── */}
        <div className="db-charts">

          {/* Bar chart */}
          <div className="db-card" style={{ animation: mounted ? 'fadeUp 0.45s ease 0.32s both' : 'none' }}>
            <div className="db-card-inner">
              <div className="db-card-hd">
                <div>
                  <div className="db-card-title">Évolution des paiements</div>
                  <div className="db-card-sub">Comparaison mensuelle vs objectif</div>
                </div>
                <div className="db-filters">
                  {['3M', '6M', '1A'].map(f => (
                    <button key={f} className={`db-filter${activeFilter === f ? ' active' : ''}`} onClick={() => setActiveFilter(f)}>{f}</button>
                  ))}
                </div>
              </div>
              <ResponsiveContainer width="100%" height={230}>
                <BarChart data={payData} barGap={5}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="mois" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af', fontFamily: 'Sora' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af', fontFamily: 'Sora' }} tickFormatter={v => `${v / 1000}k`} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(0,0,0,0.03)', radius: 6 }} />
                  <Bar dataKey="paiements" fill="#059669" radius={[7, 7, 0, 0]} maxBarSize={34} />
                  <Bar dataKey="objectif" fill="#d1fae5" radius={[7, 7, 0, 0]} maxBarSize={34} />
                </BarChart>
              </ResponsiveContainer>
              <div className="db-legend">
                {[['#059669', 'Paiements reçus'], ['#d1fae5', 'Objectif']].map(([c, l]) => (
                  <div key={l} className="db-legend-item">
                    <span className="db-legend-dot" style={{ background: c }} />{l}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Area chart */}
          <div className="db-card" style={{ animation: mounted ? 'fadeUp 0.45s ease 0.44s both' : 'none' }}>
            <div className="db-card-inner">
              <div className="db-card-hd">
                <div>
                  <div className="db-card-title">Effectif élèves</div>
                  <div className="db-card-sub">Progression depuis sept.</div>
                </div>
              </div>
              <div className="db-bignum">1 245</div>
              <div className="db-growth">
                <IconArrowUp /> 27.0% depuis le début d'année
              </div>
              <ResponsiveContainer width="100%" height={140}>
                <AreaChart data={areaData}>
                  <defs>
                    <linearGradient id="elGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#059669" stopOpacity={0.16} />
                      <stop offset="100%" stopColor="#059669" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="mois" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9ca3af', fontFamily: 'Sora' }} />
                  <YAxis hide domain={['dataMin - 50', 'dataMax + 50']} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="eleves" stroke="#059669" strokeWidth={2.5} fill="url(#elGrad)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ── Bottom row ── */}
        <div className="db-bottom">

          {/* Recent students */}
          <div className="db-card" style={{ animation: mounted ? 'fadeUp 0.45s ease 0.54s both' : 'none' }}>
            <div className="db-card-inner">
              <div className="db-card-hd">
                <div>
                  <div className="db-card-title">Dernières inscriptions</div>
                  <div className="db-card-sub">Élèves récemment enregistrés</div>
                </div>
                <button className="see-all">Voir tout <IconArrowRight /></button>
              </div>
              {recentStudents.map((s, i) => {
                const initials = s.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
                const pal = avatarPalettes[i % avatarPalettes.length];
                return (
                  <div className="db-student" key={i}>
                    <div className="db-s-av" style={{ background: pal.bg, color: pal.color }}>{initials}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div className="db-s-name">{s.name}</div>
                      <div className="db-s-meta">{s.classe} · {s.date}</div>
                    </div>
                    <div
                      className="db-s-badge"
                      style={s.status === 'nouveau'
                        ? { background: '#ecfdf5', color: '#059669' }
                        : { background: '#eff6ff', color: '#3b82f6' }}
                    >
                      {s.status === 'nouveau' ? 'Nouveau' : 'Transfert'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Alerts + Quick stats */}
          <div className="db-card" style={{ animation: mounted ? 'fadeUp 0.45s ease 0.64s both' : 'none' }}>
            <div className="db-card-inner">
              <div className="db-card-hd">
                <div>
                  <div className="db-card-title">Alertes & rappels</div>
                  <div className="db-card-sub">Actions requises</div>
                </div>
                <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#ef4444', fontFamily: 'Sora' }}>
                  {alerts.length}
                </div>
              </div>

              {alerts.map((a, i) => {
                const s = {
                  danger: { bg: '#fff1f2', border: '#fecdd3', dot: '#ef4444', text: '#9f1239' },
                  warn: { bg: '#fffbeb', border: '#fde68a', dot: '#f59e0b', text: '#92400e' },
                  info: { bg: '#eff6ff', border: '#bfdbfe', dot: '#3b82f6', text: '#1e40af' },
                }[a.type as 'danger' | 'warn' | 'info'];
                return (
                  <div key={i} className="db-alert" style={{ background: s.bg, border: `1px solid ${s.border}`, color: s.text }}>
                    <span className="db-alert-dot" style={{ background: s.dot }} />
                    {a.text}
                  </div>
                );
              })}

              <div className="db-qs">
                {quickStats.map((q, i) => (
                  <div className="db-qs-item" key={i}>
                    <div className="db-qs-val" style={{ color: q.color }}>{q.value}</div>
                    <div className="db-qs-lbl">{q.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};