import { useState, useRef, useEffect } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Sidebar } from './Sidebar';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../api/axios';
import toast from 'react-hot-toast';

// ── Icons ────────────────────────────────────────────────────────────────────
const IconBell = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const IconSearch = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const IconChevronDown = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const IconMenu = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ width: 17, height: 17 }}>
    <line x1="3" y1="8" x2="21" y2="8" /><line x1="3" y1="16" x2="21" y2="16" />
  </svg>
);
const IconLoader = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" style={{ width: 14, height: 14, animation: 'gc-spin 0.8s linear infinite' }}>
    <path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83" />
  </svg>
);

// ── Types ─────────────────────────────────────────────────────────
interface NotificationItem {
  id: number;
  message: string;
  type: string;
  lien: string;
  lue: boolean;
  dateCreation: string;
}

// ── Header ────────────────────────────────────────────────────────────────────
function Header({
  onToggle,
}: {
  onToggle: () => void;
}) {
  const { user, logout } = useAuthStore();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const initials = user?.username?.slice(0, 2).toUpperCase() ?? 'AD';
  const displayName = user?.nom ?? user?.username ?? 'Administrateur';
  
  // ── Search Query ──────────────────────────────────────────────────────────
  const { data: searchResults = [], isLoading: searchLoading } = useQuery({
    queryKey: ['global-search', searchQuery],
    queryFn: async () => {
      if (searchQuery.length < 2) return [];
      try {
        const [elevesRes, classesRes, profsRes] = await Promise.all([
          api.get('/scolarite/eleves', { params: { search: searchQuery, limit: 4 } }),
          api.get('/scolarite/classes', { params: { search: searchQuery, limit: 3 } }),
          api.get('/personnes/enseignants', { params: { search: searchQuery, limit: 3 } }),
        ]);

        const eleveItems = (elevesRes.data?.data || []).map((e: any) => ({
          id: e.matricule,
          title: `${e.nom || ''} ${e.prenom || ''}`.trim() || 'Élève sans nom',
          subtitle: `Élève • Matricule ${e.matricule}`,
          path: `/scolarite/eleves/${e.matricule}`,
          type: 'eleve'
        }));

        const classeItems = (classesRes.data?.data || []).map((c: any) => ({
          id: c.idClasse,
          title: c.libelle || 'Classe sans nom',
          subtitle: `Classe • ID #${c.idClasse}`,
          path: `/scolarite/classes/${c.idClasse}`,
          type: 'classe'
        }));

        const profItems = (profsRes.data?.data || []).map((p: any) => ({
          id: p.idEnseignant,
          title: `Enseignant #${p.idEnseignant}`,
          subtitle: `Enseignant • Profil ${p.idPers || 'N/A'}`,
          path: `/personnes/enseignants/${p.idEnseignant}`,
          type: 'prof'
        }));

        return [...eleveItems, ...classeItems, ...profItems];
      } catch (err) {
        console.error("Global search error:", err);
        return [];
      }
    },
    enabled: searchQuery.length >= 2,
  });

  // ── Notifications ────────────────────────────────────────────────────────
  const { data: notifications = [] } = useQuery<NotificationItem[]>({
    queryKey: ['notifications'],
    queryFn: async () => {
      try {
        const res = await api.get('/notifications?limit=10');
        return res.data.data || [];
      } catch {
        return [];
      }
    },
    refetchInterval: 60000, // Refresh every minute
  });

  const markAsReadMutation = useMutation({
    mutationFn: async () => {
      await api.patch('/notifications/read-all');
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notifications'] });
    }
  });

  const unread = notifications.filter(n => !n.lue).length;

  const handleOpenNotifs = () => {
    setNotifOpen(o => !o);
    setProfileOpen(false);
    setSearchOpen(false);
    if (!notifOpen && unread > 0) {
      markAsReadMutation.mutate();
    }
  };

  const handleNotifClick = (lien?: string) => {
    setNotifOpen(false);
    if (lien) navigate(lien);
  };

  const handleLogout = () => {
    logout();
    toast.success('Vous avez été déconnecté');
    navigate('/login', { replace: true });
  };

  const handleSearchResultClick = (path: string) => {
    navigate(path);
    setSearchQuery('');
    setSearchOpen(false);
  };

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setNotifOpen(false);
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) setSearchOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap');

        .hd-root {
          height: 64px; display: flex; align-items: center; gap: 14px;
          padding: 0 28px;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
          border-bottom: 1px solid rgba(0,0,0,0.07);
          box-shadow: 0 1px 0 rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.03);
          position: sticky; top: 0; z-index: 100;
          font-family: 'Sora', sans-serif;
        }

        /* Toggle */
        .hd-toggle {
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(0,0,0,0.04); border: 1px solid rgba(0,0,0,0.06);
          display: flex; align-items: center; justify-content: center;
          color: #6b7280; cursor: pointer; flex-shrink: 0;
          transition: all 0.15s;
        }
        .hd-toggle:hover { background: #ecfdf5; color: #059669; border-color: #6ee7b7; }

        /* Search */
        .hd-search {
          display: flex; align-items: center; gap: 10px;
          background: rgba(0,0,0,0.04);
          border: 1.5px solid rgba(0,0,0,0.07);
          border-radius: 12px; padding: 0 14px;
          height: 38px;
          transition: all 0.2s;
        }
        .hd-search.focused {
          background: #fff;
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16,185,129,0.1);
        }
        .hd-search input {
          flex: 1; background: none; border: none; outline: none;
          font-size: 13.5px; color: #111827; font-family: 'Sora', sans-serif; font-weight: 400;
        }
        .hd-search input::placeholder { color: #9ca3af; }
        .hd-search-icon { color: #9ca3af; transition: color 0.2s; flex-shrink: 0; }
        .hd-search.focused .hd-search-icon { color: #059669; }

        .hd-search-item {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 16px; transition: background 0.12s; cursor: pointer;
          border-bottom: 1px solid #f9fafb;
        }
        .hd-search-item:hover { background: #f9fafb; }
        .hd-search-type-icon {
          width: 32px; height: 32px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 11px; font-weight: 700; flex-shrink: 0;
        }
        .hd-search-type-icon.eleve { background: #ecfdf5; color: #059669; }
        .hd-search-type-icon.classe { background: #eff6ff; color: #3b82f6; }
        .hd-search-type-icon.prof { background: #fff7ed; color: #f97316; }
        .hd-search-title { font-size: 13px; font-weight: 600; color: #111827; }
        .hd-search-sub { font-size: 11px; color: #9ca3af; margin-top: 1px; }

        /* Right side */
        .hd-right { display: flex; align-items: center; gap: 8px; margin-left: auto; }
        .hd-divider { width: 1px; height: 28px; background: rgba(0,0,0,0.08); margin: 0 2px; }

        /* Notif btn */
        .hd-notif-btn {
          width: 38px; height: 38px; border-radius: 50%;
          background: none; border: none;
          display: flex; align-items: center; justify-content: center;
          color: #6b7280; cursor: pointer; position: relative;
          transition: all 0.15s;
        }
        .hd-notif-btn:hover { background: #ecfdf5; color: #059669; }
        .hd-notif-badge {
          position: absolute; top: 7px; right: 7px;
          width: 8px; height: 8px; border-radius: 50%;
          background: #ef4444; border: 2px solid white;
        }

        /* Notif dropdown */
        .hd-dropdown {
          position: absolute; right: 0; top: calc(100% + 8px);
          width: 320px; border-radius: 16px; overflow: hidden;
          background: white;
          box-shadow: 0 8px 40px rgba(0,0,0,0.14), 0 1px 4px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.07);
          animation: dropIn 0.18s cubic-bezier(0.4,0,0.2,1);
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .hd-drop-hd {
          display: flex; align-items: center; justify-content: space-between;
          padding: 14px 16px 10px;
          border-bottom: 1px solid #f3f4f6;
        }
        .hd-drop-title { font-size: 13.5px; font-weight: 700; color: #0d1117; font-family: 'Sora', sans-serif; }
        .hd-drop-badge { font-size: 11px; font-weight: 600; color: #059669; background: #ecfdf5; padding: 2px 9px; border-radius: 20px; }
        .hd-notif-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 11px 16px;
          transition: background 0.12s; cursor: pointer;
          border-bottom: 1px solid #f9fafb;
        }
        .hd-notif-item:last-child { border-bottom: none; }
        .hd-notif-item:hover { background: #f9fafb; }
        .hd-notif-item.unread { background: #fafffe; }
        .hd-notif-dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; margin-top: 5px; }
        .hd-notif-txt { font-size: 12.5px; color: #374151; line-height: 1.45; font-family: 'Sora', sans-serif; }
        .hd-notif-time { font-size: 11px; color: #9ca3af; margin-top: 2px; }

        /* Profile btn */
        .hd-profile-btn {
          display: flex; align-items: center; gap: 9px;
          padding: 5px 10px 5px 5px; border-radius: 40px;
          background: none; border: 1px solid transparent;
          cursor: pointer; transition: all 0.15s;
          font-family: 'Sora', sans-serif;
        }
        .hd-profile-btn:hover { background: rgba(0,0,0,0.04); border-color: rgba(0,0,0,0.08); }
        .hd-avatar {
          width: 34px; height: 34px; border-radius: 50%;
          background: linear-gradient(135deg, #059669, #34d399);
          display: flex; align-items: center; justify-content: center;
          font-size: 12px; font-weight: 700; color: white;
          font-family: 'Sora', sans-serif;
          box-shadow: 0 2px 8px rgba(5,150,105,0.3);
          flex-shrink: 0;
        }
        .hd-profile-name { font-size: 13px; font-weight: 600; color: #111827; white-space: nowrap; }
        .hd-profile-role { font-size: 11px; color: #9ca3af; }

        /* Profile dropdown */
        .hd-profile-drop {
          position: absolute; right: 0; top: calc(100% + 8px);
          width: 200px; border-radius: 14px; overflow: hidden;
          background: white;
          box-shadow: 0 8px 32px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.07);
          animation: dropIn 0.18s cubic-bezier(0.4,0,0.2,1);
          padding: 6px;
        }
        .hd-pdrop-item {
          display: flex; align-items: center; gap: 9px;
          padding: 9px 12px; border-radius: 9px;
          font-size: 13px; color: #374151; font-family: 'Sora', sans-serif;
          cursor: pointer; transition: background 0.12s;
        }
        .hd-pdrop-item:hover { background: #f3f4f6; }
        .hd-pdrop-item.danger { color: #ef4444; }
        .hd-pdrop-item.danger:hover { background: #fff1f2; }
        .hd-pdrop-sep { height: 1px; background: #f3f4f6; margin: 4px 0; }

        @media (max-width: 1024px) {
          .hd-root { padding: 0 16px; gap: 8px; }
          .hd-search { display: none; }
          .hd-profile-name, .hd-profile-role { display: none; }
          .hd-profile-btn { padding: 4px; border-radius: 50%; }
        }
      `}</style>

      <header className="hd-root">
        {/* Sidebar toggle */}
        <button className="hd-toggle" onClick={onToggle}>
          <IconMenu />
        </button>

        {/* Search */}
        <div className="hd-search-container" ref={searchContainerRef} style={{ position: 'relative', flex: 1, maxWidth: 420 }}>
          <div className={`hd-search ${searchOpen ? 'focused' : ''}`}>
            <span className="hd-search-icon"><IconSearch /></span>
            <input
              type="text"
              placeholder="Rechercher un élève, une classe…"
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setSearchOpen(true); }}
              onFocus={() => setSearchOpen(true)}
            />
          </div>

          {searchOpen && searchQuery.length >= 2 && (
            <div className="hd-dropdown search-results">
              <div className="hd-drop-hd">
                <span className="hd-drop-title">Résultats de recherche</span>
                {searchLoading && <IconLoader />}
              </div>
              <div style={{ maxHeight: 380, overflowY: 'auto' }}>
                {searchResults.length === 0 && !searchLoading ? (
                  <div style={{ padding: '20px', textAlign: 'center', fontSize: '13px', color: '#6b7280' }}>
                    Aucun résultat pour "{searchQuery}"
                  </div>
                ) : (
                  searchResults.map((res: any) => (
                    <div 
                      key={`${res.type}-${res.id}`} 
                      className="hd-search-item"
                      onClick={() => handleSearchResultClick(res.path)}
                    >
                      <div className={`hd-search-type-icon ${res.type}`}>
                        {res.type === 'eleve' ? 'Ét' : 'Cl'}
                      </div>
                      <div>
                        <div className="hd-search-title">{res.title}</div>
                        <div className="hd-search-sub">{res.subtitle}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="hd-right">
          {/* Notifications */}
          <div style={{ position: 'relative' }} ref={notifRef}>
            <button className="hd-notif-btn" onClick={handleOpenNotifs}>
              <IconBell />
              {unread > 0 && <span className="hd-notif-badge" />}
            </button>
            {notifOpen && (
              <div className="hd-dropdown">
                <div className="hd-drop-hd">
                  <span className="hd-drop-title">Notifications</span>
                  {unread > 0 && <span className="hd-drop-badge">{unread} nouvelles</span>}
                </div>
                {notifications.length === 0 ? (
                  <div style={{ padding: '20px', textAlign: 'center', fontSize: '12px', color: '#6b7280' }}>
                    Aucune notification.
                  </div>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className={`hd-notif-item${!n.lue ? ' unread' : ''}`} onClick={() => handleNotifClick(n.lien)}>
                      <span className="hd-notif-dot" style={{ background: n.type === 'error' ? '#ef4444' : n.type === 'warning' ? '#f59e0b' : '#3b82f6' }} />
                      <div>
                        <div className="hd-notif-txt">{n.message}</div>
                        <div className="hd-notif-time">{new Date(n.dateCreation).toLocaleDateString()}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          <div className="hd-divider" />

          {/* Profile */}
          <div style={{ position: 'relative' }} ref={profileRef}>
            <button className="hd-profile-btn" onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }}>
              <div className="hd-avatar">{initials}</div>
              <div style={{ textAlign: 'left' }}>
                <div className="hd-profile-name">{displayName}</div>
                <div className="hd-profile-role">Administrateur</div>
              </div>
              <IconChevronDown />
            </button>
            {profileOpen && (
              <div className="hd-profile-drop">
                <div className="hd-pdrop-item" onClick={() => { navigate('/profil'); setProfileOpen(false); }}>Mon profil</div>
                <div className="hd-pdrop-item" onClick={() => { navigate('/preferences'); setProfileOpen(false); }}>Préférences</div>
                <div className="hd-pdrop-sep" />
                <div className="hd-pdrop-item danger" onClick={handleLogout}>Déconnexion</div>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

// ── BaseLayout ────────────────────────────────────────────────────────────────
export const BaseLayout = () => {
  const { isAuthenticated } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize(); // initialize
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <style>{`
        .layout-root {
          min-height: 100vh;
          display: flex;
          background: #f4f6f5;
          font-family: 'Sora', sans-serif;
        }
        .layout-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          margin-left: ${collapsed ? 68 : 240}px;
          transition: margin-left 0.28s cubic-bezier(0.4,0,0.2,1);
          min-width: 0;
        }
        .sb-backdrop {
          position: fixed; inset: 0; background: rgba(13, 17, 23, 0.4); z-index: 150;
          opacity: 0; pointer-events: none; transition: opacity 0.3s;
          backdrop-filter: blur(2px);
        }
        .sb-backdrop.show { opacity: 1; pointer-events: auto; }

        @media (max-width: 1024px) {
          .layout-content { margin-left: 0 !important; }
        }

        @keyframes gc-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div className="layout-root">
        <div className={`sb-backdrop ${mobileOpen ? 'show' : ''}`} onClick={() => setMobileOpen(false)} />

        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />

        <div className="layout-content">
          <Header onToggle={() => {
            if (isMobile) setMobileOpen(o => !o);
            else setCollapsed(c => !c);
          }} />

          <main
            style={{
              flex: 1,
              overflowY: 'auto',
              overflowX: 'hidden',
            }}
          >
            <div style={{ maxWidth: 1400, margin: '0 auto', paddingBottom: '30px' }}>
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
};