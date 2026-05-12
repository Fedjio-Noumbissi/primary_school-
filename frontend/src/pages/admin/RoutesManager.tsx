import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '../../api/axios';

interface PermissionRoute {
  id: number;
  route: string;
  role: string;
  peut_acceder: number;
}

const ROLES = ['fondateur', 'directeur', 'admin_scolarite', 'admin_auditeur', 'parent', 'administratif', 'enseignant'];
const ROUTES = ['/scolarite', '/finance', '/audit', '/admin/utilisateurs', '/admin/routes', '/parent/dashboard', '/enseignant/dashboard', '/administratif/dashboard'];

export const RoutesManager = () => {
  const queryClient = useQueryClient();
  const [selectedRole, setSelectedRole] = useState(ROLES[1]);

  const { data, isLoading } = useQuery({
    queryKey: ['permissions'],
    queryFn: async () => {
      const res = await axios.get('/permissions');
      return res.data.data as PermissionRoute[];
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ route, role, peut_acceder }: { route: string; role: string; peut_acceder: boolean }) => {
      await axios.post('/permissions', { route, role, peut_acceder });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['permissions'] });
    }
  });

  const handleToggle = (route: string, currentStatus: boolean) => {
    updateMutation.mutate({ route, role: selectedRole, peut_acceder: !currentStatus });
  };

  if (isLoading) return <div className="p-8 font-sora">Chargement...</div>;

  return (
    <div className="p-8 font-sora">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des Routes</h1>
          <p className="text-sm text-gray-500 mt-1">Gérez les accès de chaque rôle aux différentes sections de l'application.</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-[18px] shadow-sm border border-gray-100">
        <div className="flex space-x-4 mb-6 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-200">
          {ROLES.map(role => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors whitespace-nowrap ${
                selectedRole === role 
                  ? 'bg-[#059669] text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {role.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {ROUTES.map(route => {
            const perm = data?.find(p => p.route === route && p.role === selectedRole);
            const canAccess = perm ? perm.peut_acceder === 1 : false;
            const isFondateur = selectedRole === 'fondateur';

            return (
              <div key={route} className="flex items-center justify-between p-4 border border-gray-50 rounded-xl bg-gray-50 hover:bg-gray-100/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-[#059669]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{route}</div>
                    <div className="text-xs text-gray-500">Route d'accès protégée</div>
                  </div>
                </div>
                
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    checked={isFondateur ? true : canAccess}
                    onChange={() => handleToggle(route, canAccess)}
                    disabled={isFondateur}
                  />
                  <div className={`w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${isFondateur ? 'peer-checked:bg-gray-400' : 'peer-checked:bg-[#34d399]'}`}></div>
                </label>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
