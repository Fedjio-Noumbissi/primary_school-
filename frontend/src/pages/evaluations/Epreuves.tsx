import { FileText } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Epreuves = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/evaluations/epreuves',
        title: 'Épreuves',
        subtitle: 'Gestion des épreuves et examens',
        icon: <FileText />,
        primaryKey: 'idEpreuve',
        searchPlaceholder: "Rechercher une épreuve...",
        columns: [
          { key: 'libelle', label: 'Libellé', render: (val) => <span style={{ fontWeight: 600, color: '#111827' }}>{val || 'N/A'}</span> },
          { key: 'auteur', label: 'Auteur', render: (val) => <span style={{ color: '#374151' }}>{val || '-'}</span> },
          { key: 'idNature', label: 'ID Nature', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> },
          { key: 'urlDoc', label: 'Document', render: (val) => val ? <a href={val} target="_blank" rel="noreferrer" style={{ color: '#059669', textDecoration: 'underline' }}>Voir</a> : <span style={{ color: '#9ca3af' }}>-</span> },
          { key: 'idPers', label: 'ID Personne', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> }
        ],
        fields: [
          { name: 'libelle', label: 'Libellé de l\'épreuve', type: 'text', required: true },
          { name: 'urlDoc', label: 'URL du document', type: 'text' },
          { name: 'auteur', label: 'Auteur', type: 'text' },
          { name: 'idNature', label: 'ID Nature d\'épreuve', type: 'number', required: true },
          { name: 'idPers', label: 'ID Personne', type: 'number' }
        ]
      }}
    />
  );
};
