import { AlertTriangle } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Rapports = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/evaluations/rapports',
        title: 'Rapports Disciplinaires',
        subtitle: 'Suivi du comportement et de la discipline',
        icon: <AlertTriangle />,
        primaryKey: 'idRap',
        searchPlaceholder: "Rechercher un rapport...",
        columns: [
          { key: 'libelle', label: 'Libellé', render: (val) => <span style={{ fontWeight: 600, color: '#111827' }}>{val || 'N/A'}</span> },
          { key: 'points', label: 'Points', render: (val) => <span style={{ color: '#e11d48', fontWeight: 600 }}>{val ?? 'N/A'}</span> },
          { key: 'matricule', label: 'Matricule', render: (val) => <span style={{ color: '#6b7280', fontFamily: "'JetBrains Mono', monospace" }}>#{String(val || 0).padStart(4, '0')}</span> },
          { key: 'event_date', label: 'Date', render: (val) => <span style={{ color: '#6b7280' }}>{val ? new Date(val).toLocaleDateString('fr-FR') : 'N/A'}</span> },
          { key: 'idAca', label: 'ID Année', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> }
        ],
        fields: [
          { name: 'libelle', label: 'Libellé du rapport', type: 'text', required: true },
          { name: 'points', label: 'Points', type: 'number' },
          { name: 'matricule', label: 'Matricule de l\'élève', type: 'number', required: true },
          { name: 'idAca', label: 'ID Année Académique', type: 'number' },
          { name: 'commentaire', label: 'Commentaire', type: 'textarea' },
          { name: 'event_date', label: 'Date de l\'événement', type: 'date' },
          { name: 'idPers', label: 'ID Personne (rapporteur)', type: 'number' }
        ]
      }}
    />
  );
};
