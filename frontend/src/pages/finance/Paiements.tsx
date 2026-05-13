import { HandCoins } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Paiements = () => {
  const navigate = useNavigate();
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/finance/paiements',
        title: 'Paiements',
        subtitle: 'Suivi des règlements des élèves',
        icon: <HandCoins />,
        primaryKey: 'idPaie',
        breadcrumb: [{ label: 'Finance' }, { label: 'Paiements' }],
        onRowClick: (row) => navigate(`/finance/paiements/${row.idPaie}`),
        columns: [
          { key: 'operation_ID', label: 'Référence', render: (val) => <span style={{ fontWeight: 600, color: '#111827', fontFamily: "'JetBrains Mono', monospace" }}>{val || 'N/A'}</span> },
          { key: 'matricule', label: 'Matricule Élève', render: (val) => <span style={{ color: '#6b7280' }}>#{String(val || 0).padStart(4, '0')}</span> },
          { key: 'montant', label: 'Montant', render: (val) => <span style={{ color: '#059669', fontWeight: 600 }}>{val ? Number(val).toLocaleString() : 0} FCFA</span> },
          { key: 'datePaie', label: 'Date Paiement', render: (val) => <span style={{ color: '#6b7280' }}>{val ? new Date(val).toLocaleDateString('fr-FR') : 'N/A'}</span> },
          { key: 'idMode', label: 'ID Mode', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> }
        ],
        fields: [
          { name: 'matricule', label: 'Matricule de l\'élève', type: 'number', required: true },
          { name: 'idAca', label: 'ID Année Académique', type: 'number', required: true },
          { name: 'montant', label: 'Montant (FCFA)', type: 'number', required: true },
          { name: 'idMode', label: 'ID Mode de paiement', type: 'number', required: true },
          { name: 'operation_ID', label: 'ID Opération (Référence)', type: 'text' },
          { name: 'url', label: 'URL Reçu', type: 'text' },
          { name: 'comentaire', label: 'Commentaire', type: 'text' },
          { name: 'idPers', label: 'ID Personne (caissier)', type: 'number' },
          { name: 'datePaie', label: 'Date de paiement', type: 'date', required: true }
        ]
      }}
    />
  );
};
