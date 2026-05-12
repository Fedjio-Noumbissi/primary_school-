import { Briefcase } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Enseignants = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/personnes/enseignants',
        title: 'Enseignants',
        subtitle: 'Corps professoral et vacataires',
        icon: <Briefcase />,
        primaryKey: 'idEnseignant',
        columns: [
          { key: 'idEnseignant', label: 'ID', render: (val) => <span style={{ color: '#6b7280', fontFamily: "'JetBrains Mono', monospace" }}>#{String(val).padStart(4, '0')}</span> },
          { key: 'idPers', label: 'ID Personne', render: (val) => <span style={{ color: '#374151', fontWeight: 600 }}>{val || 'N/A'}</span> },
          { key: 'idCours', label: 'ID Cours', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> },
          { key: 'Actif', label: 'Statut', render: (val) => (
            <span className={val ? 'pt-badge-green' : 'pt-badge-red'}>{val ? 'Actif' : 'Inactif'}</span>
          )},
          { key: 'idAdmin', label: 'ID Admin', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> }
        ],
        fields: [
          { name: 'idPers', label: 'ID Personne (profil lié)', type: 'number', required: true },
          { name: 'idCours', label: 'ID Cours (matière principale)', type: 'number', required: true },
          { name: 'idAdmin', label: 'ID Admin', type: 'number' },
          { name: 'Actif', label: 'Enseignant actuellement actif', type: 'checkbox' }
        ]
      }}
    />
  );
};
