import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { Dashboard as AdminDashboard } from './Dashboard';
import { ParentDashboard } from './parent/Dashboard';
import { EnseignantDashboard } from './enseignant/Dashboard';
import { AdministratifDashboard } from './administratif/Dashboard';

/**
 * DashboardRouter redirects to the appropriate dashboard based on the user's role.
 */
export const DashboardRouter = () => {
  const { user } = useAuthStore();

  const dashboardMap: Record<string, JSX.Element> = {
    fondateur       : <AdminDashboard />,
    directeur       : <AdminDashboard />,
    admin_scolarite : <AdminDashboard />,
    admin_auditeur  : <AdminDashboard />, // or a specific AuditDashboard if it exists
    parent          : <ParentDashboard />,
    enseignant      : <EnseignantDashboard />,
    administratif   : <AdministratifDashboard />,
  };

  const dashboard = dashboardMap[user?.role ?? ''];

  if (!dashboard) {
    return <Navigate to="/login" replace />;
  }

  // If it's a redirect (like Navigate), it will handle itself. 
  // But here we are rendering the components directly if possible, 
  // or we can use Navigate to sub-routes if they are defined that way.
  
  // According to USER_REQUEST, some roles should Navigate to their specific sub-routes:
  if (user?.role === 'parent') return <Navigate to="/parent/dashboard" replace />;
  if (user?.role === 'enseignant') return <Navigate to="/enseignant/dashboard" replace />;
  if (user?.role === 'administratif') return <Navigate to="/administratif/dashboard" replace />;

  return dashboard;
};
