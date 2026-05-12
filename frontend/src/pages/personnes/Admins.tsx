import { ShieldAlert } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Admins = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/personnes/admins',
        title: 'Administrateurs',
        subtitle: 'Gestion des accès utilisateurs au système',
        icon: <ShieldAlert />,
        primaryKey: 'ID',
        searchPlaceholder: "Rechercher un admin (nom, username)...",
        columns: [
          { key: 'nom', label: 'Nom Complet', render: (val) => <span style={{ fontWeight: 600, color: '#111827' }}>{val || 'N/A'}</span> },
          { key: 'username', label: 'Identifiant', render: (val) => <span style={{ color: '#6b7280', fontFamily: "'JetBrains Mono', monospace" }}>{val || 'N/A'}</span> },
          { key: 'typeAdmin', label: 'Rôle', render: (val) => {
            const roles: Record<number, string> = { 1: 'Fondateur', 2: 'Directeur', 3: 'Scolarité', 4: 'Auditeur' };
            return <span style={{ color: '#374151', fontWeight: 500 }}>{roles[val] || `Type ${val}`}</span>;
          }},
          { key: 'mobile', label: 'Mobile', render: (val) => <span style={{ color: '#6b7280' }}>{val || '-'}</span> },
          { key: 'actif', label: 'Statut', render: (val) => (
            <span className={val ? 'pt-badge-green' : 'pt-badge-red'}>{val ? 'Actif' : 'Inactif'}</span>
          )}
        ],
        fields: [
          { name: 'nom', label: 'Nom Complet', type: 'text', required: true },
          { name: 'username', label: 'Identifiant (email ou pseudo)', type: 'text', required: true },
          { name: 'password', label: 'Mot de passe', type: 'text', required: true },
          { 
            name: 'typeAdmin', 
            label: 'Type / Rôle', 
            type: 'select',
            options: [
              { value: 1, label: 'Fondateur (accès total)' },
              { value: 2, label: 'Directeur' },
              { value: 3, label: 'Admin Scolarité' },
              { value: 4, label: 'Auditeur' }
            ]
          },
          { name: 'mobile', label: 'Téléphone Mobile', type: 'text' },
          { name: 'alanyaID', label: 'Alanya ID', type: 'text' },
          { name: 'actif', label: 'Compte actif', type: 'checkbox' }
        ]
      }}
    />
  );
};
