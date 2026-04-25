import { HandCoins } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Paiements = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/finance/paiements',
        title: 'Paiements',
        subtitle: 'Suivi des règlements des élèves',
        icon: <HandCoins />,
        primaryKey: 'idPai',
        columns: [
          { key: 'operation_ID', label: 'Réf. Opération' },
          { key: 'matricule', label: 'Matricule Elève' },
          { key: 'montant', label: 'Montant', render: (val) => `${val} FCFA` },
          { key: 'datePaie', label: 'Date du Paiement', render: (val) => new Date(val).toLocaleDateString() }
        ],
        fields: [
          { name: 'matricule', label: 'Matricule de l\'élève (ID)', type: 'number', required: true },
          { name: 'idAca', label: 'ID Année Académique', type: 'number', required: true },
          { name: 'montant', label: 'Montant (FCFA)', type: 'number', required: true },
          { name: 'idMode', label: 'ID Mode de paiement', type: 'number', required: true },
          { name: 'operation_ID', label: 'ID Opération (Référence)', type: 'text' },
          { name: 'comentaire', label: 'Commentaire', type: 'text' },
          { name: 'datePaie', label: 'Date de paiement', type: 'date', required: true }
        ]
      }}
    />
  );
};
