import { Layers } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const NaturesEpreuve = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/evaluations/natures',
        title: 'Natures d\'Épreuve',
        subtitle: 'Types de contrôles et d\'examens',
        icon: <Layers />,
        primaryKey: 'idNature',
        columns: [
          { key: 'libelle', label: 'Nature', render: (val) => <span style={{ fontWeight: 600, color: '#111827' }}>{val || 'N/A'}</span> },
          { key: 'description', label: 'Description', render: (val) => <span style={{ color: '#6b7280' }}>{val || '-'}</span> }
        ],
        fields: [
          { name: 'libelle', label: 'Nom (ex: Contrôle de connaissances)', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea' }
        ]
      }}
    />
  );
};
