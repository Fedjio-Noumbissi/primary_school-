import { RefreshCcw } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Cycles = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/parametres/cycles',
        title: 'Cycles d\'Enseignement',
        subtitle: 'Gestion des cycles (Primaire, Collège, Lycée...)',
        icon: <RefreshCcw />,
        primaryKey: 'idCycle',
        columns: [
          { key: 'libelle', label: 'Libellé' },
          { key: 'description', label: 'Description' }
        ],
        fields: [
          { name: 'libelle', label: 'Libellé', type: 'text', required: true },
          { name: 'description', label: 'Description', type: 'textarea' }
        ]
      }}
    />
  );
};
