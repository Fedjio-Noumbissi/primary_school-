import { CalendarCheck } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Annees = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/parametres/annees',
        title: 'Années Académiques',
        subtitle: 'Gestion des années scolaires',
        icon: <CalendarCheck />,
        primaryKey: 'idAnnee',
        columns: [
          { key: 'libelle', label: 'Année Scolaire', render: (val) => <span style={{ fontWeight: 600, color: '#111827' }}>{val || 'N/A'}</span> },
          { key: 'periode', label: 'Période', render: (val) => <span style={{ color: '#6b7280' }}>{val || '-'}</span> },
          { key: 'created_at', label: 'Date création', render: (val) => <span style={{ color: '#6b7280' }}>{val ? new Date(val).toLocaleDateString('fr-FR') : 'N/A'}</span> },
          { key: 'idAdmin', label: 'ID Admin', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> }
        ],
        fields: [
          { name: 'libelle', label: 'Libellé (ex: 2024-2025)', type: 'text', required: true },
          { name: 'periode', label: 'Période (ex: Sept 2024 - Juin 2025)', type: 'text' },
          { name: 'created_at', label: 'Date de début', type: 'date' },
          { name: 'idAdmin', label: 'ID Admin', type: 'number' }
        ]
      }}
    />
  );
};
