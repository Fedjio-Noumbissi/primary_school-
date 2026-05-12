import { Link, useNavigate } from 'react-router-dom';
import { Lock, LogOut } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

export const Unauthorized = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const redirectByRole: Record<string, string> = {
    fondateur: '/dashboard',
    directeur: '/dashboard',
    admin_scolarite: '/scolarite/eleves',
    admin_auditeur: '/audit',
    parent: '/parent/dashboard',
    enseignant: '/enseignant/dashboard',
    administratif: '/administratif/dashboard',
  };

  const dashboardLink = user?.role ? (redirectByRole[user.role] ?? '/dashboard') : '/login';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#f4f6f5] font-sora">
      <div className="bg-white p-10 rounded-[18px] shadow-sm max-w-md w-full text-center border border-gray-100 flex flex-col items-center">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <Lock className="w-8 h-8 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Accès Refusé</h1>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Vous n'avez pas les permissions nécessaires pour accéder à cette page.
        </p>
        
        <div className="flex flex-col w-full gap-3">
          <Link 
            to={dashboardLink}
            className="w-full px-6 py-3 bg-[#059669] text-white font-medium rounded-xl hover:bg-[#047857] transition-colors flex items-center justify-center gap-2"
          >
            Retour au tableau de bord
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full px-6 py-3 bg-white text-gray-600 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 hover:text-gray-900 transition-colors flex items-center justify-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
};
