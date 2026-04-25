import { Receipt } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Tranches = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/finance/tranches',
        title: 'Tranches de Paiement',
        subtitle: 'Découpage des frais de scolarité en échéances',
        icon: <Receipt />,
        primaryKey: 'idTranche',
        columns: [
          { key: 'libelle', label: 'Libellé (ex: Tranche 1)' },
          { key: 'montant', label: 'Montant', render: (val) => `${val} FCFA` },
          { key: 'delai_mois', label: 'Mois délai' },
          { key: 'delai_jour', label: 'Jour délai' }
        ],
        fields: [
          { name: 'idScolarite', label: 'ID Configuration Scolarité', type: 'number', required: true },
          { name: 'libelle', label: 'Libellé de la tranche', type: 'text', required: true },
          { name: 'montant', label: 'Montant de la tranche (FCFA)', type: 'number', required: true },
          { name: 'delai_mois', label: 'Mois de délai (01-12)', type: 'number' },
          { name: 'delai_jour', label: 'Jour de délai (01-31)', type: 'number' },
          { name: 'actif', label: 'Est actif', type: 'checkbox' }
        ]
      }}
    />
  );
};
