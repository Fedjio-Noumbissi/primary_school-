import { UserCog } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Titulaires = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/scolarite/titulaires',
        title: 'Titulaires de Classe',
        subtitle: 'Enseignants responsables d\'une salle',
        icon: <UserCog />,
        primaryKey: 'idTitulaire',
        columns: [
          { key: 'idTitulaire', label: 'ID', render: (val) => <span style={{ color: '#6b7280', fontFamily: "'JetBrains Mono', monospace" }}>#{String(val).padStart(4, '0')}</span> },
          { key: 'idPers', label: 'ID Personne', render: (val) => <span style={{ fontWeight: 600, color: '#374151' }}>{val || 'N/A'}</span> },
          { key: 'idSalle', label: 'ID Salle', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> },
          { key: 'actif', label: 'Statut', render: (val) => (
            <span className={val ? 'pt-badge-green' : 'pt-badge-red'}>{val ? 'Actif' : 'Inactif'}</span>
          )},
          { key: 'idAdmin', label: 'ID Admin', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> }
        ],
        fields: [
          { name: 'idPers', label: 'ID Personne (enseignant)', type: 'number', required: true },
          { name: 'idSalle', label: 'ID Salle', type: 'number', required: true },
          { name: 'idAdmin', label: 'ID Admin', type: 'number' },
          { name: 'actif', label: 'Titulaire actif', type: 'checkbox' }
        ]
      }}
    />
  );
};
