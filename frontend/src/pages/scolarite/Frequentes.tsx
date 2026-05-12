import { Building2 } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Frequentes = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/scolarite/frequentes',
        title: 'Inscriptions en Salle',
        subtitle: 'Affectation des élèves aux salles par année académique',
        icon: <Building2 />,
        primaryKey: 'idFrequente',
        columns: [
          { key: 'idFrequente', label: 'ID', render: (val) => <span style={{ color: '#6b7280', fontFamily: "'JetBrains Mono', monospace" }}>#{String(val).padStart(4, '0')}</span> },
          { key: 'matricule', label: 'Matricule Élève', render: (val) => <span style={{ fontWeight: 600, color: '#374151', fontFamily: "'JetBrains Mono', monospace" }}>#{String(val || 0).padStart(4, '0')}</span> },
          { key: 'idSalle', label: 'ID Salle', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> },
          { key: 'idAcademi', label: 'ID Année Acad.', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> },
          { key: 'commentaire', label: 'Commentaire', render: (val) => <span style={{ color: '#6b7280' }}>{val || '-'}</span> }
        ],
        fields: [
          { name: 'matricule', label: 'Matricule de l\'élève', type: 'number', required: true },
          { name: 'idSalle', label: 'ID Salle', type: 'number', required: true },
          { name: 'idAcademi', label: 'ID Année Académique', type: 'number', required: true },
          { name: 'commentaire', label: 'Commentaire', type: 'text' },
          { name: 'idAdmin', label: 'ID Admin', type: 'number' }
        ]
      }}
    />
  );
};
