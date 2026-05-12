import { UserCheck } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Parents = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/personnes/parents',
        title: 'Parents d\'Élèves',
        subtitle: 'Tuteurs et correspondants',
        icon: <UserCheck />,
        primaryKey: 'idParent',
        columns: [
          { key: 'idParent', label: 'ID', render: (val) => <span style={{ color: '#6b7280', fontFamily: "'JetBrains Mono', monospace" }}>#{String(val).padStart(4, '0')}</span> },
          { key: 'idPers', label: 'ID Personne (Tuteur)', render: (val) => <span style={{ fontWeight: 600, color: '#374151' }}>{val || 'N/A'}</span> },
          { key: 'matricule', label: 'Matricule Enfant', render: (val) => <span style={{ color: '#059669', fontWeight: 500, fontFamily: "'JetBrains Mono', monospace" }}>#{val || 'N/A'}</span> },
          { key: 'idAdmin', label: 'ID Admin', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> }
        ],
        fields: [
          { name: 'idPers', label: 'ID Personne (Tuteur)', type: 'number', required: true },
          { name: 'matricule', label: 'Matricule de l\'Enfant (Élève)', type: 'number', required: true },
          { name: 'idAdmin', label: 'ID Admin', type: 'number' }
        ]
      }}
    />
  );
};
