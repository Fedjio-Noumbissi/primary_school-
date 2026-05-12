import { Landmark } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Scolarites = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/finance/scolarites',
        title: 'Frais de Scolarité',
        subtitle: 'Configuration des frais d\'inscription et pensions',
        icon: <Landmark />,
        primaryKey: 'idScolarite',
        columns: [
          { key: 'inscription', label: 'Inscription', render: (val) => <span style={{ color: '#059669', fontWeight: 600 }}>{val ? Number(val).toLocaleString() : 0} FCFA</span> },
          { key: 'pension', label: 'Pension', render: (val) => <span style={{ color: '#059669', fontWeight: 600 }}>{val ? Number(val).toLocaleString() : 0} FCFA</span> },
          { key: 'nbreTranche', label: 'Nb Tranches', render: (val) => <span style={{ color: '#374151', fontWeight: 500 }}>{val || 'N/A'}</span> },
          { key: 'idCycle', label: 'ID Cycle', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> },
          { key: 'description', label: 'Description', render: (val) => <span style={{ color: '#6b7280' }}>{val || '-'}</span> }
        ],
        fields: [
          { name: 'inscription', label: 'Frais d\'inscription (FCFA)', type: 'number', required: true },
          { name: 'pension', label: 'Pension (FCFA)', type: 'number', required: true },
          { name: 'nbreTranche', label: 'Nombre de tranches', type: 'number', required: true },
          { name: 'description', label: 'Description', type: 'text' },
          { name: 'idCycle', label: 'ID Cycle rattaché', type: 'number', required: true },
          { name: 'idFondateur', label: 'ID Fondateur', type: 'number' }
        ]
      }}
    />
  );
};
