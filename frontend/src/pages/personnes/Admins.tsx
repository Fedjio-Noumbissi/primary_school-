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
        columns: [
          { key: 'nom', label: 'Nom Complet' },
          { key: 'username', label: 'Nom d\'utilisateur' },
          { key: 'typeAdmin', label: 'Rôle (1=Admin, 2=Directeur)' },
          { key: 'actif', label: 'Statut', render: (val) => (
            <span className={val ? 'pt-badge-green' : 'pt-badge-red'}>
              {val ? 'Actif' : 'Inactif'}
            </span>
          )}
        ],
        fields: [
          { name: 'nom', label: 'Nom Complet', type: 'text', required: true },
          { name: 'username', label: 'Nom d\'utilisateur (email ou pseudo)', type: 'text', required: true },
          { name: 'password', label: 'Mot de passe (pour nouveau)', type: 'text' },
          { name: 'typeAdmin', label: 'Type / Rôle (1 ou 2)', type: 'number' },
          { name: 'mobile', label: 'Téléphone Mobile', type: 'text' },
          { name: 'actif', label: 'Compte actif', type: 'checkbox' }
        ]
      }}
    />
  );
};
