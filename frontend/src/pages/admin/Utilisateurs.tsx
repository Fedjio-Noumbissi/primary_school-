import { useState } from 'react';

export const Utilisateurs = () => {
  const [filter, setFilter] = useState('Tous');

  return (
    <div className="p-8 font-sora bg-[#f4f6f5] min-h-full">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gestion des Utilisateurs</h1>
          <p className="text-sm text-gray-500 mt-1">Comptes administratifs et d'accès système</p>
        </div>
        <button className="px-4 py-2 bg-[#059669] text-white rounded-xl text-sm font-semibold shadow-sm hover:bg-[#047857] transition-colors flex items-center">
          <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
          Nouvel Utilisateur
        </button>
      </div>

      <div className="bg-white p-6 rounded-[18px] shadow-sm border border-gray-100">
        <div className="flex space-x-4 mb-6">
          {['Tous', 'Fondateur', 'Directeur', 'Admin Scolarité', 'Admin Auditeur'].map(role => (
            <button
              key={role}
              onClick={() => setFilter(role)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                filter === role 
                  ? 'bg-gray-800 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-sm text-gray-500">
                <th className="pb-3 font-medium">Nom d'utilisateur</th>
                <th className="pb-3 font-medium">Email / Identifiant</th>
                <th className="pb-3 font-medium">Rôle</th>
                <th className="pb-3 font-medium">Statut</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 font-medium text-gray-800 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#7c3aed]/10 text-[#7c3aed] flex items-center justify-center mr-3 font-bold text-xs">
                    AP
                  </div>
                  Administrateur Principal
                </td>
                <td className="py-4 text-gray-600">admin@ecole.fr</td>
                <td className="py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#7c3aed]/10 text-[#7c3aed]">
                    Fondateur
                  </span>
                </td>
                <td className="py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Actif</span>
                </td>
                <td className="py-4 text-right">
                  <button className="text-gray-400 hover:text-[#059669] transition-colors">Éditer</button>
                </td>
              </tr>
              <tr className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                <td className="py-4 font-medium text-gray-800 flex items-center">
                  <div className="w-8 h-8 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center mr-3 font-bold text-xs">
                    DE
                  </div>
                  Directeur Ecole
                </td>
                <td className="py-4 text-gray-600">directeur@ecole.fr</td>
                <td className="py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#3b82f6]/10 text-[#3b82f6]">
                    Directeur
                  </span>
                </td>
                <td className="py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Actif</span>
                </td>
                <td className="py-4 text-right">
                  <button className="text-gray-400 hover:text-[#059669] transition-colors">Éditer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
