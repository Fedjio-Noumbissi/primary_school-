import { Tag } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Specialites = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/parametres/specialites',
        title: 'Spécialités',
        subtitle: 'Domaines et spécialités d\'enseignement',
        icon: <Tag />,
        primaryKey: 'idSpecialite',
        columns: [
          { key: 'libelle', label: 'Spécialité', render: (val) => <span style={{ fontWeight: 600, color: '#111827' }}>{val || 'N/A'}</span> },
          { key: 'idAdmin', label: 'ID Admin', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> }
        ],
        fields: [
          { name: 'libelle', label: 'Nom de la spécialité', type: 'text', required: true },
          { name: 'idAdmin', label: 'ID Admin', type: 'number' }
        ]
      }}
    />
  );
};
