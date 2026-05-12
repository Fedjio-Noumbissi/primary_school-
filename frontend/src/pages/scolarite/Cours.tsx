import { BookOpen } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Cours = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/scolarite/cours',
        title: 'Cours / Matières',
        subtitle: 'Gestion des matières enseignées',
        icon: <BookOpen />,
        primaryKey: 'idCours',
        searchPlaceholder: "Rechercher un cours...",
        columns: [
          { key: 'libelle', label: 'Matière', render: (val) => <span style={{ fontWeight: 600, color: '#111827' }}>{val || 'N/A'}</span> },
          { key: 'note', label: 'Note max', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> },
          { key: 'coefficient', label: 'Coefficient', render: (val) => <span style={{ color: '#059669', fontWeight: 600 }}>{val || 'N/A'}</span> },
          { key: 'idClasse', label: 'ID Classe', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> },
          { key: 'actif', label: 'Statut', render: (val) => (
            <span className={val ? 'pt-badge-green' : 'pt-badge-red'}>{val ? 'Actif' : 'Inactif'}</span>
          )}
        ],
        fields: [
          { name: 'libelle', label: 'Nom du cours', type: 'text', required: true },
          { name: 'note', label: 'Note maximale', type: 'number' },
          { name: 'coefficient', label: 'Coefficient', type: 'number' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'idClasse', label: 'ID Classe', type: 'number', required: true },
          { name: 'idAdmin', label: 'ID Admin', type: 'number' },
          { name: 'actif', label: 'Cours actif', type: 'checkbox' }
        ]
      }}
    />
  );
};
