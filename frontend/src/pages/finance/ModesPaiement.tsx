import { Wallet } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const ModesPaiement = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/finance/modes',
        title: 'Modes de Paiement',
        subtitle: 'Moyens de règlement acceptés',
        icon: <Wallet />,
        primaryKey: 'idMode',
        columns: [
          { key: 'libelle', label: 'Libellé' },
          { key: 'information', label: 'Informations' },
          { key: 'actif', label: 'Statut', render: (val) => (
            <span className={val ? 'pt-badge-green' : 'pt-badge-red'}>
              {val ? 'Actif' : 'Inactif'}
            </span>
          )}
        ],
        fields: [
          { name: 'libelle', label: 'Mode (ex: Orange Money)', type: 'text', required: true },
          { name: 'information', label: 'Instructions / Détails', type: 'textarea' },
          { name: 'actif', label: 'Est actif', type: 'checkbox' }
        ]
      }}
    />
  );
};
