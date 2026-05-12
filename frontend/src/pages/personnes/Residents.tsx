import { Home } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Residents = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/personnes/residents',
        title: 'Résidents d\'Internat',
        subtitle: 'Suivi des élèves internes par quartier',
        icon: <Home />,
        primaryKey: 'idResi',
        columns: [
          { key: 'idResi', label: 'ID', render: (val) => <span style={{ color: '#6b7280', fontFamily: "'JetBrains Mono', monospace" }}>#{String(val).padStart(4, '0')}</span> },
          { key: 'idPers', label: 'ID Personne', render: (val) => <span style={{ fontWeight: 600, color: '#374151' }}>{val || 'N/A'}</span> },
          { key: 'idQuartier', label: 'ID Quartier', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> },
          { key: 'description', label: 'Observations', render: (val) => <span style={{ color: '#6b7280' }}>{val || '-'}</span> },
          { key: 'idAdmin', label: 'ID Admin', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> }
        ],
        fields: [
          { name: 'idPers', label: 'ID Personne (résident)', type: 'number', required: true },
          { name: 'idQuartier', label: 'ID Quartier / Dortoir', type: 'number', required: true },
          { name: 'description', label: 'Observations (ex: Lit n°3)', type: 'textarea' },
          { name: 'idAdmin', label: 'ID Admin', type: 'number' }
        ]
      }}
    />
  );
};
