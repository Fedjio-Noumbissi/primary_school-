import { Home } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Residents = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/personnes/residents',
        title: 'Résidents d\'Internat',
        subtitle: 'Suivi des élèves internes',
        icon: <Home />,
        primaryKey: 'idResi',
        columns: [
          { key: 'idQuartier', label: 'Dortoir/Quartier (ID)' },
          { key: 'description', label: 'Description / Observations' }
        ],
        fields: [
          { name: 'idQuartier', label: 'ID Quartier / Dortoir', type: 'number', required: true },
          { name: 'description', label: 'Observations ou n° lit', type: 'textarea' }
        ]
      }}
    />
  );
};
