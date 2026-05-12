import { Calendar } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Sessions = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/evaluations/sessions',
        title: 'Sessions d\'Examen',
        subtitle: 'Gestion des sessions d\'évaluation',
        icon: <Calendar />,
        primaryKey: 'idSession',
        columns: [
          { key: 'libelle', label: 'Session', render: (val) => <span style={{ fontWeight: 600, color: '#111827' }}>{val || 'N/A'}</span> },
          { key: 'description', label: 'Description', render: (val) => <span style={{ color: '#6b7280' }}>{val || '-'}</span> },
          { key: 'idTrimestre', label: 'ID Trimestre', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> },
          { key: 'date_passage', label: 'Date Passage', render: (val) => <span style={{ color: '#6b7280' }}>{val ? new Date(val).toLocaleDateString('fr-FR') : 'N/A'}</span> },
          { key: 'idPers', label: 'ID Personne', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> }
        ],
        fields: [
          { name: 'libelle', label: 'Nom de la session', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'text' },
          { name: 'idTrimestre', label: 'ID Trimestre', type: 'number', required: true },
          { name: 'idPers', label: 'ID Personne', type: 'number' },
          { name: 'date_passage', label: 'Date de passage', type: 'date' }
        ]
      }}
    />
  );
};
