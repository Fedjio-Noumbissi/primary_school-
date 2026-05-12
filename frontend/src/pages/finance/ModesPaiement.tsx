import { CreditCard } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const ModesPaiement = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/finance/modes',
        title: 'Modes de Paiement',
        subtitle: 'Configuration des moyens de paiement acceptés',
        icon: <CreditCard />,
        primaryKey: 'idMode',
        columns: [
          { key: 'libelle', label: 'Mode', render: (val) => <span style={{ fontWeight: 600, color: '#111827' }}>{val || 'N/A'}</span> },
          { key: 'information', label: 'Détails', render: (val) => <span style={{ color: '#6b7280' }}>{val || '-'}</span> },
          { key: 'actif', label: 'Statut', render: (val) => (
            <span className={val ? 'pt-badge-green' : 'pt-badge-red'}>{val ? 'Actif' : 'Inactif'}</span>
          )},
          { key: 'idFondateur', label: 'ID Fondateur', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> }
        ],
        fields: [
          { name: 'libelle', label: 'Nom du mode (ex: Orange Money)', type: 'text', required: true },
          { name: 'information', label: 'Informations complémentaires', type: 'text' },
          { name: 'idFondateur', label: 'ID Fondateur', type: 'number' },
          { name: 'actif', label: 'Mode actif', type: 'checkbox' }
        ]
      }}
    />
  );
};
