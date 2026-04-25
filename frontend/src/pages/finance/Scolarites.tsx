import { PiggyBank } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Scolarites = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/finance/scolarites',
        title: 'Tarifs Scolarités',
        subtitle: 'Configuration des frais de scolarité par cycle',
        icon: <PiggyBank />,
        primaryKey: 'idScolarite',
        columns: [
          { key: 'idCycle', label: 'ID Cycle' },
          { key: 'inscription', label: 'Frais Inscription', render: (val) => `${val} FCFA` },
          { key: 'pension', label: 'Pension Annuelle', render: (val) => `${val} FCFA` },
          { key: 'nbreTranche', label: 'Nb. Tranches' }
        ],
        fields: [
          { name: 'idCycle', label: 'Identifiant du Cycle', type: 'number', required: true },
          { name: 'inscription', label: 'Frais d\'inscription (FCFA)', type: 'number', required: true },
          { name: 'pension', label: 'Pension scolarité (FCFA)', type: 'number', required: true },
          { name: 'nbreTranche', label: 'Nombre de tranches', type: 'number' },
          { name: 'description', label: 'Description', type: 'text' }
        ]
      }}
    />
  );
};
