import { ClipboardList } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const EvaluationsList = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/evaluations/evaluations',
        title: 'Évaluations',
        subtitle: 'Notes et appréciations des élèves',
        icon: <ClipboardList />,
        primaryKey: 'idEval',
        searchPlaceholder: "Rechercher par appréciation...",
        columns: [
          { key: 'matricule', label: 'Matricule Élève', render: (val) => <span style={{ color: '#6b7280', fontFamily: "'JetBrains Mono', monospace" }}>#{String(val || 0).padStart(4, '0')}</span> },
          { key: 'note', label: 'Note', render: (val) => <span style={{ color: '#059669', fontWeight: 700, fontSize: '15px' }}>{val ?? 'N/A'}</span> },
          { key: 'appreciation', label: 'Appréciation', render: (val) => <span style={{ color: '#374151' }}>{val || '-'}</span> },
          { key: 'idCours', label: 'ID Cours', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> },
          { key: 'idSession', label: 'ID Session', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> }
        ],
        fields: [
          { name: 'note', label: 'Note obtenue', type: 'number', required: true },
          { name: 'appreciation', label: 'Appréciation', type: 'text' },
          { name: 'matricule', label: 'Matricule de l\'élève', type: 'number', required: true },
          { name: 'idEpreuve', label: 'ID Épreuve', type: 'number' },
          { name: 'idCours', label: 'ID Cours', type: 'number', required: true },
          { name: 'idSession', label: 'ID Session', type: 'number', required: true },
          { name: 'idPers', label: 'ID Personne (évaluateur)', type: 'number' }
        ]
      }}
    />
  );
};
