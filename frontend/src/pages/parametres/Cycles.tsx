import { Repeat } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Cycles = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/parametres/cycles',
        title: 'Cycles Scolaires',
        subtitle: 'Cycles d\'enseignement (Primaire, Secondaire…)',
        icon: <Repeat />,
        primaryKey: 'idCycle',
        columns: [
          { key: 'libelle', label: 'Cycle', render: (val) => <span style={{ fontWeight: 600, color: '#111827' }}>{val || 'N/A'}</span> },
          { key: 'description', label: 'Description', render: (val) => <span style={{ color: '#6b7280' }}>{val || '-'}</span> },
          { key: 'idAdmin', label: 'ID Admin', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> }
        ],
        fields: [
          { name: 'libelle', label: 'Nom du cycle (ex: Primaire)', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'text' },
          { name: 'idAdmin', label: 'ID Admin', type: 'number' }
        ]
      }}
    />
  );
};
