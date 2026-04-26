import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

// ── Design tokens (shared with BaseLayout & Dashboard) ──────────────────────
// Sidebar bg: #0d1117  |  Accent: #059669 / #34d399  |  Font: Sora
// ────────────────────────────────────────────────────────────────────────────

// ── Icons ───────────────────────────────────────────────────────────────────


const IconDashboard = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 17, height: 17 }}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></svg>;
const IconBook = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 17, height: 17 }}><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" /></svg>;
const IconUsers = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 17, height: 17 }}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
const IconCard = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 17, height: 17 }}><rect x="1" y="4" width="22" height="16" rx="2" /><line x1="1" y1="10" x2="23" y2="10" /></svg>;
const IconClipboard = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 17, height: 17 }}><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" /><rect x="9" y="3" width="6" height="4" rx="1" /></svg>;
const IconSettings = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 17, height: 17 }}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>;
const IconLogout = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>;
const IconBookOpen = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>;
const IconChevron = ({ open }: { open: boolean }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    style={{ width: 13, height: 13, transition: 'transform 0.25s cubic-bezier(.4,0,.2,1)', transform: open ? 'rotate(90deg)' : 'rotate(0deg)', flexShrink: 0 }}>
    <polyline points="9 18 15 12 9 6" />
  </svg>
);
const IconMenuToggle = () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 15, height: 15 }}><line x1="3" y1="8" x2="21" y2="8" /><line x1="3" y1="16" x2="21" y2="16" /></svg>;

// ── Menu config ──────────────────────────────────────────────────────────────
const menuItems = [
  { id: 'scolarite', icon: <IconBook />, label: 'Scolarité', accent: '#3b82f6', subItems: [{ label: 'Élèves', path: '/dashboard/scolarite/eleves', dot: '#3b82f6' }, { label: 'Classes', path: '/dashboard/scolarite/classes', dot: '#8b5cf6' }, { label: 'Cours', path: '/dashboard/scolarite/cours', dot: '#06b6d4' }, { label: 'Emploi du temps', path: '/dashboard/scolarite/emplois', dot: '#f59e0b' }, { label: 'Titulaires', path: '/dashboard/scolarite/titulaires', dot: '#10b981' }] },
  { id: 'personnes', icon: <IconUsers />, label: 'Personnes', accent: '#8b5cf6', subItems: [{ label: 'Enseignants', path: '/dashboard/personnes/enseignants', dot: '#8b5cf6' }, { label: 'Parents', path: '/dashboard/personnes/parents', dot: '#ec4899' }, { label: 'Admins', path: '/dashboard/personnes/admins', dot: '#f97316' }, { label: 'Résidents', path: '/dashboard/personnes/residents', dot: '#14b8a6' }] },
  { id: 'finance', icon: <IconCard />, label: 'Finance', accent: '#e11d48', subItems: [{ label: 'Paiements', path: '/dashboard/finance/paiements', dot: '#e11d48' }, { label: 'Scolarités', path: '/dashboard/finance/scolarites', dot: '#f59e0b' }, { label: 'Tranches', path: '/dashboard/finance/tranches', dot: '#10b981' }, { label: 'Modes de paiement', path: '/dashboard/finance/modes', dot: '#3b82f6' }] },
  { id: 'evaluations', icon: <IconClipboard />, label: 'Évaluations', accent: '#f59e0b', subItems: [{ label: 'Évaluations', path: '/dashboard/evaluations/list', dot: '#f59e0b' }, { label: 'Épreuves', path: '/dashboard/evaluations/epreuves', dot: '#f97316' }, { label: 'Rapports', path: '/dashboard/evaluations/rapports', dot: '#06b6d4' }, { label: 'Sessions', path: '/dashboard/evaluations/sessions', dot: '#8b5cf6' }, { label: 'Trimestres', path: '/dashboard/evaluations/trimestres', dot: '#10b981' }] },
  { id: 'parametres', icon: <IconSettings />, label: 'Paramètres', accent: '#6b7280', subItems: [{ label: 'Années académiques', path: '/dashboard/parametres/annees', dot: '#6b7280' }, { label: 'Cycles', path: '/dashboard/parametres/cycles', dot: '#8b5cf6' }, { label: 'Disciplines', path: '/dashboard/parametres/disciplines', dot: '#f59e0b' }, { label: 'Salles', path: '/dashboard/parametres/salles', dot: '#10b981' }, { label: 'Livres', path: '/dashboard/parametres/livres', dot: '#3b82f6' }, { label: 'Spécialités', path: '/dashboard/parametres/specialites', dot: '#e11d48' }] },
];

// ── Component ────────────────────────────────────────────────────────────────
export const Sidebar = ({
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}: {
  collapsed: boolean;
  setCollapsed: (val: boolean | ((prev: boolean) => boolean)) => void;
  mobileOpen?: boolean;
  setMobileOpen?: (val: boolean) => void;
}) => {
  const { logout, user } = useAuthStore();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (!collapsed) {
      const active = menuItems.find(m => location.pathname.includes(`/dashboard/${m.id}`));
      /* eslint-disable react-hooks/set-state-in-effect */
      if (active) setOpenSection(active.id);
      else if (location.pathname === '/dashboard' || location.pathname === '/dashboard/') setOpenSection(null);
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, [location.pathname, collapsed]);

  useEffect(() => {
    if (mobileOpen && setMobileOpen) setMobileOpen(false);
  }, [location.pathname, mobileOpen, setMobileOpen]);

  const initials = user?.username?.slice(0, 2).toUpperCase() ?? 'AD';
  const displayName = user?.nom ?? user?.username ?? 'Administrateur Principal';

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');

        /* ── Root ── */
        .sb {
          width: ${collapsed ? '68px' : '240px'};
          height: 100vh;
          position: fixed; top: 0; left: 0; z-index: 200;
          background: #0d1117;
          display: flex; flex-direction: column;
          transition: width 0.28s cubic-bezier(0.4,0,0.2,1);
          overflow: hidden;
          border-right: 1px solid rgba(255,255,255,0.055);
          font-family: 'Sora', sans-serif;
        }

        /* ── Header ── */
        .sb-hd {
          padding: 0 14px;
          display: flex; align-items: center; gap: 10px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0; height: 64px;
        }
        .sb-logo-icon {
          width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
          background: linear-gradient(135deg, #059669, #047857);
          display: flex; align-items: center; justify-content: center;
          color: white;
          box-shadow: 0 0 0 1px rgba(5,150,105,0.35), 0 4px 14px rgba(5,150,105,0.28);
        }
        .sb-logo-text {
          font-size: 16px; font-weight: 700; color: #f9fafb; letter-spacing: -0.5px;
          white-space: nowrap;
          opacity: ${collapsed ? 0 : 1};
          transition: opacity 0.18s;
        }
        .sb-logo-text em { font-style: normal; color: #34d399; }
        .sb-toggle {
          margin-left: auto; flex-shrink: 0;
          width: 28px; height: 28px; border-radius: 8px;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          color: #4b5563; cursor: pointer;
          transition: background 0.15s, color 0.15s;
        }
        .sb-toggle:hover { background: rgba(255,255,255,0.1); color: #9ca3af; }

        /* ── Nav ── */
        .sb-nav { flex: 1; overflow-y: auto; overflow-x: hidden; padding: 8px 0; }
        .sb-nav::-webkit-scrollbar { width: 3px; }
        .sb-nav::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 10px; }

        .sb-lbl {
          font-size: 9.5px; font-weight: 600; letter-spacing: 1.4px;
          text-transform: uppercase; color: #374151;
          padding: 16px 16px 6px;
          white-space: nowrap; overflow: hidden;
          opacity: ${collapsed ? 0 : 1}; transition: opacity 0.15s;
        }

        /* ── Nav item ── */
        .sb-itm {
          display: flex; align-items: center; gap: 10px;
          padding: ${collapsed ? '10px 0' : '9px 12px'};
          margin: 1px 8px; border-radius: 10px;
          text-decoration: none; cursor: pointer; border: none;
          background: none; width: calc(100% - 16px);
          color: #6b7280; font-size: 13px; font-weight: 500;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap; overflow: hidden;
          justify-content: ${collapsed ? 'center' : 'flex-start'};
          position: relative; font-family: 'Sora', sans-serif;
        }
        .sb-itm:hover { background: rgba(255,255,255,0.05); color: #e5e7eb; }
        .sb-itm.is-active {
          background: rgba(5,150,105,0.14); color: #34d399;
          box-shadow: inset 0 0 0 1px rgba(5,150,105,0.18);
        }
        .sb-itm.is-active .sb-ico { color: #34d399; }
        .sb-itm.is-open { color: #e5e7eb; background: rgba(255,255,255,0.04); }

        .sb-ico { flex-shrink: 0; display: flex; }
        .sb-lbl-txt { overflow: hidden; text-overflow: ellipsis; opacity: ${collapsed ? 0 : 1}; transition: opacity 0.15s; }
        .sb-chev { margin-left: auto; opacity: ${collapsed ? 0 : 1}; transition: opacity 0.15s; }

        /* ── Active bar ── */
        .sb-itm.is-active::before {
          content: '';
          position: absolute; left: -8px; top: 50%; transform: translateY(-50%);
          width: 3px; height: 18px;
          background: #34d399; border-radius: 0 3px 3px 0;
        }

        /* ── Tooltip (collapsed) ── */
        .sb-itm[data-tip]:hover::after {
          content: attr(data-tip);
          position: absolute; left: 58px; top: 50%; transform: translateY(-50%);
          background: #1a2233; color: #e5e7eb;
          font-size: 12px; font-weight: 500; font-family: 'Sora', sans-serif;
          padding: 5px 11px; border-radius: 8px;
          white-space: nowrap; pointer-events: none;
          box-shadow: 0 4px 16px rgba(0,0,0,0.5);
          border: 1px solid rgba(255,255,255,0.08);
          z-index: 999;
        }

        /* ── Sub items ── */
        .sb-sub { overflow: hidden; max-height: 0; transition: max-height 0.3s cubic-bezier(0.4,0,0.2,1); margin: 0 8px; }
        .sb-sub.is-open { max-height: 400px; }
        .sb-sub-itm {
          display: flex; align-items: center; gap: 9px;
          padding: 7px 12px 7px 36px;
          border-radius: 8px; text-decoration: none;
          font-size: 12.5px; color: #4b5563; font-weight: 400;
          transition: background 0.15s, color 0.15s;
          white-space: nowrap; font-family: 'Sora', sans-serif;
        }
        .sb-sub-itm:hover { background: rgba(255,255,255,0.05); color: #d1d5db; }
        .sb-sub-itm.is-active { color: #f9fafb; background: rgba(255,255,255,0.07); font-weight: 500; }
        .sb-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }

        /* ── Footer ── */
        .sb-ft {
          border-top: 1px solid rgba(255,255,255,0.06);
          padding: 12px 10px; flex-shrink: 0;
        }
        .sb-user {
          display: flex; align-items: center; gap: 10px;
          padding: 8px; border-radius: 10px;
          background: rgba(255,255,255,0.03);
          margin-bottom: 8px; overflow: hidden;
          justify-content: ${collapsed ? 'center' : 'flex-start'};
        }
        .sb-avatar {
          width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0;
          background: linear-gradient(135deg, #059669, #34d399);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: white;
          font-family: 'Sora', sans-serif;
          box-shadow: 0 0 0 2px rgba(5,150,105,0.3);
          position: relative;
        }
        .sb-avatar::after {
          content: ''; position: absolute; bottom: -1px; right: -1px;
          width: 9px; height: 9px; border-radius: 50%;
          background: #22c55e; border: 2px solid #0d1117;
        }
        .sb-uinfo { overflow: hidden; opacity: ${collapsed ? 0 : 1}; transition: opacity 0.15s; min-width: 0; flex: 1; }
        .sb-uname { font-size: 12.5px; font-weight: 600; color: #f9fafb; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: 'Sora', sans-serif; }
        .sb-urole { font-size: 11px; color: #4b5563; margin-top: 1px; }
        .sb-logout {
          display: flex; align-items: center; justify-content: center; gap: 8px;
          width: 100%; padding: ${collapsed ? '9px 0' : '9px 12px'};
          background: rgba(239,68,68,0.06); border: 1px solid rgba(239,68,68,0.1);
          border-radius: 10px; color: #6b7280;
          font-size: 12.5px; font-weight: 500; font-family: 'Sora', sans-serif;
          cursor: pointer; transition: all 0.15s;
        }
        .sb-logout:hover { background: rgba(239,68,68,0.14); color: #f87171; border-color: rgba(239,68,68,0.28); }
        .sb-logout-lbl { opacity: ${collapsed ? 0 : 1}; transition: opacity 0.15s; overflow: hidden; white-space: nowrap; }

        @media (max-width: 768px) {
           .sb {
              width: 260px !important;
              transform: ${mobileOpen ? 'translateX(0)' : 'translateX(-100%)'};
           }
           .sb-logo-text, .sb-lbl { opacity: 1 !important; }
           .sb-itm { justify-content: flex-start !important; padding: 10px 12px !important; width: calc(100% - 16px) !important; }
           .sb-lbl-txt, .sb-chev { opacity: 1 !important; }
           .sb-user { justify-content: flex-start !important; }
           .sb-uinfo { opacity: 1 !important; }
           .sb-logout { padding: 10px 12px !important; }
           .sb-logout-lbl { opacity: 1 !important; }
        }
      `}</style>

      <div className="sb">
        {/* Header */}
        <div className="sb-hd">
          <div className="sb-logo-icon"><IconBookOpen /></div>
          <span className="sb-logo-text">Edu<em>Prime</em></span>
          <button className="sb-toggle" onClick={() => setCollapsed(c => !c)} title={collapsed ? 'Expand' : 'Collapse'}>
            <IconMenuToggle />
          </button>
        </div>

        {/* Nav */}
        <div className="sb-nav">
          {!collapsed && <div className="sb-lbl">Principal</div>}

          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) => `sb-itm${isActive ? ' is-active' : ''}`}
            data-tip={collapsed ? 'Dashboard' : undefined}
          >
            <span className="sb-ico"><IconDashboard /></span>
            <span className="sb-lbl-txt">Dashboard</span>
          </NavLink>

          {!collapsed && <div className="sb-lbl">Gestion</div>}

          {menuItems.map(item => {
            const isOpen = openSection === item.id && !collapsed;
            return (
              <div key={item.id}>
                <button
                  className={`sb-itm${isOpen ? ' is-open' : ''}`}
                  onClick={() => !collapsed && setOpenSection(isOpen ? null : item.id)}
                  data-tip={collapsed ? item.label : undefined}
                >
                  <span className="sb-ico" style={{ color: isOpen ? item.accent : undefined }}>
                    {item.icon}
                  </span>
                  <span className="sb-lbl-txt">{item.label}</span>
                  <span className="sb-chev"><IconChevron open={isOpen} /></span>
                </button>
                <div className={`sb-sub${isOpen ? ' is-open' : ''}`}>
                  {item.subItems.map(sub => (
                    <NavLink
                      key={sub.path}
                      to={sub.path}
                      className={({ isActive }) => `sb-sub-itm${isActive ? ' is-active' : ''}`}
                    >
                      {({ isActive }) => (
                        <>
                          <span className="sb-dot" style={{ background: isActive ? sub.dot : 'rgba(255,255,255,0.1)' }} />
                          {sub.label}
                        </>
                      )}
                    </NavLink>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="sb-ft">
          <div className="sb-user">
            <div className="sb-avatar">{initials}</div>
            {!collapsed && (
              <div className="sb-uinfo">
                <div className="sb-uname">{displayName}</div>
                <div className="sb-urole">Administrateur</div>
              </div>
            )}
          </div>
          <button className="sb-logout" onClick={logout}>
            <IconLogout />
            <span className="sb-logout-lbl">Déconnexion</span>
          </button>
        </div>
      </div>
    </>
  );
};