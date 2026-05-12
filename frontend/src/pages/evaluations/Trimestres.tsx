import { CalendarDays } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Trimestres = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/evaluations/trimestres',
        title: 'Trimestres',
        subtitle: 'Gestion des périodes trimestrielles',
        icon: <CalendarDays />,
        primaryKey: 'idTrimes',
        columns: [
          { key: 'libelle', label: 'Trimestre', render: (val) => <span style={{ fontWeight: 600, color: '#111827' }}>{val || 'N/A'}</span> },
          { key: 'periode', label: 'Période', render: (val) => <span style={{ color: '#6b7280' }}>{val || '-'}</span> },
          { key: 'idAca', label: 'ID Année Acad.', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> },
          { key: 'idAdmin', label: 'ID Admin', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> }
        ],
        fields: [
          { name: 'libelle', label: 'Nom du trimestre', type: 'text', required: true },
          { name: 'periode', label: 'Période (ex: Sept-Déc)', type: 'text' },
          { name: 'idAca', label: 'ID Année Académique', type: 'number', required: true },
          { name: 'idAdmin', label: 'ID Admin', type: 'number' }
        ]
      }}
    />
  );
};
