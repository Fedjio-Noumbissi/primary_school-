import { Globe } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const VillesNaissance = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/parametres/villes',
        title: 'Villes de Naissance',
        subtitle: 'Référentiel des villes de naissance des élèves',
        icon: <Globe />,
        primaryKey: 'idVille',
        columns: [
          { key: 'libelle', label: 'Ville', render: (val) => <span style={{ fontWeight: 600, color: '#111827' }}>{val || 'N/A'}</span> },
          { key: 'actif', label: 'Statut', render: (val) => (
            <span className={val ? 'pt-badge-green' : 'pt-badge-red'}>{val ? 'Active' : 'Inactive'}</span>
          )}
        ],
        fields: [
          { name: 'libelle', label: 'Nom de la ville', type: 'text', required: true },
          { name: 'actif', label: 'Ville active', type: 'checkbox' }
        ]
      }}
    />
  );
};
