import { CalendarDays } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Annees = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/parametres/annees',
        title: 'Années Académiques',
        subtitle: 'Gestion des années scolaires',
        icon: <CalendarDays />,
        primaryKey: 'idAnnee',
        columns: [
          { key: 'libelle', label: 'Libellé' },
          { key: 'periode', label: 'Période' }
        ],
        fields: [
          { name: 'libelle', label: 'Libellé (ex: 2024-2025)', type: 'text', required: true },
          { name: 'periode', label: 'Période', type: 'text' }
        ]
      }}
    />
  );
};
