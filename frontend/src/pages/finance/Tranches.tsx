import { Layers } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Tranches = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/finance/tranches',
        title: 'Tranches de Paiement',
        subtitle: 'Configuration des tranches de scolarité',
        icon: <Layers />,
        primaryKey: 'idTranche',
        columns: [
          { key: 'libelle', label: 'Libellé', render: (val) => <span style={{ fontWeight: 600, color: '#111827' }}>{val || 'N/A'}</span> },
          { key: 'montant', label: 'Montant', render: (val) => <span style={{ color: '#059669', fontWeight: 600 }}>{val ? Number(val).toLocaleString() : 0} FCFA</span> },
          { key: 'delai_mois', label: 'Délai (mois)', render: (val) => <span style={{ color: '#6b7280' }}>{val || '-'}</span> },
          { key: 'delai_jour', label: 'Délai (jour)', render: (val) => <span style={{ color: '#6b7280' }}>{val || '-'}</span> },
          { key: 'actif', label: 'Statut', render: (val) => (
            <span className={val ? 'pt-badge-green' : 'pt-badge-red'}>{val ? 'Actif' : 'Inactif'}</span>
          )}
        ],
        fields: [
          { name: 'libelle', label: 'Libellé (ex: Tranche 1)', type: 'text', required: true },
          { name: 'montant', label: 'Montant (FCFA)', type: 'number', required: true },
          { name: 'delai_mois', label: 'Délai mois (ex: 01)', type: 'text' },
          { name: 'delai_jour', label: 'Délai jour (ex: 15)', type: 'text' },
          { name: 'idScolarite', label: 'ID Scolarité rattachée', type: 'number', required: true },
          { name: 'idFondateur', label: 'ID Fondateur', type: 'number' },
          { name: 'actif', label: 'Tranche active', type: 'checkbox' }
        ]
      }}
    />
  );
};
