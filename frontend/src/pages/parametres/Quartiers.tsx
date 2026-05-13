import { MapPin } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Quartiers = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/parametres/quartiers',
        title: 'Quartiers / Dortoirs',
        subtitle: 'Zones résidentielles pour l\'internat',
        icon: <MapPin />,
        primaryKey: 'idQuartier',
        columns: [
          { key: 'libelle', label: 'Quartier', render: (val) => <span style={{ fontWeight: 600, color: '#111827' }}>{val || 'N/A'}</span> },
          { key: 'description', label: 'Description', render: (val) => <span style={{ color: '#6b7280' }}>{val || '-'}</span> }
        ],
        fields: [
          { name: 'idQuartier', label: 'ID Quartier (numérique)', type: 'number', required: true },
          { name: 'libelle', label: 'Nom du quartier/dortoir', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea' }
        ]
      }}
    />
  );
};
