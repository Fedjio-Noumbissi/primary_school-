import { BookMarked } from 'lucide-react';
import { GenericCRUDPage } from '../../components/common/GenericCRUDPage';

export const Livres = () => {
  return (
    <GenericCRUDPage
      config={{
        endpoint: '/parametres/livres',
        title: 'Bibliothèque',
        subtitle: 'Gestion des livres et manuels scolaires',
        icon: <BookMarked />,
        primaryKey: 'idLivre',
        searchPlaceholder: "Rechercher un livre...",
        columns: [
          { key: 'titre', label: 'Titre', render: (val) => <span style={{ fontWeight: 600, color: '#111827' }}>{val || 'N/A'}</span> },
          { key: 'auteurs', label: 'Auteur(s)', render: (val) => <span style={{ color: '#6b7280' }}>{val || '-'}</span> },
          { key: 'prix', label: 'Prix', render: (val) => <span style={{ color: '#059669', fontWeight: 600 }}>{val ? Number(val).toLocaleString() + ' FCFA' : '-'}</span> },
          { key: 'edition', label: 'Édition', render: (val) => <span style={{ color: '#6b7280' }}>{val || '-'}</span> },
          { key: 'totalCopie', label: 'Copies', render: (val) => <span style={{ color: '#374151', fontWeight: 500 }}>{val ?? 'N/A'}</span> },
          { key: 'idSpecialite', label: 'ID Spécialité', render: (val) => <span style={{ color: '#6b7280' }}>{val || 'N/A'}</span> }
        ],
        fields: [
          { name: 'titre', label: 'Titre du livre', type: 'text', required: true },
          { name: 'auteurs', label: 'Auteur(s)', type: 'text' },
          { name: 'prix', label: 'Prix (FCFA)', type: 'number' },
          { name: 'idSpecialite', label: 'ID Spécialité', type: 'number' },
          { name: 'edition', label: 'Édition', type: 'text' },
          { name: 'annee_parution', label: 'Année de parution', type: 'date' },
          { name: 'totalCopie', label: 'Nombre de copies', type: 'number' },
          { name: 'idAdmin', label: 'ID Admin', type: 'number' }
        ]
      }}
    />
  );
};
