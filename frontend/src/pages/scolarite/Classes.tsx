import { FolderOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Classes = () => {
  const navigate = useNavigate();
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/scolarite/classes',
        title: 'Classes',
        subtitle: 'Gestion des classes de l\'établissement',
        icon: <FolderOpen />,
        primaryKey: 'idClasse',
        breadcrumb: [{ label: 'Scolarité' }, { label: 'Classes' }],
        onRowClick: (row) => navigate(`/scolarite/classes/${row.idClasse}`),
        columns: [
          { key: 'libelle', label: 'Nom de la Classe', render: (val) => <span style={{ fontWeight: 600, color: '#111827' }}>{val || 'N/A'}</span> },
          { key: 'idCycle', label: 'ID Cycle', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> },
          { key: 'idClasse', label: 'ID Classe', render: (val) => <span style={{ color: '#6b7280', fontFamily: "'JetBrains Mono', monospace" }}>#{String(val).padStart(4, '0')}</span> },
          { key: 'idAdmin', label: 'ID Admin', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> }
        ],
        fields: [
          { name: 'libelle', label: 'Nom de la classe (ex: 6ème A)', type: 'text', required: true },
          { name: 'idCycle', label: 'ID Cycle rattaché', type: 'number', required: true },
          { name: 'idAdmin', label: 'ID Admin', type: 'number' }
        ]
      }}
    />
  );
};
